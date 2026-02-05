import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { AccountDetails, TaxValidationStatus, VerificationState, Merchant } from '../types/onboarding.types';

interface OnboardingState {
  // Auth tokens
  accessToken: string | null;
  refreshToken: string | null;

  // Full merchant object from API
  merchant: Merchant | null;

  // Backward compatibility: derived from merchant (read-only convenience accessors)
  merchantId: string | null;
  accountStatus: string | null;

  // Step 1 data (form input before registration)
  accountDetails: AccountDetails | null;

  // Step 2 data (verification status - synced from merchant)
  verification: VerificationState;

  // Step 3 data
  taxValidation: {
    status: TaxValidationStatus;
    validationAttempts: number;
    validationId: string | null;
  };

  // Actions
  // Supports both new format { accessToken, refreshToken } and legacy format with merchantId/accountStatus
  setAuth: (data: { accessToken: string; refreshToken: string; merchantId?: string; accountStatus?: string }) => void;
  setMerchant: (merchant: Merchant) => void;
  setAccountStatus: (status: string) => void;
  setAccountDetails: (data: AccountDetails) => void;
  setEmailVerified: (verified: boolean) => void;
  setPhoneVerified: (verified: boolean) => void;
  setTaxStatus: (status: TaxValidationStatus) => void;
  setTaxValidationId: (id: string | null) => void;
  incrementValidationAttempts: () => void;
  sync: () => Promise<Merchant | null>;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      // Initial state
      accessToken: null,
      refreshToken: null,
      merchant: null,
      merchantId: null, // Backward compatibility
      accountStatus: null, // Backward compatibility
      accountDetails: null,
      verification: {
        emailVerified: false,
        phoneVerified: false,
      },
      taxValidation: {
        status: 'idle' as TaxValidationStatus,
        validationAttempts: 0,
        validationId: null,
      },

