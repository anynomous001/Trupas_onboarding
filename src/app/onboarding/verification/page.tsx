'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Check, Pencil, Loader2, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Dialog } from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import { PhoneInput } from '@/components/forms/PhoneInput';
import { OTPInput } from '@/components/forms/OTPInput';
import { OnboardingLayout } from '@/components/layout/OnboardingLayout';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { ROUTES } from '@/config/routes';
import { onboardingService } from '@/services/onboardingService';
import { useOnboardingRedirect } from '@/hooks/useOnboardingRedirect';

// Validation Schemas
const emailVerifySchema = z.object({
    emailOtp: z.string().length(6, 'OTP must be 6 digits'),
});

const changeEmailSchema = z.object({
    newEmail: z.string().email('Invalid email address'),
});

const phoneVerifySchema = z.object({
    phoneOtp: z.string().length(6, 'OTP must be 6 digits'),
});

const changePhoneSchema = z.object({
    phoneCountry: z.string().min(1, 'Country code is required'),
    phoneNumber: z.string().min(1, 'Phone number is required'),
});

type EmailVerifyFormData = z.infer<typeof emailVerifySchema>;
type ChangeEmailFormData = z.infer<typeof changeEmailSchema>;
type PhoneVerifyFormData = z.infer<typeof phoneVerifySchema>;
type ChangePhoneFormData = z.infer<typeof changePhoneSchema>;

const maskPhone = (country: string, phone: string): string => {
    const last4 = phone.slice(-4);
    return `${country} (***) ***-${last4}`;
};

