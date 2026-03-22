// Handles base URL, auth tokens from localStorage, and standardizes requests.

const BASE_URL = 'https://bonane00.pythonanywhere.com/glowKGL';

const api = {
    async request(endpoint, options = {}) {
        const token = localStorage.getItem('access_token');

        const headers = {
            // Only set Content-Type for non-FormData requests
            ...(!(options.body instanceof FormData) && { 'Content-Type': 'application/json' }),
            ...(token && { 'Authorization': `Bearer ${token}` }),
            ...options.headers,
        };

        const config = {
            ...options,
            headers,
        };

        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, config);

            // Re-login when token expired
            if (response.status === 401) {
                console.warn('Session expired. Redirecting to login...');
                localStorage.removeItem('access_token');
                window.dispatchEvent(new Event('auth-401'));
            }

            // Return empty object for 204 No Content
            if (response.status === 204) return {};

            // Handle JSON response or empty object
            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                let errorMessage = data.detail || data.error;

                // If no detail/error, try to find the first field error
                if (!errorMessage && typeof data === 'object') {
                    const firstKey = Object.keys(data)[0];
                    if (firstKey) {
                        const firstError = data[firstKey];
                        errorMessage = `${firstKey}: ${Array.isArray(firstError) ? firstError[0] : firstError}`;
                    }
                }

                const error = new Error(errorMessage || 'Something went wrong');
                error.data = data;
                throw error;
            }

            return data;
        } catch (error) {
            console.error(`API Error [${options.method || 'GET'} ${endpoint}]:`, error.message);
            if (error.data) console.error('Full Error Data:', error.data);
            throw error;
        }
    },

    get(endpoint, headers = {}) {
        return this.request(endpoint, { method: 'GET', headers });
    },

    post(endpoint, body, headers = {}) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(body),
            headers,
        });
    },

    put(endpoint, body, headers = {}) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers,
        });
    },

    patch(endpoint, body, headers = {}) {
        return this.request(endpoint, {
            method: 'PATCH',
            body: JSON.stringify(body),
            headers,
        });
    },

    delete(endpoint, headers = {}) {
        return this.request(endpoint, { method: 'DELETE', headers });
    },

    getImageUrl(path) {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        // The base domain for media files on this server
        const baseUrl = 'https://bonane00.pythonanywhere.com';
        return `${baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;
    }
};

export default api;
