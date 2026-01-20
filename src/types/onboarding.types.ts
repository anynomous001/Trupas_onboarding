export interface AccountDetails {
    contactName: string;
    workEmail: string;
    phoneCountry: string;
    phoneNumber: string;
    businessName: string;
    websiteUrl: string;
    taxId: string;
}

export type TaxValidationStatus = 'idle' | 'loading' | 'success' | 'failed' | 'pending';

export interface VerificationState {
    emailVerified: boolean;
    phoneVerified: boolean;
}

export interface TaxValidationState {
    status: TaxValidationStatus;
}

// Merchant data from API registration/login response
export interface Merchant {
    merchantId: string;
    contactName: string;
    email: string;
    phone: string;
    businessName: string;
    businessUrl: string;
    taxId: string;
    emailVerified: boolean;
    phoneVerified: boolean;
    taxIdVerified: boolean;
    accountStatus: string;
    termsAccepted: boolean;
    termsAcceptedAt: string;
    createdAt: string;
    updatedAt: string;
}
