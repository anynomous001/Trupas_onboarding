import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { onboardingService } from '@/services/onboardingService';
import { getRouteFromAccountStatus, isOnCorrectPage } from '@/lib/routeMapper';
import { ROUTES } from '@/config/routes';

/**
 * Hook to automatically redirect users to their current onboarding step
 * Checks auth status from backend and redirects if user is on wrong page
 * 
 * @param currentPageRoute - The route of the current page (e.g., '/onboarding/verification')
 * @param options - Configuration options
 * @returns Object with loading and error states
 */
export function useOnboardingRedirect(
  currentPageRoute: string,
  options: {
    skip?: boolean; // Skip the redirect check
    allowUnauthenticated?: boolean; // Allow page access without auth
  } = {}
) {
  const router = useRouter();
  const { merchantId, accessToken } = useOnboardingStore();
  const [isChecking, setIsChecking] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isRedirecting = useRef(false); // Prevent multiple redirects

  // Dependencies for the check: run when tokens or route changes
  useEffect(() => {
    // Skip if explicitly disabled
    if (options.skip) {
      setIsChecking(false);
      return;
    }

    // Capture the state we need
    const hasTokens = !!(merchantId && accessToken);

    // Case 1: No tokens - handle unauthenticated access
    if (!hasTokens) {
      if (options.allowUnauthenticated) {
        console.log('🔓 [RedirectHook] No tokens, allowed for unauthenticated access');
        setIsChecking(false);
      } else {
        console.log('🔒 [RedirectHook] No tokens, protected page. Redirecting to register.');
        router.push(ROUTES.REGISTER);
      }
      return;
    }

    // Case 2: We have tokens! Check status and redirect if needed
    // Skip if we are already in the middle of a redirect or have already checked for this token/route combination
    if (isRedirecting.current) {
      return;
    }

    const checkStatusAndRedirect = async () => {
      try {
        setIsChecking(true);
        console.log('🔍 [RedirectHook] Token detected! Checking status for:', currentPageRoute);

        // Sync full onboarding state from backend
        // This updates accountStatus, verification flags, and merchant details in the store
        await useOnboardingStore.getState().sync();

        // Get the latest values from the store AFTER sync
        const latestStore = useOnboardingStore.getState();
        const storeAccountStatus = latestStore.accountStatus;

        console.log('📊 [RedirectHook] Current Store Status:', storeAccountStatus);

        // Determine required route from store status
        const requiredRoute = getRouteFromAccountStatus(storeAccountStatus || '');

        // Special case: if we are at /register but have tokens,
        // we should almost ALWAYS redirect away unless status is miraculously empty
        if (currentPageRoute === ROUTES.REGISTER && hasTokens) {
          console.log('⚠️ [RedirectHook] Logic: At registration page with active session. Forcing redirect away.');
        }

        // Check if user is on the correct page
        const isCorrect = isOnCorrectPage(currentPageRoute, storeAccountStatus || '');
        console.log(`🧐 [RedirectHook] Is on correct page? ${isCorrect} (Current: ${currentPageRoute}, Required: ${requiredRoute})`);

        if (!isCorrect) {
          console.log(`🔀 [RedirectHook] Redirecting: ${currentPageRoute} -> ${requiredRoute}`);

          // Verify we aren't redirecting to the same page relative to Next.js routes
          if (requiredRoute !== currentPageRoute) {
            isRedirecting.current = true;
            router.push(requiredRoute);
            return; // Don't set isChecking to false if we are navigating away
          } else {
            console.log('⚠️ [RedirectHook] Routes match but isOnCorrectPage was false. Skipping redirect to prevent loop.');
          }
        } else {
          console.log('✅ [RedirectHook] User is on the correct page');
        }

      } catch (err) {
        const error = err as Error;
        console.error('❌ [RedirectHook] Failed to check status:', error);

        // If 401, tokens are invalid - clear them
        if (error.message?.includes('401') || error.message?.includes('Unauthorized')) {
          console.log('🔓 [RedirectHook] Unauthorized! Clearing tokens and returning to login.');
          useOnboardingStore.getState().reset();
          router.push(ROUTES.LOGIN);
          return;
        } else {
          setError(error.message || 'Failed to verify status');
        }
      } finally {
        setIsChecking(false);
      }
    };

    checkStatusAndRedirect();
  }, [merchantId, accessToken, currentPageRoute, options.skip, options.allowUnauthenticated, router]);

  return {
    isChecking,
    error,
  };
}

/**
 * Simpler hook that just checks if user should be redirected
 * without handling the redirect (useful for pages that want custom behavior)
 * 
 * @returns Required route or null if user is on correct page
 */
export function useRequiredRoute(): {
  requiredRoute: string | null;
  isChecking: boolean;
  error: string | null;
} {
  const { merchantId, accessToken } = useOnboardingStore();
  const [requiredRoute, setRequiredRoute] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!merchantId || !accessToken) {
      setIsChecking(false);
      return;
    }

    const checkStatus = async () => {
      try {
        const status = await onboardingService.getAuthStatus();
        const route = getRouteFromAccountStatus(status.accountStatus);
        setRequiredRoute(route);
      } catch (err) {
        const error = err as Error;
        console.error('Failed to check auth status:', error);
        setError(error.message || 'Failed to verify status');
      } finally {
        setIsChecking(false);
      }
    };

    checkStatus();
  }, [merchantId, accessToken]);

  return {
    requiredRoute,
    isChecking,
    error,
  };
}
