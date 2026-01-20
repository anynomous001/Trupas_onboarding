import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Shield, Star, Lock as LockIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Dialog } from '@/components/ui/Dialog';
import { OTPInput } from '@/components/forms/OTPInput';
import { ROUTES } from '@/config/routes';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { onboardingService } from '@/services/onboardingService';
import { mapBackendStepToRoute, mapNextStepToRoute, getRouteFromAccountStatus } from '@/lib/routeMapper';
import { useOnboardingRedirect } from '@/hooks/useOnboardingRedirect';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
});

const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

type LoginFormData = z.infer<typeof loginSchema>;
type OTPFormData = z.infer<typeof otpSchema>;

export default function Login() {
  const router = useRouter();
  const { isChecking: isRedirectChecking } = useOnboardingRedirect(ROUTES.LOGIN, { allowUnauthenticated: true });
  const { merchantId, accessToken, refreshToken: storedRefreshToken, setAuth, reset } = useOnboardingStore();
  const setEmailVerified = useOnboardingStore((state: any) => state.setEmailVerified);
  const setPhoneVerified = useOnboardingStore((state: any) => state.setPhoneVerified);

  const [isLoading, setIsLoading] = useState(true);
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOtpDialogOpen, setIsOtpDialogOpen] = useState(false);

  // Initial session check
  useEffect(() => {
    const checkSession = async () => {
      if (!accessToken || !merchantId) {
        setIsLoading(false);
        return;
      }

      try {
        console.log('🔄 Validating existing session...');
        const response = await onboardingService.validateSession();
        if (response.valid) {
          console.log('✅ Session valid, redirecting...');
          handlePostLoginRedirect(response.merchant);
          return;
        }
      } catch (err: any) {
        console.log('⚠️ Session invalid, trying refresh...');
        if (storedRefreshToken) {
          try {
            const refreshResponse = await onboardingService.refreshToken(storedRefreshToken);
            setAuth({
              accessToken: refreshResponse.accessToken,
              refreshToken: refreshResponse.refreshToken,
              merchantId: merchantId,
              accountStatus: 'unknown',
            });
            // Try validation again with new token
            const retryResponse = await onboardingService.validateSession();
            if (retryResponse.valid) {
              handlePostLoginRedirect(retryResponse.merchant);
              return;
            }
          } catch (refreshErr) {
            console.error('❌ Refresh failed:', refreshErr);
            reset();
          }
        } else {
          reset();
        }
      }
      setIsLoading(false);
    };

    if (!isRedirectChecking) {
      checkSession();
    }
  }, [accessToken, merchantId, isRedirectChecking]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const {
    watch,
    setValue,
    formState: { errors: otpErrors },
  } = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
  });

  const otp = watch('otp');

  const handlePostLoginRedirect = (merchant: any) => {
    if (!merchant) {
      console.warn('⚠️ [PostLogin] Merchant object missing, falling back to tax validation');
      router.push(ROUTES.ONBOARDING.VALIDATE_TAX);
      return;
    }

    // 1. Final Destination: /review if tax_id_verified = true
    if (merchant.taxIdVerified || merchant.tax_id_verified || merchant.taxId_verified) {
      router.push(ROUTES.REVIEW);
      return;
    }

    // 2. /onboarding/verification if email or phone is not verified
    if (
      merchant.emailVerified === false ||
      merchant.email_verified === false ||
      merchant.phoneVerified === false ||
      merchant.phone_verified === false
    ) {
      router.push(ROUTES.ONBOARDING.VERIFICATION);
      return;
    }

    // 4. Default fallback: /onboarding/validate-tax
    router.push(ROUTES.ONBOARDING.VALIDATE_TAX);
  };

  if (isLoading || isRedirectChecking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <h2 className="text-xl font-semibold text-text-primary">
            {merchantId ? 'Resuming Session...' : 'Loading...'}
          </h2>
        </div>
      </div>
    );
  }

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    setError(null);
    setEmail(data.email);

    try {
      const statusResponse = await onboardingService.checkAccountStatus(data.email);

      // If account doesn't exist or is soft deleted, redirect to /register
      if (!statusResponse.exists || statusResponse.soft_deleted) {
        router.push(ROUTES.REGISTER);
        return;
      }

      // If account exists, send OTP
      await onboardingService.sendLoginOtp(data.email);
      setOtpSent(true);
      setIsOtpDialogOpen(true);
    } catch (err: any) {
      console.error('❌ Login failed:', err);
      setError(err.message || 'Failed to initiate login');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtpValidation = async () => {
    if (otp.length === 6) {
      setVerifying(true);
      setOtpError('');

      try {
        const response = await onboardingService.verifyLoginOtp(email, otp);

        // Store tokens
        setAuth({
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
          merchantId: response.merchantId,
          accountStatus: response.accountStatus,
        });

        // Sync merchant object to get flags
        const syncResponse = await useOnboardingStore.getState().sync();

        // Close dialog
        setIsOtpDialogOpen(false);

        // Redirect based on flags
        handlePostLoginRedirect(syncResponse || response.progress);

      } catch (err: any) {
        setOtpError(err.message || 'Invalid OTP. Please try again.');
        setValue('otp', '');
      } finally {
        setVerifying(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Login Form (2/3) */}
      <div className="flex-1 flex flex-col p-8 lg:w-2/3">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-card rounded-lg flex items-center justify-center border border-border">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-text-primary">TruePas</h1>
          </div>
          <Link
            href={ROUTES.REGISTER}
            className="text-sm text-text-secondary hover:text-text-primary"
          >
            New to TruePas? <span className="text-primary font-semibold">Sign Up</span>
          </Link>
        </div>

        {/* Login Form */}
        <div className="max-w-md mx-auto w-full flex-1 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-text-primary mb-2">
              Log In to Your Account
            </h2>
            <p className="text-text-secondary">
              Welcome back to the Merchant Portal.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-primary">
                Email
              </label>
              <div className="relative">
                <Input
                  type="email"
                  placeholder="name@company.com"
                  className="pl-10 pr-4"
                  {...register('email')}
                  disabled={isSubmitting}
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Checking...
                </>
              ) : (
                'Continue with Email'
              )}
            </Button>

            <div className="flex items-center justify-center gap-2 text-sm text-text-secondary pt-4">
              <LockIcon className="w-4 h-4" />
              <span>Secure SSL encrypted login</span>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-sm text-text-secondary mt-auto pt-8">
          <div className="flex gap-6">
            <Link href="#" className="hover:text-text-primary">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-text-primary">
              Terms of Service
            </Link>
          </div>
          <p>© 2024 TruePas Inc.</p>
        </div>
      </div>

      {/* Right Side - Background & Testimonial (1/3) */}
      <div className="hidden lg:block w-1/3 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 to-blue-800/50"></div>
        </div>

        <div className="absolute bottom-8 right-8 left-8 bg-card/90 backdrop-blur-sm rounded-lg p-6 border border-border">
          <div className="flex gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className="w-4 h-4 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
          <p className="text-sm text-text-primary leading-relaxed mb-4">
            "TruePas has completely revolutionized our check-in process. The identity verification is instant, and the merchant portal gives us the oversight we've always needed."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-card flex-shrink-0"></div>
            <div>
              <p className="text-sm font-medium text-text-primary">David Miller</p>
              <p className="text-xs text-text-secondary">Operations Director, OceanView Resorts</p>
            </div>
          </div>
        </div>
      </div>

      {/* OTP Verification Dialog */}
      <Dialog
        open={isOtpDialogOpen}
        onClose={() => {
          setIsOtpDialogOpen(false);
          setOtpSent(false);
          setValue('otp', '');
          setOtpError('');
        }}
        title="Verify Your Email"
      >
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-sm text-text-secondary">
              We've sent a 6-digit code to
            </p>
            <p className="text-text-primary font-semibold mt-1">{email}</p>
          </div>

          {verifying ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
              <span className="ml-3 text-text-secondary">Verifying...</span>
            </div>
          ) : (
            <>
              <OTPInput
                length={6}
                value={otp}
                onChange={(value) => {
                  setValue('otp', value);
                  setOtpError('');
                }}
                error={otpError || otpErrors.otp?.message}
                disabled={verifying}
              />

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1 rounded-full"
                  onClick={() => {
                    setIsOtpDialogOpen(false);
                    setOtpSent(false);
                    setValue('otp', '');
                    setOtpError('');
                  }}
                  disabled={verifying}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  className="flex-1 rounded-full"
                  size="lg"
                  onClick={handleOtpValidation}
                  disabled={otp.length !== 6 || verifying}
                >
                  {verifying ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    'Verify OTP'
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </Dialog>
    </div>
  );
}
;

