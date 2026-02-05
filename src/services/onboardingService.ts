import { apiClient } from './apiClient';
import type { TaxValidationStatus, Merchant } from '../types/onboarding.types';

// Backend merchant object (snake_case from API)
export interface MerchantBackend {
    merchant_id: string;
    contact_name: string;
    email: string;
    phone: string;
    business_name: string;
    business_url: string;
    tax_id: string;
    email_verified: boolean;
    phone_verified: boolean;
    tax_id_verified: boolean;
    account_status: string;
    terms_accepted: boolean;
    terms_accepted_at: string;
    created_at: string;
    updated_at: string;
}

// Backend response format (snake_case)
export interface RegisterResponseBackend {
    success: boolean;
    message: string;
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number;
    merchant: MerchantBackend;
    next_step: string;
}

// Frontend interface (camelCase)
export interface RegisterResponse {
    success: boolean;
    message: string;
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: number;
    merchant: Merchant;
    nextStep: string;
}

// Helper to convert backend merchant to frontend format
function convertMerchant(backend: MerchantBackend): Merchant {
    return {
        merchantId: backend.merchant_id,
        contactName: backend.contact_name,
        email: backend.email,
        phone: backend.phone,
        businessName: backend.business_name,
        businessUrl: backend.business_url,
        taxId: backend.tax_id,
        emailVerified: backend.email_verified,
        phoneVerified: backend.phone_verified,
        taxIdVerified: backend.tax_id_verified,
        accountStatus: backend.account_status,
        termsAccepted: backend.terms_accepted,
        termsAcceptedAt: backend.terms_accepted_at,
        createdAt: backend.created_at,
        updatedAt: backend.updated_at,
    };
}

// Helper to convert backend response to frontend format
function convertRegisterResponse(backendResponse: RegisterResponseBackend): RegisterResponse {
    return {
        success: backendResponse.success,
        message: backendResponse.message,
        accessToken: backendResponse.access_token,
        refreshToken: backendResponse.refresh_token,
        tokenType: backendResponse.token_type,
        expiresIn: backendResponse.expires_in,
        merchant: convertMerchant(backendResponse.merchant),
        nextStep: backendResponse.next_step,
    };
}

// Backend response for send OTP endpoints (snake_case)
export interface SendOTPResponseBackend {
    otp_sent: boolean;
    type: string; // "email" or "phone"
    destination: string;
    expires_in: number;
    resend_count: number;
}

// Frontend interface for send OTP (camelCase)
export interface SendOTPResponse {
    otpSent: boolean;
    type: string;
    destination: string;
    expiresIn: number;
    resendCount: number;
}

// Helper to convert send OTP response
function convertSendOTPResponse(backend: SendOTPResponseBackend): SendOTPResponse {
    return {
        otpSent: backend.otp_sent,
        type: backend.type,
        destination: backend.destination,
        expiresIn: backend.expires_in,
        resendCount: backend.resend_count,
    };
}

// Backend response for verify email/phone endpoints (snake_case)
export interface VerifyOTPResponseBackend {
    verified: boolean;
    account_status: string;
    next_step: string;
    token_extended_to: string;
}

// Frontend interface for verify email/phone (camelCase)
export interface VerifyOTPResponse {
    verified: boolean;
    accountStatus: string;
    nextStep: string;
    tokenExtendedTo: string;
}

// Helper to convert verify OTP response
function convertVerifyOTPResponse(backend: VerifyOTPResponseBackend): VerifyOTPResponse {
    return {
        verified: backend.verified,
        accountStatus: backend.account_status,
        nextStep: backend.next_step,
        tokenExtendedTo: backend.token_extended_to,
    };
}

// Backend response for update unverified email (snake_case)
export interface UpdateEmailResponseBackend {
    email_updated: boolean;
    otp_sent: boolean;
    destination: string;
}

// Frontend interface for update unverified email (camelCase)
export interface UpdateEmailResponse {
    emailUpdated: boolean;
    otpSent: boolean;
    destination: string;
}

