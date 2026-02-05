'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, XCircle, Clock, RefreshCw, FileText, AlertTriangle, ArrowRight, FileCheck, Briefcase, Lock, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Dialog } from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import { OnboardingLayout } from '@/components/layout/OnboardingLayout';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { ROUTES } from '@/config/routes';
import type { TaxValidationStatus } from '@/types/onboarding.types';
import { onboardingService } from '@/services/onboardingService';
import { useOnboardingRedirect } from '@/hooks/useOnboardingRedirect';

const WhyThisMattersSection = () => {
    return (
        <div className="space-y-6 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div>
                <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs font-medium rounded-full mb-4">
                    WHY THIS MATTERS
                </span>
                <h3 className="text-2xl font-bold text-text-primary mb-4">
                    Why is this happening?
                </h3>
                <p className="text-text-secondary">
                    TruePas is strictly required to verify business entities for security and federal compliance. This ensures that only legitimate businesses can process instant check-ins and access sensitive identity data.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-3">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                        <FileCheck className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-semibold text-text-primary">Legal Compliance</h4>
                    <p className="text-sm text-text-secondary">
                        We must validate EINs against IRS records to prevent fraud.
                    </p>
                </div>

                <div className="space-y-3">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-semibold text-text-primary">Exact Match Required</h4>
                    <p className="text-sm text-text-secondary">
                        The business name must match exactly what appears on your SS-4 letter.
                    </p>
                </div>

                <div className="space-y-3">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                        <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-semibold text-text-primary">New EIN Issuance?</h4>
                    <p className="text-sm text-text-secondary">
                        Newly issued EINs can take up to 2 weeks to appear in our verification databases.
                    </p>
                </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-800"></div>

            <div className="space-y-4">
                <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wide">
                    Resources
                </h4>
                <div className="space-y-3">
                    <a href="#" className="flex items-center justify-between text-primary hover:underline group">
                        <span>How to find your SS-4 Letter</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a href="#" className="flex items-center justify-between text-primary hover:underline group">
                        <span>Common verification errors</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default function ValidateTax() {
    const router = useRouter();
    const { isChecking } = useOnboardingRedirect(ROUTES.ONBOARDING.VALIDATE_TAX);
    const { merchantId, merchant, setMerchant, setTaxStatus, setTaxValidationId } = useOnboardingStore();

    const [localStatus, setLocalStatus] = useState<TaxValidationStatus>('idle');
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);
    const [newTaxId, setNewTaxId] = useState('');
    const [error, setError] = useState<string | null>(null);

    const taxId = merchant?.taxId || '';

    const handleValidateTaxId = async () => {
        if (!merchantId) return;

        setLocalStatus('loading');
        setTaxStatus('loading');
        setError(null);

        try {
            const response = await onboardingService.initiateTaxValidation(merchantId);
            setTaxValidationId(response.validationId);
            router.push(ROUTES.REVIEW);
        } catch (err) {
            const error = err as Error;
            console.error('❌ Tax validation failed:', error);
            setLocalStatus('failed');
            setTaxStatus('failed');
            setError(error.message || 'Validation service unavailable');
        }
    };

    const handleUpdateTaxId = async () => {
        if (!merchantId || !newTaxId.trim()) return;

        try {
            await onboardingService.updateUnverifiedTaxId(merchantId, newTaxId.trim());
            // Update local store
            if (merchant) {
                setMerchant({ ...merchant, taxId: newTaxId.trim() });
            }
            setShowUpdateDialog(false);
            setNewTaxId('');
            setLocalStatus('idle');
            setTaxStatus('idle');
        } catch (err) {
            const error = err as Error;
            console.error('❌ Failed to update tax ID:', error);
            setError(error.message || 'Failed to update Tax ID');
        }
    };

    if (isChecking) {
        return (
            <OnboardingLayout currentStep={3}>
                <div className="flex flex-col items-center justify-center py-20">
                    <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                    <h2 className="text-2xl font-bold text-text-primary mb-2">Syncing...</h2>
                    <p className="text-text-secondary">Checking your validation status</p>
                </div>
            </OnboardingLayout>
        );
    }

    return (
        <OnboardingLayout currentStep={3}>
            <div className="space-y-8">
                <div>
                    <h2 className="text-3xl font-bold text-text-primary">Tax ID Validation</h2>
                    <p className="text-text-secondary mt-2">
                        We&apos;re verifying your business tax identification number
                    </p>
                </div>

                {localStatus === 'loading' ? (
                    <Card className="text-center py-12">
                        <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-text-primary mb-2">Validating Tax ID</h3>
                        <p className="text-text-secondary mb-4">Tax ID: {taxId}</p>
                    </Card>
                ) : localStatus === 'failed' ? (
                    <div className="text-center space-y-6">
                        <XCircle className="w-16 h-16 text-red-500 mx-auto" />
                        <div>
                            <h3 className="text-2xl font-semibold text-text-primary mb-2">Validation Unsuccessful</h3>
                            <p className="text-text-secondary">Issue verifying your business information.</p>
                        </div>
                        <div className="bg-card border-l-4 border-red-500 rounded-lg p-6 text-left">
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                <div className="flex-1">
                                    <h4 className="font-semibold text-text-primary mb-2">Verification Error</h4>
                                    <p className="text-text-secondary text-sm">
                                        {error || 'Tax ID could not be verified. Please ensure your EIN matches IRS records.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-4 justify-center">
                            <Button onClick={() => setLocalStatus('idle')} size="lg" className="rounded-full">
                                <RefreshCw size={18} className="mr-2" /> Retry
                            </Button>
                            <Button variant="secondary" onClick={() => setShowUpdateDialog(true)} size="lg" className="rounded-full">
                                <FileText size={18} className="mr-2" /> Update Tax ID
                            </Button>
                        </div>
                    </div>
                ) : (
                    <Card className="text-center py-12">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-2xl font-semibold text-text-primary mb-2">Ready to Validate</h3>
                                <p className="text-text-secondary mb-4">
                                    We&apos;ll verify: <span className="font-mono font-medium">{taxId}</span>
                                </p>
                            </div>
                            <div className="space-y-3">
                                <Button size="lg" className="w-full rounded-full" onClick={handleValidateTaxId}>
                                    Validate Tax ID
                                </Button>
                                <button
                                    type="button"
                                    onClick={() => setShowUpdateDialog(true)}
                                    className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary mx-auto"
                                >
                                    <Pencil size={14} /> Update Tax ID
                                </button>
                            </div>
                        </div>
                    </Card>
                )}

                <WhyThisMattersSection />
            </div>

            <Dialog
                open={showUpdateDialog}
                onClose={() => setShowUpdateDialog(false)}
                title="Update Tax ID"
            >
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-text-primary">Business Tax ID</label>
                        <div className="relative">
                            <Input
                                placeholder="XX-XXXXXXX"
                                className="pl-10"
                                value={newTaxId}
                                onChange={(e) => setNewTaxId(e.target.value)}
                            />
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                        </div>
                    </div>
                    <div className="flex gap-3 justify-end">
                        <Button variant="secondary" className="rounded-full" onClick={() => setShowUpdateDialog(false)}>
                            Cancel
                        </Button>
                        <Button className="rounded-full" onClick={handleUpdateTaxId} disabled={!newTaxId.trim()}>
                            Update
                        </Button>
                    </div>
                </div>
            </Dialog>
        </OnboardingLayout>
    );
}
