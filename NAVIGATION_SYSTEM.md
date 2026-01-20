# Smart Onboarding Navigation System

## Overview

The Smart Onboarding Navigation System automatically manages user routing based on their backend onboarding status. It maps backend step names to frontend routes and ensures users always land on the correct page, even after page refreshes or direct URL access.

## Architecture

### Flow Diagram

```
User Visits Page → Has Auth Token? → No → Allow Access
                         ↓ Yes
                   Call /auth/status API
                         ↓
              Map Backend Step → Frontend Route
                         ↓
         Current Page = Required Page? → Yes → Stay on Page
                         ↓ No
                   Redirect to Correct Page
```

## Files Created

### 1. Route Mapper (`src/lib/routeMapper.ts`)

**Purpose**: Translates backend step names and statuses to frontend route structure.

**Key Functions**:
- `mapBackendStepToRoute(step: string)` - Maps backend step to frontend route
- `getRouteFromAccountStatus(status: string)` - Maps account status to route
- `mapNextStepToRoute(nextStep)` - Maps backend's next_step object to frontend route
- `isOnCorrectPage(currentPath, accountStatus)` - Checks if user is on correct page
- `getStepMessage(step)` - Returns user-friendly message for a step

**Route Mappings**:

| Backend Step/Status | Frontend Route |
|---------------------|----------------|
| `verify_email` | `/onboarding/verification` |
| `verify_phone` | `/onboarding/verification` |
| `pending_email_verification` | `/onboarding/verification` |
| `pending_phone_verification` | `/onboarding/verification` |
| `tax_validation` | `/onboarding/tax-validation` |
| `validate_tax_id` | `/onboarding/tax-validation` |
| `pending_tax_validation` | `/onboarding/tax-validation` |
| `review` | `/onboarding/review` |
| `pending_review` | `/onboarding/review` |
| `complete` | `/dashboard` |
| `active` | `/dashboard` |
| `approved` | `/dashboard` |

### 2. Auto-Redirect Hook (`src/hooks/useOnboardingRedirect.ts`)

**Purpose**: React hook that checks user status and performs auto-redirect if needed.

**Usage**:
```typescript
import { useOnboardingRedirect } from '@/hooks/useOnboardingRedirect';
import { ROUTES } from '@/config/routes';

function MyPage() {
  const { isChecking } = useOnboardingRedirect(ROUTES.ONBOARDING.VERIFICATION);
  
  if (isChecking) {
    return <LoadingSpinner />;
  }
  
  return <PageContent />;
}
```

**Options**:
- `skip` - Skip the redirect check entirely
- `allowUnauthenticated` - Allow page access without authentication (for public pages)

**What It Does**:
1. Checks if user has auth tokens in Zustand store
2. If yes, calls `/auth/status` API endpoint
3. Maps backend status to required frontend route
4. Compares current page with required page
5. Redirects if they don't match
6. Handles errors (like 401) by clearing invalid tokens

### 3. Auth Status API Endpoint

**Added to `src/services/onboardingService.ts`**:

```typescript
getAuthStatus: async (): Promise<AuthStatusResponse> => {
  const response = await apiClient.get<AuthStatusResponseBackend>('/auth/status');
  return convertAuthStatusResponse(response);
}
```

**Response Format** (from backend):
```json
{
  "merchantId": "884b793c-3e18-4526-8433-9afb1db68770",
  "email": "hhh@gmail.com",
  "businessName": "ddsdsd",
  "accountStatus": "pending_phone_verification",
  "emailVerified": true
}
```

## Updated Pages

### Pages with Auto-Redirect

All onboarding pages now include the auto-redirect hook:

1. **`src/app/onboarding/account-details/page.tsx`**
   - Allows unauthenticated access (for new users)
   - Redirects logged-in users to their current step

2. **`src/app/onboarding/verification/page.tsx`**
   - Checks status on mount
   - Redirects if user should be elsewhere

3. **`src/app/onboarding/tax-validation/page.tsx`**
   - Prevents access if user hasn't completed verification
   - Redirects to correct step

4. **`src/app/onboarding/review/page.tsx`**
   - Ensures user has completed all previous steps
   - Auto-redirects if not ready for review

### Navigation Logic Updated

**Files Modified**:
- `src/app/onboarding/AccountDetails.tsx`
- `src/app/onboarding/Verification.tsx`
- `src/app/login/Login.tsx`

**Changes**: Now use `mapNextStepToRoute()` to translate backend URLs to frontend routes before navigation.

**Example**:
```typescript
// Old way (used backend URL directly)
router.push(response.nextStep.url); // e.g., "/onboarding/verify-phone"

// New way (maps to frontend structure)
const frontendRoute = mapNextStepToRoute(response.nextStep);
router.push(frontendRoute); // e.g., "/onboarding/verification"
```