// Helper to convert update email response
function convertUpdateEmailResponse(backend: UpdateEmailResponseBackend): UpdateEmailResponse {
    return {
        emailUpdated: backend.email_updated,
        otpSent: backend.otp_sent,
        destination: backend.destination,
    };
}

// Backend response for update unverified phone (snake_case)
export interface UpdatePhoneResponseBackend {
    phone_updated: boolean;
    otp_sent: boolean;
    destination: string;
}

// Frontend interface for update unverified phone (camelCase)
export interface UpdatePhoneResponse {
    phoneUpdated: boolean;
    otpSent: boolean;
    destination: string;
}

// Helper to convert update phone response
function convertUpdatePhoneResponse(backend: UpdatePhoneResponseBackend): UpdatePhoneResponse {
    return {
        phoneUpdated: backend.phone_updated,
        otpSent: backend.otp_sent,
        destination: backend.destination,
    };
}

// Legacy OTPResponse for backward compatibility
export interface OTPResponse {
    otpSent: boolean;
    destination: string;
    expiresIn: number;
    attemptId?: string;
    resendCount?: number;
}

// Backend response for login send-otp (snake_case)
export interface LoginSendOTPResponseBackend {
    otp_sent: boolean;
    destination: string;
    expires_in: number;
    attempt_id: string;
}

// Frontend interface for login send-otp (camelCase)
export interface LoginSendOTPResponse {
    otpSent: boolean;
    destination: string;
    expiresIn: number;
    attemptId: string;
}

// Helper to convert login send OTP response
function convertLoginSendOTPResponse(backend: LoginSendOTPResponseBackend): LoginSendOTPResponse {
    return {
        otpSent: backend.otp_sent,
        destination: backend.destination,
        expiresIn: backend.expires_in,
        attemptId: backend.attempt_id,
    };
}

// Backend response for login verify-otp (snake_case from API)
export interface LoginVerifyOTPResponseBackend {
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number;
    merchant_id: string;
    account_status: string;
    onboarding_step?: string;
    progress: {
        email_verified: boolean;
        phone_verified: boolean;
        tax_id_verified: boolean;
    };
    next_step?: {
        step: string;
        url: string;
        message?: string;
    } | null;
    access_expires_at: string;
    refresh_expires_at: string;
}

// Frontend interface for login verify-otp (camelCase)
export interface LoginVerifyOTPResponse {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: number;
    merchantId: string;
    accountStatus: string;
    onboardingStep?: string;
    progress: {
        emailVerified: boolean;
        phoneVerified: boolean;
        taxIdVerified: boolean;
    };
    nextStep?: {
        step: string;
        url: string;
        message?: string;
    } | null;
    accessExpiresAt: string;
    refreshExpiresAt: string;
}

// Validate Session Response
export interface ValidateSessionResponseBackend {
    valid: boolean;
    merchant: MerchantBackend;
    account_status: string; // duplicate of merchant.account_status for convenience
}

export interface ValidateSessionResponse {
    valid: boolean;
    merchant: Merchant;
    accountStatus: string;
}

function convertValidateSessionResponse(backend: Record<string, unknown>): ValidateSessionResponse {
    // Backend can return merchant nested or top-level fields
    const merchant = backend.merchant ? convertMerchant(backend.merchant) : {
        merchantId: backend.merchant_id || backend.merchantId || '',
        contactName: backend.contact_name || backend.contactName || '',
        email: backend.email || '',
        phone: backend.phone || '',
        businessName: backend.business_name || backend.businessName || '',
        businessUrl: backend.business_url || backend.businessUrl || '',
        taxId: backend.tax_id || backend.taxId || '',
        emailVerified: !!(backend.email_verified ?? backend.emailVerified ?? backend.progress?.email_verified),
        phoneVerified: !!(backend.phone_verified ?? backend.phoneVerified ?? backend.progress?.phone_verified),
        taxIdVerified: !!(backend.tax_id_verified ?? backend.taxIdVerified ?? backend.progress?.tax_id_verified),
        accountStatus: backend.account_status || backend.accountStatus || '',
        termsAccepted: !!(backend.terms_accepted ?? backend.termsAccepted),
        termsAcceptedAt: backend.terms_accepted_at || backend.termsAcceptedAt || '',
        createdAt: backend.created_at || backend.createdAt || '',
        updatedAt: backend.updated_at || backend.updatedAt || '',
    };

    return {
        valid: !!backend.valid,
        merchant,
        accountStatus: backend.account_status || backend.accountStatus || merchant.accountStatus,
    };
}