export default function Verification() {
    const router = useRouter();
    const { isChecking } = useOnboardingRedirect(ROUTES.ONBOARDING.VERIFICATION);
    const { merchantId, merchant, sync } = useOnboardingStore();

    const [isVerifying, setIsVerifying] = useState(false);
    const [error, setError] = useState<string>('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isSendingNewOtp, setIsSendingNewOtp] = useState(false);
    const [countdown, setCountdown] = useState(0);

    // Dialog states
    const [isChangeEmailDialogOpen, setIsChangeEmailDialogOpen] = useState(false);
    const [isChangePhoneDialogOpen, setIsChangePhoneDialogOpen] = useState(false);

    // Determine current step based on verification status
    const isEmailVerified = merchant?.emailVerified ?? false;
    const isPhoneVerified = merchant?.phoneVerified ?? false;

    // If both verified, we shouldn't be here (useOnboardingRedirect handles this mostly, but good fallback)
    useEffect(() => {
        if (!isChecking && isEmailVerified && isPhoneVerified) {
            router.push(ROUTES.ONBOARDING.VALIDATE_TAX);
        }
    }, [isChecking, isEmailVerified, isPhoneVerified, router]);

    // Reset state when switching steps (e.g. email verified -> now phone step)
    useEffect(() => {
        setError('');
        setIsOtpSent(false);
        setCountdown(0);
    }, [isEmailVerified]);

    // --- Forms ---

    const {
        watch: watchEmailOtp,
        setValue: setEmailOtpValue,
        formState: { errors: emailErrors },
    } = useForm<EmailVerifyFormData>({
        resolver: zodResolver(emailVerifySchema),
        defaultValues: { emailOtp: '' },
    });

    const {
        register: registerEmail,
        handleSubmit: handleEmailSubmit,
        formState: { errors: changeEmailErrors },
        reset: resetEmailForm,
    } = useForm<ChangeEmailFormData>({
        resolver: zodResolver(changeEmailSchema),
    });

    const {
        watch: watchPhoneOtp,
        setValue: setPhoneOtpValue,
        formState: { errors: phoneErrors },
    } = useForm<PhoneVerifyFormData>({
        resolver: zodResolver(phoneVerifySchema),
        defaultValues: { phoneOtp: '' },
    });

    const {
        register: registerPhone,
        handleSubmit: handlePhoneSubmit,
        watch: watchPhoneChange,
        setValue: setPhoneChangeValue,
        formState: { errors: changePhoneErrors },
        reset: resetPhoneForm,
    } = useForm<ChangePhoneFormData>({
        resolver: zodResolver(changePhoneSchema),
        defaultValues: { phoneCountry: '+1', phoneNumber: '' },
    });

    const emailOtp = watchEmailOtp('emailOtp');
    const phoneOtp = watchPhoneOtp('phoneOtp');
    const watchPhoneCountry = watchPhoneChange('phoneCountry');

    const displayEmail = merchant?.email || 'your email';
    const displayPhone = merchant?.phone
        ? maskPhone(merchant.phone.startsWith('+') ? '' : '+', merchant.phone)
        : 'your phone';

    // Countdown timer
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    // Pre-fill phone dialog
    useEffect(() => {
        if (isChangePhoneDialogOpen && merchant?.phone) {
            const match = merchant.phone.match(/^(\+\d{1,3})(\d+)$/);
            if (match) {
                setPhoneChangeValue('phoneCountry', match[1]);
                setPhoneChangeValue('phoneNumber', '');
            }
        }
    }, [isChangePhoneDialogOpen, merchant, setPhoneChangeValue]);


    // --- Handlers ---

    const handleSendOtp = async () => {
        if (!merchantId) return;
        setIsSendingNewOtp(true);
        try {
            if (!isEmailVerified) {
                await onboardingService.sendEmailOtp(merchantId);
            } else {
                await onboardingService.sendPhoneOtp(merchantId);
            }
            setIsOtpSent(true);
            setCountdown(60);
            setError('');
        } catch (err: any) {
            setError(err.message || 'Failed to send OTP');
        } finally {
            setIsSendingNewOtp(false);
        }
    };

    const handleVerify = async () => {
        if (!merchantId) return;
        setIsVerifying(true);
        setError('');
        try {
            if (!isEmailVerified) {
                if (emailOtp.length !== 6) return;
                const response = await onboardingService.verifyEmail(merchantId, emailOtp);
                if (response.verified) {
                    await sync(); // Updates isEmailVerified, triggers re-render showing phone step
                } else {
                    setError('Invalid OTP. Please try again.');
                    setEmailOtpValue('emailOtp', '');
                }
            } else {
                if (phoneOtp.length !== 6) return;
                const response = await onboardingService.verifyPhone(merchantId, phoneOtp);
                if (response.verified) {
                    await sync();
                    // UseOnboardingRedirect or the effect above will handle navigation to next step
                    router.push(ROUTES.ONBOARDING.VALIDATE_TAX);
                } else {
                    setError('Invalid OTP. Please try again.');
                    setPhoneOtpValue('phoneOtp', '');
                }
            }
        } catch (err: any) {
            setError(err.message || 'Verification failed');
            if (!isEmailVerified) setEmailOtpValue('emailOtp', '');
            else setPhoneOtpValue('phoneOtp', '');
        } finally {
            setIsVerifying(false);
        }
    };

    const handleChangeEmail = async (data: ChangeEmailFormData) => {
        if (!merchantId) return;
        setIsSendingNewOtp(true);
        try {
            const response = await onboardingService.updateUnverifiedEmail(merchantId, data.newEmail);
            if (merchant) {
                useOnboardingStore.setState({
                    merchant: { ...merchant, email: data.newEmail }
                });
            }
            setIsOtpSent(response.otpSent);
            if (response.otpSent) setCountdown(60);
            setIsChangeEmailDialogOpen(false);
            resetEmailForm();
            setError('');
        } catch (err: any) {
            setError(err.message || 'Failed to update email');
        } finally {
            setIsSendingNewOtp(false);
        }
    };

    const handleChangePhone = async (data: ChangePhoneFormData) => {
        if (!merchantId) return;
        setIsSendingNewOtp(true);
        try {
            const fullPhone = `${data.phoneCountry}${data.phoneNumber}`;
            const response = await onboardingService.updateUnverifiedPhone(merchantId, fullPhone);
            if (merchant) {
                useOnboardingStore.setState({
                    merchant: { ...merchant, phone: fullPhone }
                });
            }
            setIsOtpSent(response.otpSent);
            if (response.otpSent) setCountdown(60);
            setIsChangePhoneDialogOpen(false);
            resetPhoneForm();
            setError('');
        } catch (err: any) {
            setError(err.message || 'Failed to update phone');
        } finally {
            setIsSendingNewOtp(false);
        }
    };


    if (isChecking) {
        return (
            <OnboardingLayout currentStep={2}>
                <div className="flex flex-col items-center justify-center py-20">
                    <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                    <h2 className="text-2xl font-bold text-text-primary mb-2">Syncing...</h2>
                    <p className="text-text-secondary">Checking verification status</p>
                </div>
            </OnboardingLayout>
        );
    }

    // Choose content based on status
    // 1. Email Verification
    if (!isEmailVerified) {
        return (
            <OnboardingLayout currentStep={2}>
                <Card className="max-w-md mx-auto">
                    <div className="space-y-6">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Mail className="w-8 h-8 text-primary" />
                            </div>
                            <h2 className="text-2xl font-bold text-text-primary">Verify Your Email</h2>
                            <p className="text-text-secondary mt-2">
                                {isOtpSent
                                    ? `Enter the code sent to ${displayEmail}`
                                    : `We'll send a verification code to ${displayEmail}`}
                            </p>
                        </div>

                        {isOtpSent ? (
                            <div className="space-y-6">
                                <OTPInput
                                    length={6}
                                    value={emailOtp}
                                    onChange={(val) => {
                                        setEmailOtpValue('emailOtp', val);
                                        setError('');
                                    }}
                                    error={error || emailErrors.emailOtp?.message}
                                    disabled={isVerifying}
                                />

                                <Button
                                    className="w-full rounded-full"
                                    size="lg"
                                    onClick={handleVerify}
                                    disabled={emailOtp.length !== 6 || isVerifying}
                                >
                                    {isVerifying ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                    Verify & Continue
                                </Button>

                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-text-secondary">
                                        {countdown > 0 ? `Resend in ${countdown}s` : "Didn't receive a code?"}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={handleSendOtp}
                                        disabled={countdown > 0 || isSendingNewOtp}
                                        className="text-primary font-semibold hover:underline disabled:opacity-50"
                                    >
                                        Resend OTP
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Button
                                className="w-full rounded-full"
                                size="lg"
                                onClick={handleSendOtp}
                                disabled={isSendingNewOtp}
                            >
                                {isSendingNewOtp ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                Send Verification Code
                            </Button>
                        )}

                        <button
                            type="button"
                            onClick={() => setIsChangeEmailDialogOpen(true)}
                            className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary mx-auto"
                        >
                            <Pencil size={14} />
                            Change email address
                        </button>
                    </div>
                </Card>

                {/* Change Email Dialog */}
                <Dialog
                    open={isChangeEmailDialogOpen}
                    onClose={() => setIsChangeEmailDialogOpen(false)}
                    title="Change Email Address"
                >
                    <form onSubmit={handleEmailSubmit(handleChangeEmail)} className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-text-primary">New Email</label>
                            <div className="relative">
                                <Input
                                    type="email"
                                    placeholder="name@company.com"
                                    className="pl-10"
                                    {...registerEmail('newEmail')}
                                />
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                            </div>
                            {changeEmailErrors.newEmail && (
                                <p className="text-sm text-red-500">{changeEmailErrors.newEmail.message}</p>
                            )}
                        </div>

                        <div className="flex gap-3">
                            <Button
                                type="button"
                                variant="secondary"
                                className="flex-1 rounded-full"
                                onClick={() => setIsChangeEmailDialogOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="flex-1 rounded-full"
                                disabled={isSendingNewOtp}
                            >
                                {isSendingNewOtp ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : 'Update & Send OTP'}
                            </Button>
                        </div>
                    </form>
                </Dialog>
            </OnboardingLayout>
        );
    }

    // 2. Phone Verification
    return (
        <OnboardingLayout currentStep={2}>
            <Card className="max-w-md mx-auto">
                <div className="space-y-6">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Phone className="w-8 h-8 text-primary" />
                        </div>
                        <h2 className="text-2xl font-bold text-text-primary">Verify Your Phone</h2>
                        <p className="text-text-secondary mt-2">
                            {isOtpSent
                                ? `Enter the code sent to ${displayPhone}`
                                : `We'll send a verification code to ${displayPhone}`}
                        </p>
                    </div>

                    {isOtpSent ? (
                        <div className="space-y-6">
                            <OTPInput
                                length={6}
                                value={phoneOtp}
                                onChange={(val) => {
                                    setPhoneOtpValue('phoneOtp', val);
                                    setError('');
                                }}
                                error={error || phoneErrors.phoneOtp?.message}
                                disabled={isVerifying}
                            />

                            <Button
                                className="w-full rounded-full"
                                size="lg"
                                onClick={handleVerify}
                                disabled={phoneOtp.length !== 6 || isVerifying}
                            >
                                {isVerifying ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                Verify & Continue
                            </Button>

                            <div className="flex items-center justify-between text-sm">
                                <span className="text-text-secondary">
                                    {countdown > 0 ? `Resend in ${countdown}s` : "Didn't receive a code?"}
                                </span>
                                <button
                                    type="button"
                                    onClick={handleSendOtp}
                                    disabled={countdown > 0 || isSendingNewOtp}
                                    className="text-primary font-semibold hover:underline disabled:opacity-50"
                                >
                                    Resend OTP
                                </button>
                            </div>
                        </div>
                    ) : (
                        <Button
                            className="w-full rounded-full"
                            size="lg"
                            onClick={handleSendOtp}
                            disabled={isSendingNewOtp}
                        >
                            {isSendingNewOtp ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                            Send Verification Code
                        </Button>
                    )}

                    <button
                        type="button"
                        onClick={() => setIsChangePhoneDialogOpen(true)}
                        className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary mx-auto"
                    >
                        <Pencil size={14} />
                        Change phone number
                    </button>
                </div>
            </Card>

            {/* Change Phone Dialog */}
            <Dialog
                open={isChangePhoneDialogOpen}
                onClose={() => setIsChangePhoneDialogOpen(false)}
                title="Change Phone Number"
            >
                <form onSubmit={handlePhoneSubmit(handleChangePhone)} className="space-y-6">
                    <PhoneInput
                        label="New Phone Number"
                        countryCode={watchPhoneCountry}
                        onCountryCodeChange={(code) => setPhoneChangeValue('phoneCountry', code)}
                        required
                        error={changePhoneErrors.phoneNumber?.message}
                        {...registerPhone('phoneNumber')}
                    />

                    <div className="flex gap-3 mt-6">
                        <Button
                            type="button"
                            variant="secondary"
                            className="flex-1 rounded-full"
                            onClick={() => setIsChangePhoneDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="flex-1 rounded-full"
                            disabled={isSendingNewOtp}
                        >
                            {isSendingNewOtp ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : 'Update & Send OTP'}
                        </Button>
                    </div>
                </form>
            </Dialog>
        </OnboardingLayout>
    );
}