      // Actions
      // Supports both new and legacy formats for backward compatibility
      setAuth: (data: { accessToken: string; refreshToken: string; merchantId?: string; accountStatus?: string }) => {
        set((state: OnboardingState) => ({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          // Legacy support: update merchantId/accountStatus if provided (for old code paths)
          merchantId: data.merchantId ?? state.merchantId,
          accountStatus: data.accountStatus ?? state.accountStatus,
        }));
      },
      setMerchant: (merchant: Merchant) => {
        set({
          merchant,
          // Sync backward compatibility fields
          merchantId: merchant.merchantId,
          accountStatus: merchant.accountStatus,
          // Sync verification state from merchant
          verification: {
            emailVerified: merchant.emailVerified,
            phoneVerified: merchant.phoneVerified,
          },
        });
      },
      setAccountStatus: (status: string) =>
        set((state: OnboardingState) => ({
          accountStatus: status,
          merchant: state.merchant ? { ...state.merchant, accountStatus: status } : null,
        })),
      setAccountDetails: (data: AccountDetails) => set({ accountDetails: data }),
      setEmailVerified: (verified: boolean) =>
        set((state: OnboardingState) => ({
          verification: { ...state.verification, emailVerified: verified },
          merchant: state.merchant ? { ...state.merchant, emailVerified: verified } : null,
        })),
      setPhoneVerified: (verified: boolean) =>
        set((state: OnboardingState) => ({
          verification: { ...state.verification, phoneVerified: verified },
          merchant: state.merchant ? { ...state.merchant, phoneVerified: verified } : null,
        })),
      setTaxStatus: (status: TaxValidationStatus) =>
        set((state: OnboardingState) => ({
          taxValidation: { ...state.taxValidation, status },
        })),
      setTaxValidationId: (id: string | null) =>
        set((state: OnboardingState) => ({
          taxValidation: { ...state.taxValidation, validationId: id },
        })),
      incrementValidationAttempts: () =>
        set((state: OnboardingState) => ({
          taxValidation: {
            ...state.taxValidation,
            validationAttempts: state.taxValidation.validationAttempts + 1,
          },
        })),
      sync: async (): Promise<Merchant | null> => {
        try {
          // Dynamic import to avoid potential circular dependencies
          const { onboardingService } = await import('../services/onboardingService');
          const status = await onboardingService.getOnboardingStatus();

          if (status) {
            let updatedMerchant: Merchant | null = null;
            set((state: OnboardingState) => {
              const statusAny = status as Record<string, unknown>;
              const progressAny = statusAny.progress as Record<string, unknown> | undefined;
              const emailVerified = !!(progressAny?.email_verified ?? statusAny.emailVerified);
              const phoneVerified = !!(progressAny?.phone_verified ?? statusAny.phoneVerified);
              const taxIdVerified = !!(progressAny?.tax_id_verified ?? statusAny.taxIdVerified);

              // Extract details if available
              const rawDetails = (statusAny.account_details || statusAny.merchant || statusAny) as Record<string, unknown>;

              // Helper to split phone numbers
              const extractPhone = (raw: Record<string, unknown>): { phoneCountry: string; phoneNumber: string } => {
                const rawPhone = raw?.phone || raw?.phone_number || raw?.phoneNumber || '';
                const match = typeof rawPhone === 'string' ? rawPhone.match(/^(\+\d{1,3})(\d+)$/) : null;
                if (match) return { phoneCountry: match[1], phoneNumber: match[2] };
                return { phoneCountry: state.accountDetails?.phoneCountry || '+1', phoneNumber: typeof rawPhone === 'string' ? rawPhone : '' };
              };

              const phone = extractPhone(rawDetails);

              updatedMerchant = statusAny.merchant ? {
                ...state.merchant,
                ...(statusAny.merchant as Merchant),
                emailVerified,
                phoneVerified,
                taxIdVerified,
              } : (state.merchant ? { ...state.merchant, emailVerified, phoneVerified, taxIdVerified } : null) as Merchant | null;

              return {
                merchantId: (statusAny.merchant_id || statusAny.merchantId || state.merchantId) as string | null,
                accountStatus: (statusAny.account_status || statusAny.accountStatus || state.accountStatus) as string | null,
                verification: {
                  emailVerified,
                  phoneVerified,
                },
                merchant: updatedMerchant,
                accountDetails: rawDetails && (rawDetails.email || rawDetails.phone || rawDetails.business_name) ? {
                  contactName: (rawDetails.contact_name || rawDetails.contactName || state.accountDetails?.contactName || '') as string,
                  workEmail: (rawDetails.email || rawDetails.work_email || rawDetails.workEmail || state.accountDetails?.workEmail || '') as string,
                  phoneCountry: phone.phoneCountry,
                  phoneNumber: phone.phoneNumber,
                  businessName: (rawDetails.business_name || rawDetails.businessName || state.accountDetails?.businessName || '') as string,
                  websiteUrl: (rawDetails.business_url || rawDetails.businessUrl || rawDetails.websiteUrl || state.accountDetails?.websiteUrl || '') as string,
                  taxId: (rawDetails.tax_id || rawDetails.taxId || state.accountDetails?.taxId || '') as string,
                } : state.accountDetails,
              };
            });
            return updatedMerchant;
          }
          return null;
        } catch (err) {
          console.error('❌ Failed to sync onboarding state:', err);
          throw err; // Re-throw so callers can handle (e.g., 401 redirect)
        }
      },
      reset: () => {
        set({
          accessToken: null,
          refreshToken: null,
          merchant: null,
          merchantId: null,
          accountStatus: null,
          accountDetails: null,
          verification: {
            emailVerified: false,
            phoneVerified: false,
          },
          taxValidation: {
            status: 'idle' as TaxValidationStatus,
            validationAttempts: 0,
            validationId: null,
          },
        });
      },
    }),
    {
      name: 'onboarding-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        merchant: state.merchant,
        merchantId: state.merchantId,
        accountStatus: state.accountStatus,
        accountDetails: state.accountDetails,
      }),
    }
  )
);

