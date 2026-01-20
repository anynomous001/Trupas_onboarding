# Backend Integration Complete ✅

All mock services have been removed and your application is now configured to use your actual backend API.

## Changes Made

### 1. Switched to Real Backend Service
Updated the following files to use `onboardingService` instead of `mockOnboardingService`:
- ✅ `src/app/onboarding/AccountDetails.tsx`
- ✅ `src/app/onboarding/Verification.tsx`
- ✅ `src/app/login/Login.tsx`

### 2. Enhanced Logging
Updated console logs to show real backend operations:
- 🚀 Registration attempts
- 📧 Email OTP sending
- 📱 Phone OTP sending
- ✅ Success messages
- ❌ Error messages

### 3. API Configuration

Your app will connect to the backend using the URL specified in `.env.local` or defaults to:
```
http://localhost:8000/api/v1
```

## Backend API Endpoints Being Used

### Authentication & Registration
- `POST /auth/register` - Register new merchant
- `GET /auth/check-account-status?email={email}` - Check if account exists
- `POST /auth/login/send-otp` - Send login OTP
- `POST /auth/login/verify-otp` - Verify login OTP

### Email Verification
- `POST /merchants/{merchantId}/send-email-otp` - Send email OTP
- `POST /merchants/{merchantId}/verify-email` - Verify email OTP
- `PUT /merchants/{merchantId}/update-unverified-email` - Update email before verification

### Phone Verification
- `POST /merchants/{merchantId}/send-phone-otp` - Send phone OTP
- `POST /merchants/{merchantId}/verify-phone` - Verify phone OTP
- `PUT /merchants/{merchantId}/update-unverified-phone` - Update phone before verification

### Tax Validation
- `POST /merchants/{merchantId}/validate-tax-id` - Initiate tax ID validation
- `GET /merchants/{merchantId}/tax-validation-status` - Check validation status
- `POST /merchants/{merchantId}/cancel-tax-validation` - Cancel validation
- `PUT /merchants/{merchantId}/update-tax-id` - Update tax ID

### Status & Info
- `GET /merchants/me/onboarding-status` - Get merchant onboarding status

## Setup Instructions

### 1. Create Environment File

Create a `.env.local` file in the project root:

```bash
# For local development
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1

# For production, update to your production URL:
# NEXT_PUBLIC_API_URL=https://api.truepas.com/api/v1
```

### 2. Start Your Backend Server

Make sure your backend is running on the configured URL (default: `http://localhost:8000`)

### 3. Restart Next.js Dev Server

After creating `.env.local`, restart your dev server:

```bash
npm run dev
```

## Testing the Integration

1. **Registration Flow:**
   - Go to `/onboarding/account-details`
   - Fill out the form
   - Click "Create Account"
   - Check console for: `🚀 Registering merchant account...`
   - Should see: `✅ Registration successful!`

2. **Email Verification:**
   - Dialog should pop up
   - Check console for: `📧 Sending email OTP to: {email}`
   - Enter the OTP received via email
   - Click "Validate"

3. **Phone Verification:**
   - After email is verified
   - Click "Send OTP" for phone
   - Check console for: `📱 Sending phone OTP to: {phone}`
   - Enter the OTP received via SMS
   - Click "Validate"

4. **Login Flow:**
   - Go to `/login`
   - Enter email
   - Check console for: `🔍 Checking account status for: {email}`
   - Dialog pops up for OTP
   - Enter OTP from email
   - Click "Verify OTP"

## Troubleshooting

### Backend Not Running
**Error:** Network errors or connection refused

**Solution:** Make sure your backend server is running on the configured URL

### CORS Issues
**Error:** CORS policy blocking requests

**Solution:** Configure your backend to allow requests from `http://localhost:3000`

### Wrong API URL
**Error:** 404 errors on API endpoints

**Solution:** 
1. Check your `.env.local` file has the correct `NEXT_PUBLIC_API_URL`
2. Verify your backend is using the same endpoint paths
3. Restart Next.js dev server after changing `.env.local`

### Token Not Persisting
**Error:** Tokens lost after page reload

**Solution:** Check browser console for errors. The app uses Zustand persist middleware which should automatically save to localStorage under key `onboarding-storage`

## API Response Requirements

Your backend should return responses matching these TypeScript interfaces:

```typescript
// Registration Response
interface RegisterResponse {
    merchantId: string;
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: number;
    accountStatus: string;
    nextStep: {
        step: string;
        url: string;
    };
}

// OTP Response
interface OTPResponse {
    otpSent: boolean;
    destination: string;
    expiresIn: number;
    attemptId?: string;
    resendCount?: number;
}

// Verification Response
interface VerifyResponse {
    verified: boolean;
    merchantId: string;
    accessToken?: string;
    refreshToken?: string;
    accountStatus: string;
    accountDetails?: any;
    progress: {
        emailVerified: boolean;
        phoneVerified: boolean;
        taxIdVerified: boolean;
    };
    nextStep: {
        step: string;
        url: string;
    };
}
```

## Next Steps

1. ✅ Create `.env.local` with your backend URL
2. ✅ Ensure backend is running
3. ✅ Test registration flow
4. ✅ Test email/phone verification
5. ✅ Test login flow
6. ✅ Deploy to production with production API URL

Your app is now fully integrated with your backend! 🚀
