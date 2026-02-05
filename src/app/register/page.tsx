'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Globe, Building2, Lock, User, HelpCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { PhoneInput } from '@/components/forms/PhoneInput';
import { OnboardingLayout } from '@/components/layout/OnboardingLayout';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { ROUTES } from '@/config/routes';
import { Input } from '@/components/ui/Input';
import { onboardingService } from '@/services/onboardingService';
import { mapBackendStepToRoute, getRouteFromAccountStatus } from '@/lib/routeMapper';
import { useOnboardingRedirect } from '@/hooks/useOnboardingRedirect';

const accountDetailsSchema = z.object({
    contactName: z.string().min(1, 'Contact name is required'),
    workEmail: z.string().email('Invalid email address'),
    phoneCountry: z.string().min(1, 'Country code is required'),
    phoneNumber: z.string().min(1, 'Phone number is required'),
    businessName: z.string().min(1, 'Business name is required'),
    websiteUrl: z
        .string()
        .optional()
        .refine(
            (val) => !val || /^https?:\/\/.+\..+/.test(val),
            'Please enter a valid URL (e.g., https://example.com)'
        ),
    taxId: z.string().min(1, 'Tax ID is required'),
    termsAccepted: z.boolean().refine((val) => val === true, 'You must accept the terms and conditions'),
});

type AccountDetailsFormData = z.infer<typeof accountDetailsSchema>;