## How It Works

### On Page Load

1. User visits any onboarding page
2. `useOnboardingRedirect` hook activates
3. Hook checks if user has tokens in localStorage (via Zustand)
4. If yes, calls `GET /api/v1/auth/status`
5. Backend returns current `accountStatus` (e.g., "pending_phone_verification")
6. Hook maps status to required route (e.g., "/onboarding/verification")
7. If current page ≠ required page, redirect happens automatically

### After Successful Action (e.g., Email Verification)

1. User completes email verification
2. Backend returns response with `next_step`:
   ```json
   {
     "next_step": {
       "step": "verify_phone",
       "url": "/onboarding/verify-phone"
     }
   }
   ```
3. Frontend uses `mapNextStepToRoute()` to convert to `/onboarding/verification`
4. User is redirected to verification page (which handles both email and phone)

## Console Logging

The system provides detailed console logs for debugging:

```
🔍 Checking auth status for auto-redirect...
📊 Auth Status: {
  accountStatus: 'pending_phone_verification',
  emailVerified: true,
  currentPage: '/onboarding/account-details'
}
📍 Required route: /onboarding/verification
🔀 Redirecting from /onboarding/account-details to /onboarding/verification
```

## Testing Scenarios

### Scenario 1: New User Registration
1. User visits `/onboarding/account-details`
2. No tokens → allowed to stay
3. Completes registration
4. Backend returns `next_step: verify_email`
5. Mapped to `/onboarding/verification`
6. Redirected automatically

### Scenario 2: Returning User (Email Pending)
1. User has tokens with status `pending_email_verification`
2. User manually visits `/onboarding/account-details`
3. Auto-redirect hook checks status
4. Maps to `/onboarding/verification`
5. Redirects automatically

### Scenario 3: Page Refresh
1. User is on `/onboarding/verification`
2. User refreshes page (F5)
3. Auto-redirect hook checks status
4. Status is `pending_phone_verification`
5. Required route is `/onboarding/verification`
6. Current page matches → stays on page ✅

### Scenario 4: Direct URL Access
1. User with `pending_tax_validation` status
2. User manually types `/onboarding/verification`
3. Auto-redirect hook checks status
4. Maps to `/onboarding/tax-validation`
5. Redirects automatically

### Scenario 5: Invalid Tokens
1. User has expired tokens
2. Auto-redirect hook calls `/auth/status`
3. Gets 401 Unauthorized
4. Clears tokens from store
5. User can access public pages normally

## Benefits

✅ **Backend Controls Flow**: Backend determines the onboarding sequence
✅ **Frontend Controls Presentation**: Frontend maintains its own route structure
✅ **Seamless UX**: Users always land on the correct page
✅ **Works on Refresh**: No lost progress or confusion
✅ **URL Protection**: Can't skip steps by manipulating URL
✅ **Easy Maintenance**: Single source of truth for mappings
✅ **Scalable**: Easy to add new steps or change routes

## Adding New Steps

To add a new onboarding step:

1. **Add route mapping** in `src/lib/routeMapper.ts`:
   ```typescript
   const STEP_ROUTE_MAP: Record<string, string> = {
     // ... existing mappings
     'new_step_name': '/onboarding/new-page',
   };
   ```

2. **Create the page** with auto-redirect:
   ```typescript
   export default function NewPage() {
     const { isChecking } = useOnboardingRedirect('/onboarding/new-page');
     if (isChecking) return <Loading />;
     return <NewPageContent />;
   }
   ```

3. **Done!** The system will automatically handle routing to this step.

## Configuration

### Environment Variables

The system uses the existing API configuration:
- `NEXT_PUBLIC_API_URL` - Backend API base URL (default: `http://localhost:8000/api/v1`)

### Zustand Store

Uses the existing `onboardingStore` for:
- `merchantId` - Current user's merchant ID
- `accessToken` - Auth token for API calls
- `refreshToken` - Token refresh

### Dependencies

No new dependencies added! Uses existing:
- Next.js App Router
- Zustand for state management
- Existing API client with auth token handling

## Troubleshooting

### User Stuck in Redirect Loop
- Check backend's `accountStatus` value
- Ensure it maps to a valid route in `STEP_ROUTE_MAP`
- Check console for mapping warnings

### Auto-Redirect Not Working
- Verify tokens exist in localStorage under `onboarding-storage` key
- Check network tab for `/auth/status` API call
- Look for console errors

### Wrong Page After Login
- Check backend's `next_step` in response
- Verify mapping in `mapNextStepToRoute()`
- Confirm frontend route exists

## Summary

The Smart Onboarding Navigation System provides a robust, maintainable solution for managing user flow through the onboarding process. It allows the backend to control the business logic while the frontend maintains clean, user-friendly routes.
