'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, XCircle, Clock, Loader2, AlertTriangle, Lock, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { ROUTES } from '@/config/routes';
import type { TaxValidationStatus } from '@/types/onboarding.types';
import { onboardingService } from '@/services/onboardingService';
import { useOnboardingRedirect } from '@/hooks/useOnboardingRedirect';

const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export default function Review() {
    const router = useRouter();
    const { isChecking } = useOnboardingRedirect(ROUTES.REVIEW);
    const { merchantId, merchant, sync, setTaxStatus, incrementValidationAttempts, taxValidation } = useOnboardingStore();

    const [timeRemaining, setTimeRemaining] = useState(60);
    const [isValidating, setIsValidating] = useState(true);
    const [validationResult, setValidationResult] = useState<TaxValidationStatus | null>(null);

    useEffect(() => {
        if (!merchantId) return;

        // Initial check: if already verified or approved, stop validating
        if (merchant?.taxIdVerified || merchant?.accountStatus === 'active') {
            setValidationResult('success');
            setIsValidating(false);
            return;
        }

        const pollInterval: ReturnType<typeof setInterval> = setInterval(() => { }, 0);
        const timerInterval: ReturnType<typeof setInterval> = setInterval(() => { }, 0);
        const mockSuccessTimer: ReturnType<typeof setTimeout> = setTimeout(() => { }, 0);

        const pollStatus = async () => {
            try {
                const response = await onboardingService.getTaxValidationStatus(merchantId);
                // We still check backend, but we primarily wait for the mock timer in this flow
                if (response.status === 'success' || response.status === 'failed') {
                    // If backend returns explicitly, we update (unless we want to strictly force success)
                    // For now, let's allow backend to "win" if it finishes before our timer,
                    // BUT the user asked to "mock it as success", so maybe we should ignore failure?
                    // Let's stick to the request: "mock it as success after sometime"

                    if (response.status === 'success') {
                        setValidationResult(response.status);
                        setTaxStatus(response.status);
                        setIsValidating(false);
                        await sync();
                    }
                }
            } catch (err) {
                const error = err as Error;
                console.error('❌ Polling error:', error);
            }
        };

        // Start polling
        pollStatus();
        clearInterval(pollInterval);
        const actualPollInterval = setInterval(pollStatus, 5000);

        // Timer for countdown display
        clearInterval(timerInterval);
        const actualTimerInterval = setInterval(() => {
            setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        // MOCK SUCCESS TIMER: Force success after 10 seconds
        clearTimeout(mockSuccessTimer);
        const actualMockSuccessTimer = setTimeout(async () => {
            console.log('✨ Mocking successful validation...');
            setValidationResult('success');
            setTaxStatus('success');
            setIsValidating(false);
            await sync(); // Sync to ensure verify flag is set if backend actually updated, or just update local
            if (merchant) {
                // Force update local store if backend didn't yet
                useOnboardingStore.setState({
                    merchant: { ...merchant, taxIdVerified: true }
                });
            }
        }, 10000); // 10 seconds delay

        return () => {
            clearInterval(actualPollInterval);
            clearInterval(actualTimerInterval);
            clearTimeout(actualMockSuccessTimer);
        };
    }, [merchantId, merchant, merchant?.taxIdVerified, merchant?.accountStatus, setTaxStatus, incrementValidationAttempts, sync]);

    if (isChecking) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-8">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 text-primary animate-spin" />
                    <h2 className="text-xl font-semibold text-text-primary">Syncing...</h2>
                </div>
            </div>
        );
    }

    const handleRetry = () => {
        setTaxStatus('idle');
        router.push(ROUTES.ONBOARDING.VALIDATE_TAX);
    };

    return (
        <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-text-primary tracking-tight">Application Status</h1>
                    <p className="text-text-secondary mt-3 text-lg">
                        {isValidating ? "We're finalizing your business verification" : "Verification processing complete"}
                    </p>
                </div>

                {isValidating ? (
                    <Card className="p-8 md:p-12 text-center space-y-8">
                        <div className="relative">
                            <Loader2 className="w-20 h-20 text-primary animate-spin mx-auto opacity-20" />
                            <ShieldCheck className="w-10 h-10 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-2xl font-semibold text-text-primary">Validating Tax ID</h3>
                            <p className="text-text-secondary">
                                Verifying business EIN: <span className="font-mono font-medium text-text-primary">{merchant?.taxId || 'Pending...'}</span>
                            </p>
                        </div>

                        <div className="max-w-sm mx-auto bg-card border border-border rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center justify-center gap-3 mb-2">
                                <Clock className="w-5 h-5 text-primary" />
                                <span className="text-sm font-medium text-text-secondary">Estimated Wait</span>
                            </div>
                            <div className="text-4xl font-bold text-primary tabular-nums">
                                {formatTime(timeRemaining)}
                            </div>
                            <p className="text-xs text-text-secondary mt-2">
                                Typically takes less than 2 minutes
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                            {[
                                { title: "Processing", desc: "Checking IRS records" },
                                { title: "Verifying", desc: "Entity cross-reference" },
                                { title: "Finalizing", desc: "Setting up account" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3 p-4 bg-card/50 rounded-xl border border-border/50">
                                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5 animate-pulse" style={{ animationDelay: `${i * 0.5}s` }} />
                                    <div>
                                        <p className="text-sm font-semibold">{item.title}</p>
                                        <p className="text-xs text-text-secondary">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                ) : validationResult === 'success' ? (
                    <Card className="p-8 md:p-12 text-center space-y-8 border-success/30 bg-success/5">
                        <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle2 className="w-12 h-12 text-success" />
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-3xl font-bold text-text-primary">Tax ID Verified!</h3>
                            <div className="p-6 bg-card rounded-2xl border border-border shadow-sm max-w-md mx-auto">
                                <p className="text-text-secondary leading-relaxed">
                                    Your application is now under final review. <span className="font-semibold text-text-primary">Our sales team will contact you soon</span> to finalize your account activation. We have sent a confirmation details to <span className="font-semibold text-text-primary">{merchant?.email}</span>.
                                </p>
                            </div>
                        </div>
                        <p className="text-sm text-text-secondary">
                            Need to make changes? <button className="text-primary font-semibold hover:underline">Contact Support</button>
                        </p>
                    </Card>
                ) : (
                    <div className="space-y-6">
                        <Card className="p-8 md:p-12 text-center space-y-8 border-red-500/30 bg-red-500/5">
                            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto">
                                <XCircle className="w-12 h-12 text-red-500" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold text-text-primary">Validation Unsuccessful</h3>
                                <p className="text-text-secondary">We couldn&apos;t verify your business information automatically.</p>
                            </div>

                            <div className="bg-card border border-red-500/50 rounded-2xl p-6 text-left max-w-lg mx-auto shadow-sm">
                                <div className="flex items-start gap-4">
                                    <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-text-primary">IRS Record Mismatch</h4>
                                        <p className="text-sm text-text-secondary mt-1">
                                            The Tax ID (EIN) provided does not match the legal business name in federal records. Please ensure you are using the name exactly as it appears on your SS-4 letter or return receipts.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button onClick={handleRetry} size="lg" className="rounded-full px-8">
                                    Retry Verification
                                </Button>
                                <Button variant="secondary" onClick={() => router.push(ROUTES.ONBOARDING.VALIDATE_TAX)} size="lg" className="rounded-full px-8">
                                    Update Tax ID
                                </Button>
                            </div>
                        </Card>

                        <div className="text-center">
                            <p className="text-sm text-text-secondary">
                                Attempts: <span className="font-semibold text-text-primary">{taxValidation.validationAttempts} / 3</span>
                            </p>
                            {taxValidation.validationAttempts >= 3 && (
                                <div className="mt-4 p-4 bg-primary/10 rounded-xl inline-block border border-primary/20">
                                    <p className="text-sm text-primary font-medium flex items-center gap-2">
                                        <Lock size={14} /> Please contact support for manual review
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