// Refresh Token Response
export interface RefreshTokenResponseBackend {
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number;
}

export interface RefreshTokenResponse {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: number;
}

function convertRefreshTokenResponse(backend: RefreshTokenResponseBackend): RefreshTokenResponse {
    return {
        accessToken: backend.access_token,
        refreshToken: backend.refresh_token,
        tokenType: backend.token_type,
        expiresIn: backend.expires_in,
    };
}

// Helper to convert login verify OTP response
function convertLoginVerifyOTPResponse(backend: LoginVerifyOTPResponseBackend): LoginVerifyOTPResponse {
    return {
        accessToken: backend.access_token,
        refreshToken: backend.refresh_token,
        tokenType: backend.token_type,
        expiresIn: backend.expires_in,
        merchantId: backend.merchant_id,
        accountStatus: backend.account_status,
        onboardingStep: backend.onboarding_step,
        progress: {
            emailVerified: backend.progress.email_verified,
            phoneVerified: backend.progress.phone_verified,
            taxIdVerified: backend.progress.tax_id_verified,
        },
        nextStep: backend.next_step
            ? {
                step: backend.next_step.step,
                url: backend.next_step.url,
                message: backend.next_step.message,
            }
            : null,
        accessExpiresAt: backend.access_expires_at,
        refreshExpiresAt: backend.refresh_expires_at,
    };
}

// Backend response (snake_case from API) - Legacy for other verify endpoints
export interface VerifyResponseBackend {
    access_token?: string;
    refresh_token?: string;
    token_type?: string;
    expires_in?: number;
    merchant_id: string;
    account_status: string;
    onboarding_step?: string;
    progress: {
        email_verified: boolean;
        phone_verified: boolean;
        tax_id_verified: boolean;
    };
    next_step?: {
        step: string;
        url: string;
        message?: string;
    } | null;
    account_details?: Record<string, unknown>;
}

// Frontend interface (camelCase for internal use) - Legacy for other verify endpoints
export interface VerifyResponse {
    verified: boolean;
    merchantId: string;
    accessToken?: string;
    refreshToken?: string;
    accountStatus: string;
    onboardingStep?: string;
    accountDetails?: Record<string, unknown>;
    progress: {
        emailVerified: boolean;
        phoneVerified: boolean;
        taxIdVerified: boolean;
    };
    nextStep?: {
        step: string;
        url: string;
        message?: string;
    } | null;
}

// Auth Status Response (from /auth/status endpoint)
export interface AuthStatusResponseBackend {
    merchantId: string;
    email: string;
    businessName: string;
    accountStatus: string;
    emailVerified: boolean;
}

export interface AuthStatusResponse {
    merchantId: string;
    email: string;
    businessName: string;
    accountStatus: string;
    emailVerified: boolean;
}

function convertAuthStatusResponse(backendResponse: Record<string, unknown>): AuthStatusResponse {
    return {
        merchantId: backendResponse.merchantId || backendResponse.merchant_id,
        email: backendResponse.email,
        businessName: backendResponse.businessName || backendResponse.business_name,
        accountStatus: backendResponse.accountStatus || backendResponse.account_status,
        emailVerified: backendResponse.emailVerified !== undefined ? backendResponse.emailVerified : backendResponse.email_verified,
    };
}

