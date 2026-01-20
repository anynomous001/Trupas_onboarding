
# Merchant Onboarding Flow - Revised

## Landing Page → Get Started

-   User lands on landing page
-   User clicks **[Get Started]**
-   Redirect to `/login`

----------

## Login Page - Token Check

### Check 1: Access Token Exists & Valid

```
IF access_token exists AND NOT expired:
  ├─ Call: GET /auth/validate-session
  ├─ Get onboarding status
  │
  ├─ IF tax_id_verified = true:
  │   └─ Redirect to /review
  │       └─ Show success message: "Tax ID verified! Under review."
  │
  └─ ELSE:
      └─ Redirect to next incomplete step:
          ├─ NOT email_verified → /onboarding/verify-email
          ├─ NOT phone_verified → /onboarding/verify-phone
          └─ NOT tax_id_verified → /onboarding/validate-tax

```

### Check 2: Access Token Expired, Refresh Token Valid

```
IF access_token expired AND refresh_token exists:
  ├─ Call: POST /auth/refresh-token
  │
  ├─ IF refresh successful (200 OK):
  │   ├─ Store new access_token
  │   ├─ Call: GET /auth/validate-session
  │   ├─ Get onboarding status
  │   │
  │   ├─ IF tax_id_verified = true:
  │   │   └─ Redirect to /review
  │   │       └─ Show success message: "Tax ID verified! Under review."
  │   │
  │   └─ ELSE:
  │       └─ Redirect to next incomplete step:
  │           ├─ NOT email_verified → /onboarding/verify-email
  │           ├─ NOT phone_verified → /onboarding/verify-phone
  │           └─ NOT tax_id_verified → /onboarding/validate-tax
  │
  └─ ELSE (refresh failed):
      └─ Clear tokens
          └─ Show email entry screen

```

### Check 3: No Valid Tokens

```
IF no tokens OR both expired:
  └─ Show email entry screen
      └─ "Enter your email to continue"

```

----------

## Email Entry & Account Check

### User Enters Email

```
User enters email → Clicks [Continue]
  ↓
Call: GET /auth/check-account-status?email={email}
  │
  ├─ IF exists = true AND soft_deleted = false:
  │   ├─ Call: POST /auth/login/send-otp
  │   └─ Show OTP entry screen
  │
  ├─ IF exists = false:
  │   └─ Show message: "No account found. Please register first."
  │       └─ Show [Register] button → Redirect to /register
  │
  └─ IF exists = true AND soft_deleted = true:
      └─ Show message: "Account deactivated. Please register again."
          └─ Show [Register] button → Redirect to /register

```

----------

## OTP Verification & Login

### User Enters OTP

```
User enters 6-digit OTP → Auto-submit
  ↓
Call: POST /auth/login/verify-otp
  │
  ├─ IF valid (200 OK):
  │   ├─ Store access_token + refresh_token
  │   ├─ Call: GET /merchants/me/onboarding-status
  │   │
  │   ├─ IF tax_id_verified = true:
  │   │   └─ Redirect to /review
  │   │       └─ Show success message: "Tax ID verified! Under review."
  │   │
  │   └─ ELSE:
  │       └─ Redirect to next incomplete step:
  │           ├─ NOT email_verified → /onboarding/verify-email
  │           ├─ NOT phone_verified → /onboarding/verify-phone
  │           └─ NOT tax_id_verified → /onboarding/validate-tax
  │
  └─ ELSE (invalid OTP):
      └─ Show error: "Incorrect code. Try again."
          └─ Allow retry (max 5 attempts)

```

----------

## Registration Flow

### User Clicks [Register]

```
Redirect to /register
  ↓
User fills registration form:
  ├─ Contact name
  ├─ Business name
  ├─ Business URL
  ├─ Tax ID
  ├─ Email (pre-filled if came from login)
  ├─ Phone
  ├─ Password
  └─ Confirm password
  ↓
Call: POST /merchants/register
  │
  ├─ IF successful (201 Created):
  │   ├─ Store access_token + refresh_token
  │   ├─ account_status = "pending_email_verification"
  │   └─ Redirect to /onboarding/verify-email
  │
  └─ ELSE (email exists):
      └─ Show error: "Email already registered. Go to login."
          └─ Show [Login] button

```

