import { ROUTES } from '@/config/routes';

/**
 * Maps backend step names and account statuses to frontend route structure
 * This allows the backend to control the flow while frontend maintains its own routing
 */

// Backend step/status to Frontend route mapping
const STEP_ROUTE_MAP: Record<string, string> = {
  // Verification steps
  'verify_email': ROUTES.ONBOARDING.VERIFICATION,
  'pending_email_verification': ROUTES.ONBOARDING.VERIFICATION,
  'verify_phone': ROUTES.ONBOARDING.VERIFICATION,
  'pending_phone_verification': ROUTES.ONBOARDING.VERIFICATION,

  // Tax validation steps
  'tax_validation': ROUTES.ONBOARDING.VALIDATE_TAX,
  'validate_tax_id': ROUTES.ONBOARDING.VALIDATE_TAX,
  'verify_tax_id': ROUTES.ONBOARDING.VALIDATE_TAX,
  'pending_tax_validation': ROUTES.ONBOARDING.VALIDATE_TAX,

  // Review step
  'review': ROUTES.REVIEW,
  'pending_review': ROUTES.REVIEW,
  'pending_manual_review': ROUTES.REVIEW,
  'active': ROUTES.REVIEW,
  'complete': ROUTES.REVIEW,
  'approved': ROUTES.REVIEW,
};

/**
 * Maps a backend step name to the corresponding frontend route
 * @param step - Backend step name (e.g., "verify_phone", "tax_validation")
 * @returns Frontend route path or null if no mapping exists
 */
export function mapBackendStepToRoute(step: string): string | null {
  if (!step) return null;

  // Direct mapping
  if (STEP_ROUTE_MAP[step]) {
    return STEP_ROUTE_MAP[step];
  }

  // Try lowercase version
  const lowerStep = step.toLowerCase().replace(/-/g, '_');
  if (STEP_ROUTE_MAP[lowerStep]) {
    return STEP_ROUTE_MAP[lowerStep];
  }

  // Pattern matching for common patterns
  if (step.includes('email') || step.includes('phone')) {
    return ROUTES.ONBOARDING.VERIFICATION;
  }
  if (step.includes('tax')) {
    return ROUTES.ONBOARDING.VALIDATE_TAX;
  }
  if (step.includes('review') || step.includes('active') || step.includes('complete') || step.includes('approved')) {
    return ROUTES.REVIEW;
  }


  return null;
}

/**
 * Maps account status to the appropriate frontend route
 * @param accountStatus - Backend account status (e.g., "pending_phone_verification")
 * @returns Frontend route path or account details as fallback
 */
export function getRouteFromAccountStatus(accountStatus: string): string {
  if (!accountStatus) {
    return ROUTES.REGISTER;
  }

  const route = mapBackendStepToRoute(accountStatus);
  return route || ROUTES.REGISTER;
}

/**
 * Maps backend's next_step object to frontend route
 * @param nextStep - Backend next_step object with step and url
 * @returns Frontend route path
 */
export function mapNextStepToRoute(nextStep: { step: string; url: string } | null): string | null {
  if (!nextStep) return null;

  // First try to map the step name
  const mappedRoute = mapBackendStepToRoute(nextStep.step);
  if (mappedRoute) {
    return mappedRoute;
  }

  // If step mapping fails, try to extract route from backend URL
  if (nextStep.url) {
    if (nextStep.url.includes('verify-email') || nextStep.url.includes('verify-phone')) {
      return ROUTES.ONBOARDING.VERIFICATION;
    }
    if (nextStep.url.includes('tax')) {
      return ROUTES.ONBOARDING.VALIDATE_TAX;
    }
    if (nextStep.url.includes('review')) {
      return ROUTES.REVIEW;
    }
  }

  return null;
}

/**
 * Checks if the current page matches the required page based on account status
 * @param currentPath - Current page path
 * @param accountStatus - Backend account status
 * @returns True if user is on the correct page
 */
export function isOnCorrectPage(currentPath: string, accountStatus: string): boolean {
  if (!accountStatus) return true;

  const status = accountStatus.toLowerCase();
  const requiredRoute = getRouteFromAccountStatus(accountStatus);

  // Users who have finished onboarding (active/complete/approved/review)
  // are correct on REVIEW or any other "safe" application page.
  if (status === 'active' || status === 'complete' || status === 'approved' || status === 'pending_manual_review') {
    const isRestrictedPage =
      currentPath === ROUTES.LOGIN ||
      currentPath === ROUTES.REGISTER ||
      currentPath.includes('/onboarding/');

    return !isRestrictedPage || currentPath === ROUTES.REVIEW;
  }

  // For users still in the onboarding flow, we require them to be on their specific step
  return currentPath === requiredRoute;
}

/**
 * Gets a user-friendly message for a given onboarding step
 * @param step - Backend step name
 * @returns Human-readable message
 */
export function getStepMessage(step: string): string {
  const messages: Record<string, string> = {
    'verify_email': 'Please verify your email address',
    'verify_phone': 'Please verify your phone number',
    'pending_email_verification': 'Email verification pending',
    'pending_phone_verification': 'Phone verification pending',
    'tax_validation': 'Please validate your tax ID',
    'pending_tax_validation': 'Tax ID validation in progress',
    'review': 'Your application is under review',
    'pending_manual_review': 'Your application is under review',
    'active': 'Account active!',
    'complete': 'Onboarding complete!',
  };

  return messages[step] || 'Continue your onboarding';
}