// Helper to convert backend response to frontend format
function convertVerifyResponse(backendResponse: VerifyResponseBackend): VerifyResponse {
    return {
        verified: true, // If we got a response, verification was successful
        merchantId: backendResponse.merchant_id,
        accessToken: backendResponse.access_token,
        refreshToken: backendResponse.refresh_token,
        accountStatus: backendResponse.account_status,
        onboardingStep: backendResponse.onboarding_step,
        accountDetails: backendResponse.account_details,
        progress: {
            emailVerified: backendResponse.progress.email_verified,
            phoneVerified: backendResponse.progress.phone_verified,
            taxIdVerified: backendResponse.progress.tax_id_verified,
        },
        nextStep: backendResponse.next_step
            ? {
                step: backendResponse.next_step.step,
                url: backendResponse.next_step.url,
                message: backendResponse.next_step.message,
            }
            : null,
    };
}

// Backend response for tax validation (snake_case from API)
export interface TaxValidationResponseBackend {
    validation_id: string;
    merchant_id: string;
    tax_id: string;
    status: string;
    external_vendor: string | null;
    initiated_at: string;
    validated_at: string | null;
    failure_reason: string | null;
}

// Frontend interface for tax validation (camelCase)
export interface TaxValidationResponse {
    validationId: string;
    merchantId: string;
    taxId: string;
    status: string;
    externalVendor: string | null;
    initiatedAt: string;
    validatedAt: string | null;
    failureReason: string | null;
}

// Helper to convert tax validation response
function convertTaxValidationResponse(backend: TaxValidationResponseBackend): TaxValidationResponse {
    return {
        validationId: backend.validation_id,
        merchantId: backend.merchant_id,
        taxId: backend.tax_id,
        status: backend.status,
        externalVendor: backend.external_vendor,
        initiatedAt: backend.initiated_at,
        validatedAt: backend.validated_at,
        failureReason: backend.failure_reason,
    };
}

// Backend response for tax ID update (snake_case from API)
export interface TaxIdUpdateResponseBackend {
    success: boolean;
    message: string;
    merchant_id: string;
    new_tax_id: string;
    verification_status: string;
}

// Frontend interface for tax ID update (camelCase)
export interface TaxIdUpdateResponse {
    success: boolean;
    message: string;
    merchantId: string;
    newTaxId: string;
    verificationStatus: string;
}

// Helper to convert tax ID update response
function convertTaxIdUpdateResponse(backend: TaxIdUpdateResponseBackend): TaxIdUpdateResponse {
    return {
        success: backend.success,
        message: backend.message,
        merchantId: backend.merchant_id,
        newTaxId: backend.new_tax_id,
        verificationStatus: backend.verification_status,
    };
}