----------

## Onboarding Steps

### Step 1: Email Verification (`/onboarding/verify-email`)

```
├─ System sends email OTP automatically
├─ User enters 6-digit OTP
├─ Call: POST /merchants/{id}/verify-email
│
├─ IF valid:
│   ├─ email_verified = true
│   ├─ account_status = "pending_phone_verification"
│   └─ Redirect to /onboarding/verify-phone
│
└─ ELSE:
    └─ Show error: "Invalid code. Try again."

```

### Step 2: Phone Verification (`/onboarding/verify-phone`)

```
├─ System sends SMS OTP automatically
├─ User enters 6-digit OTP
├─ Call: POST /merchants/{id}/verify-phone
│
├─ IF valid:
│   ├─ phone_verified = true
│   ├─ account_status = "pending_tax_validation"
│   └─ Redirect to /onboarding/validate-tax
│
└─ ELSE:
    └─ Show error: "Invalid code. Try again."

```

### Step 3: Tax ID Validation (`/onboarding/validate-tax`)

```
├─ Call: POST /merchants/{id}/initiate-tax-validation
├─ Show processing screen: "Validating your Tax ID..."
├─ Poll: GET /merchants/{id}/tax-validation-status (every 3 seconds)
│
├─ IF status = "success":
│   ├─ tax_id_verified = true
│   ├─ account_status = "pending_manual_review"
│   └─ Redirect to /review
│       └─ Show success message: "Tax ID verified! Under review."
│
├─ ELSE IF status = "failed":
│   └─ Show error: "Tax ID validation failed. Please retry or contact support."
│       └─ Options: [Retry] or [Contact Support]
│
└─ ELSE IF status = "processing":
    └─ Continue polling...

```

----------

## Review Page (`/review`) - Final Step

### Tax ID Verified - Application Under Review

```
Display:
  ✅ Tax ID Verified Successfully!
  
  Your application is under review by our team.
  We'll notify you via email once approved.
  
  Expected review time: 24-48 hours
  
  Application Status: Pending Manual Review
  
  [Contact Support] (if questions)
  [Logout]

```

### Review Complete - Account Approved

```
IF admin approves application:
  ├─ account_status = "active"
  ├─ Send email: "Account approved! You can now login."
  └─ User can login and access full platform

```

----------

## Onboarding Progress States

Step

Status

Redirect

**1. Email Not Verified**

`pending_email_verification`

`/onboarding/verify-email`

**2. Phone Not Verified**

`pending_phone_verification`

`/onboarding/verify-phone`

**3. Tax ID Not Verified**

`pending_tax_validation`

`/onboarding/validate-tax`

**4. Tax ID Verified**

`pending_manual_review`

`/review` ✅

**5. Approved**

`active`

Full platform access

----------

## Routing Logic

```javascript
function determineRedirect(merchant) {
  // Final step - Tax ID verified
  if (merchant.tax_id_verified === true) {
    return "/review";  // FINAL DESTINATION
  }
  
  // Progressive steps
  if (!merchant.email_verified) {
    return "/onboarding/verify-email";
  }
  
  if (!merchant.phone_verified) {
    return "/onboarding/verify-phone";
  }
  
  if (!merchant.tax_id_verified) {
    return "/onboarding/validate-tax";
  }
}

```

----------

## Summary

**Total Onboarding Steps: 3**

1.  Email Verification
2.  Phone Verification
3.  Tax ID Validation

**Final Destination:** `/review` (when tax_id_verified = true)

**No Dashboard** - Review page is the end of onboarding flow

**Entry Points:**

-   New users: Landing page → Get Started → Login → Register → Onboarding
-   Returning users: Landing page → Get Started → Login → Auto-redirect to last step or Review