export default function Register() {
    const router = useRouter();

    // Auto-redirect already logged-in users to their correct step
    const { isChecking } = useOnboardingRedirect(ROUTES.REGISTER, {
        allowUnauthenticated: true
    });

    const { merchantId, setAccountDetails, setAuth, setMerchant } = useOnboardingStore();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<AccountDetailsFormData>({
        resolver: zodResolver(accountDetailsSchema),
        mode: 'onChange',
        defaultValues: {
            phoneCountry: '+1',
            termsAccepted: false,
        },
    });

    const phoneCountry = watch('phoneCountry');
    const termsAccepted = watch('termsAccepted');

    // If we are checking status, show the loading screen
    // If we have a merchantId, we also show it while the initial check happens
    // but once isChecking is false, if we are still on this page, we show the form
    if (isChecking) {
        return (
            <OnboardingLayout currentStep={1}>
                <div className="flex flex-col items-center justify-center py-20">
                    <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                    <h2 className="text-2xl font-bold text-text-primary mb-2">
                        {merchantId ? 'Resuming Session...' : 'Checking Status...'}
                    </h2>
                    <p className="text-text-secondary">
                        Taking you to where you left off
                    </p>
                </div>
            </OnboardingLayout>
        );
    }

    const onSubmit = async (data: AccountDetailsFormData) => {
        setIsSubmitting(true);
        setError(null);

        const payload = {
            contact_name: data.contactName,
            business_name: data.businessName,
            business_url: data.websiteUrl || '',
            tax_id: data.taxId,
            email: data.workEmail,
            phone: `${data.phoneCountry}${data.phoneNumber}`,
            terms_accepted: data.termsAccepted,
        };

        try {
            console.log('🚀 Registering merchant account...');
            const response = await onboardingService.register(payload);

            // Store form data locally
            setAccountDetails({
                contactName: data.contactName,
                workEmail: data.workEmail,
                phoneCountry: data.phoneCountry,
                phoneNumber: data.phoneNumber,
                businessName: data.businessName,
                websiteUrl: data.websiteUrl || '',
                taxId: data.taxId,
            });

            // Store auth tokens
            setAuth({
                accessToken: response.accessToken,
                refreshToken: response.refreshToken,
                merchantId: response.merchant.merchantId,
                accountStatus: response.merchant.accountStatus,
            });

            // Store full merchant object
            setMerchant(response.merchant);

            // Redirect to the appropriate step
            const nextRoute =
                mapBackendStepToRoute(response.nextStep) ||
                getRouteFromAccountStatus(response.merchant.accountStatus);

            router.push(nextRoute);
        } catch (err) {
            const error = err as Error;
            console.error('❌ Registration failed:', error);
            setError(error.message || 'Failed to create account. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <OnboardingLayout currentStep={1}>
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold text-text-primary">Create Your Merchant Account</h2>
                        <p className="text-text-secondary mt-2">
                            Enter your business details to get started with TruePas.
                        </p>
                    </div>
                    <Link
                        href={ROUTES.LOGIN}
                        className="text-sm text-text-secondary hover:text-text-primary"
                    >
                        Already have an account? <span className="text-primary font-semibold">Log In</span>
                    </Link>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-text-primary">
                                Contact Name <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <Input
                                    placeholder="e.g. Jane Doe"
                                    className="pl-10"
                                    {...register('contactName')}
                                />
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                            </div>
                            {errors.contactName && (
                                <p className="text-sm text-red-500">{errors.contactName.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-text-primary">
                                Business Name <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <Input
                                    placeholder="e.g. Acme Resorts"
                                    className="pl-10"
                                    {...register('businessName')}
                                />
                                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                            </div>
                            {errors.businessName && (
                                <p className="text-sm text-red-500">{errors.businessName.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-text-primary">
                                Business Website URL
                            </label>
                            <div className="relative">
                                <Input
                                    type="url"
                                    placeholder="https://"
                                    className="pl-10"
                                    {...register('websiteUrl')}
                                />
                                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                            </div>
                            {errors.websiteUrl && (
                                <p className="text-sm text-red-500">{errors.websiteUrl.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-text-primary flex items-center gap-2">
                                Business Tax ID <span className="text-red-500">*</span>
                                <HelpCircle className="w-4 h-4 text-text-secondary cursor-help" />
                            </label>
                            <div className="relative">
                                <Input
                                    placeholder="XX-XXXXXXX"
                                    className="pl-10"
                                    {...register('taxId')}
                                />
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                            </div>
                            {errors.taxId && (
                                <p className="text-sm text-red-500">{errors.taxId.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-text-primary">
                                Work Email Address <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <Input
                                    type="email"
                                    placeholder="name@company.com"
                                    className="pl-10"
                                    {...register('workEmail')}
                                />
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                            </div>
                            <p className="text-xs text-text-secondary">
                                We&apos;ll send a verification link to this email.
                            </p>
                            {errors.workEmail && (
                                <p className="text-sm text-red-500">{errors.workEmail.message}</p>
                            )}
                        </div>

                        <PhoneInput
                            label="Phone Number"
                            countryCode={phoneCountry}
                            onCountryCodeChange={(code) => setValue('phoneCountry', code)}
                            required
                            error={errors.phoneNumber?.message}
                            {...register('phoneNumber')}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                className="mt-1 rounded border-gray-200 dark:border-gray-800 bg-card"
                                {...register('termsAccepted')}
                            />
                            <span className="text-sm text-text-secondary">
                                I agree to the{' '}
                                <a href="#" className="text-primary hover:underline">
                                    Terms & Conditions
                                </a>{' '}
                                and{' '}
                                <a href="#" className="text-primary hover:underline">
                                    Privacy Policy
                                </a>
                            </span>
                        </label>
                        {errors.termsAccepted && (
                            <p className="text-sm text-red-500">{errors.termsAccepted.message}</p>
                        )}
                    </div>

                    {error && (
                        <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">
                            {error}
                        </div>
                    )}

                    <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-800">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => router.push(ROUTES.HOME)}
                            className="rounded-full"
                            disabled={isSubmitting}
                        >
                            Back
                        </Button>
                        <Button
                            type="submit"
                            size="lg"
                            className="rounded-full"
                            disabled={!termsAccepted || isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                'Create Account'
                            )}
                        </Button>
                    </div>
                </form>

                <div className="flex items-center justify-between text-sm text-text-secondary pt-8 border-t border-gray-200 dark:border-gray-800">
                    <p>©2024 TruePas Inc. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-text-primary">
                            Privacy
                        </Link>
                        <Link href="#" className="hover:text-text-primary">
                            Terms
                        </Link>
                        <Link href="#" className="hover:text-text-primary">
                            Help
                        </Link>
                    </div>
                </div>
            </div>
        </OnboardingLayout>
    );
}