export const onboardingService = {
    // Registration
    validateEmail: (email: string) =>
        apiClient.get<{ available: boolean; message: string }>(`/merchants/validate/email?email=${encodeURIComponent(email)}`),

    validatePhone: (phone: string) =>
        apiClient.get<{ available: boolean; message: string }>(`/merchants/validate/phone?phone=${encodeURIComponent(phone)}`),

    validateTaxId: (taxId: string) =>
        apiClient.get<{ available: boolean; message: string }>(`/merchants/validate/tax-id?tax_id=${encodeURIComponent(taxId)}`),

    // Auth/Login
    validateSession: async (): Promise<ValidateSessionResponse> => {
        const response = await apiClient.get<ValidateSessionResponseBackend>('/auth/validate-session');
        return convertValidateSessionResponse(response);
    },

    refreshToken: async (refreshToken: string): Promise<RefreshTokenResponse> => {
        const response = await apiClient.post<RefreshTokenResponseBackend>('/auth/refresh-token', { refresh_token: refreshToken });
        return convertRefreshTokenResponse(response);
    },

    checkAccountStatus: (email: string) =>
        apiClient.get<{ exists: boolean; status: string; action: string; message: string; soft_deleted?: boolean }>(`/auth/check-account-status?email=${encodeURIComponent(email)}`),

    sendLoginOtp: async (email: string): Promise<LoginSendOTPResponse> => {
        const response = await apiClient.post<LoginSendOTPResponseBackend>('/auth/login/send-otp', { email });
        return convertLoginSendOTPResponse(response);
    },

    verifyLoginOtp: async (email: string, otp: string): Promise<LoginVerifyOTPResponse> => {
        const response = await apiClient.post<LoginVerifyOTPResponseBackend>('/auth/login/verify-otp', { email, otp });
        return convertLoginVerifyOTPResponse(response);
    },

    register: async (data: Record<string, unknown>): Promise<RegisterResponse> => {
        const response = await apiClient.post<RegisterResponseBackend>('/auth/register', data);
        return convertRegisterResponse(response);
    },

    // Email Verification
    sendEmailOtp: async (merchantId: string): Promise<SendOTPResponse> => {
        const response = await apiClient.post<SendOTPResponseBackend>(`/merchants/${merchantId}/send-email-otp`);
        return convertSendOTPResponse(response);
    },

    resendEmailOtp: async (merchantId: string): Promise<SendOTPResponse> => {
        const response = await apiClient.post<SendOTPResponseBackend>(`/merchants/${merchantId}/send-email-otp`);
        return convertSendOTPResponse(response);
    },

    verifyEmail: async (merchantId: string, otp: string): Promise<VerifyOTPResponse> => {
        const response = await apiClient.post<VerifyOTPResponseBackend>(`/merchants/${merchantId}/verify-email`, { otp });
        return convertVerifyOTPResponse(response);
    },

    updateUnverifiedEmail: async (merchantId: string, newEmail: string): Promise<UpdateEmailResponse> => {
        const response = await apiClient.put<UpdateEmailResponseBackend>(
            `/merchants/${merchantId}/update-unverified-email`,
            { new_email: newEmail }
        );
        return convertUpdateEmailResponse(response);
    },

    // Phone Verification
    sendPhoneOtp: async (merchantId: string): Promise<SendOTPResponse> => {
        const response = await apiClient.post<SendOTPResponseBackend>(`/merchants/${merchantId}/send-phone-otp`);
        return convertSendOTPResponse(response);
    },

    resendPhoneOtp: async (merchantId: string): Promise<SendOTPResponse> => {
        const response = await apiClient.post<SendOTPResponseBackend>(`/merchants/${merchantId}/send-phone-otp`);
        return convertSendOTPResponse(response);
    },

    verifyPhone: async (merchantId: string, otp: string): Promise<VerifyOTPResponse> => {
        const response = await apiClient.post<VerifyOTPResponseBackend>(`/merchants/${merchantId}/verify-phone`, { otp });
        return convertVerifyOTPResponse(response);
    },

    updateUnverifiedPhone: async (merchantId: string, newPhone: string): Promise<UpdatePhoneResponse> => {
        const response = await apiClient.put<UpdatePhoneResponseBackend>(
            `/merchants/${merchantId}/update-unverified-phone`,
            { new_phone: newPhone }
        );
        return convertUpdatePhoneResponse(response);
    },

    // Tax Validation
    initiateTaxValidation: async (merchantId: string): Promise<TaxValidationResponse> => {
        const response = await apiClient.post<TaxValidationResponseBackend>(`/merchants/${merchantId}/initiate-tax-validation`, {});
        return convertTaxValidationResponse(response);
    },

    getTaxValidationStatus: async (merchantId: string): Promise<TaxValidationResponse> => {
        const response = await apiClient.get<TaxValidationResponseBackend>(`/merchants/${merchantId}/tax-validation-status`);
        return convertTaxValidationResponse(response);
    },

    cancelTaxValidation: (merchantId: string) =>
        apiClient.post<{ cancelled: boolean }>(`/merchants/${merchantId}/cancel-tax-validation`),

    updateUnverifiedTaxId: async (merchantId: string, newTaxId: string): Promise<TaxIdUpdateResponse> => {
        const response = await apiClient.put<TaxIdUpdateResponseBackend>(`/merchants/${merchantId}/update-tax-id`, { tax_id: newTaxId });
        return convertTaxIdUpdateResponse(response);
    },

    // Status
    getOnboardingStatus: () =>
        apiClient.get<Record<string, unknown>>('/merchants/me/onboarding-status'),

    // Get current auth status (for auto-redirect)
    getAuthStatus: async (): Promise<AuthStatusResponse> => {
        const response = await apiClient.get<AuthStatusResponseBackend>('/auth/status');
        return convertAuthStatusResponse(response);
    },
};
