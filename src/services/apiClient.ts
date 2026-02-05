const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

let refreshPromise: Promise<string | null> | null = null;

// Helper to get token from Zustand persisted storage
function getStoredToken(): string | null {
    if (typeof window === 'undefined') return null;

    try {
        const storedData = localStorage.getItem('onboarding-storage');
        if (!storedData) return null;

        const parsed = JSON.parse(storedData);
        return parsed.state?.accessToken || null;
    } catch (err) {
        console.error('Failed to parse stored token:', err);
        return null;
    }
}

// Helper to get refresh token from Zustand persisted storage
function getStoredRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;

    try {
        const storedData = localStorage.getItem('onboarding-storage');
        if (!storedData) return null;

        const parsed = JSON.parse(storedData);
        return parsed.state?.refreshToken || null;
    } catch (err) {
        console.error('Failed to parse stored refresh token:', err);
        return null;
    }
}

// Helper to update tokens in Zustand persisted storage
function updateStoredTokens(accessToken: string, refreshToken: string): void {
    if (typeof window === 'undefined') return;

    try {
        const storedData = localStorage.getItem('onboarding-storage');
        if (!storedData) return;

        const parsed = JSON.parse(storedData);
        parsed.state.accessToken = accessToken;
        parsed.state.refreshToken = refreshToken;
        localStorage.setItem('onboarding-storage', JSON.stringify(parsed));
    } catch (err) {
        console.error('Failed to update stored tokens:', err);
    }
}

async function refreshTokens(): Promise<string | null> {
    // If already refreshing, return the existing promise
    if (refreshPromise) {
        return refreshPromise;
    }

    const refreshTokenValue = getStoredRefreshToken();
    if (!refreshTokenValue) return null;

    // Create a single refresh promise that all requests can wait for
    refreshPromise = (async () => {
        try {
            console.log('🔄 Refreshing access token...');
            const response = await fetch(`${BASE_URL}/auth/refresh-token`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refresh_token: refreshTokenValue }),
            });

            if (!response.ok) throw new Error('Refresh failed');

            const data = await response.json();

            // API returns snake_case: access_token, refresh_token
            const newAccessToken = data.access_token || data.accessToken;
            const newRefreshToken = data.refresh_token || data.refreshToken;

            // Update tokens in Zustand persisted storage
            if (newAccessToken && newRefreshToken) {
                updateStoredTokens(newAccessToken, newRefreshToken);
                console.log('✅ Token refreshed successfully');
                return newAccessToken;
            }

            throw new Error('Invalid refresh response');
        } catch (err) {
            console.error('❌ Token refresh failed:', err);
            // Clear the entire onboarding storage on refresh failure
            if (typeof window !== 'undefined') {
                localStorage.removeItem('onboarding-storage');
            }
            return null;
        } finally {
            // Clear the refresh promise after completion
            refreshPromise = null;
        }
    })();

    return refreshPromise;
}

async function request<T>(
    endpoint: string,
    options: RequestInit = {},
    retryCount: number = 0
): Promise<T> {
    // Prevent infinite loops - max 1 retry
    if (retryCount > 1) {
        throw new Error('Maximum retry attempts exceeded');
    }

    const token = getStoredToken();

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    // If unauthorized and we haven't retried yet, try to refresh token
    if (response.status === 401 && retryCount === 0) {
        console.log('🔒 Got 401, attempting token refresh...');
        const newToken = await refreshTokens();

        if (newToken) {
            console.log('🔄 Retrying request with new token...');
            // Retry the request with the new token
            return request<T>(endpoint, options, retryCount + 1);
        } else {
            console.log('❌ Token refresh failed, throwing error');
            throw new Error('Unauthorized - please log in again');
        }
    }

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'An error occurred' }));
        throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
}

export const apiClient = {
    get: <T>(endpoint: string, options?: RequestInit) =>
        request<T>(endpoint, { ...options, method: 'GET' }),
    post: <T>(endpoint: string, body?: unknown, options?: RequestInit) =>
        request<T>(endpoint, {
            ...options,
            method: 'POST',
            body: body ? JSON.stringify(body) : undefined,
        }),
    put: <T>(endpoint: string, body?: unknown, options?: RequestInit) =>
        request<T>(endpoint, {
            ...options,
            method: 'PUT',
            body: body ? JSON.stringify(body) : undefined,
        }),
    delete: <T>(endpoint: string, options?: RequestInit) =>
        request<T>(endpoint, { ...options, method: 'DELETE' }),
};
