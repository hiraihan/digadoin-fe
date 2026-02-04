const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1"

interface FetchOptions extends RequestInit {
    headers?: Record<string, string>
    responseType?: 'json' | 'blob' | 'text'
}

export class ApiError extends Error {
    public status: number
    public data: any

    constructor(status: number, message: string, data?: any) {
        super(message)
        this.status = status
        this.data = data
    }
}

function getToken(): string | null {
    if (typeof window !== 'undefined') {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; token=`);
        let token = null;
        if (parts.length === 2) token = parts.pop()?.split(';').shift() || null;

        if (!token) {
            token = localStorage.getItem('token');
        }

        if (token === 'undefined' || token === 'null') return null;
        return token;
    }
    return null;
}

async function fetcher<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const token = getToken();

    const headers = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    }

    if (options.body instanceof FormData) {
        delete (headers as any)["Content-Type"];
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        cache: 'no-store',
        headers: {
            ...headers,
            'Pragma': 'no-cache',
            'Cache-Control': 'no-cache'
        },
    })

    if (response.status === 401) {
        console.warn("Unauthorized access")
        if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
            // Clear bad tokens
            document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
            localStorage.removeItem("token")
            localStorage.removeItem("userRole")
            window.location.href = '/login'
            return {} as T // Return empty to prevent downstream errors while redirecting
        }
    }

    // Handle 204 No Content
    if (response.status === 204) {
        return {} as T;
    }

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: response.statusText }));
        throw new ApiError(response.status, errorData.detail || errorData.message || "An error occurred", errorData)
    }

    if (options.responseType === 'blob') {
        return await response.blob() as unknown as T
    }
    if (options.responseType === 'text') {
        return await response.text() as unknown as T
    }

    return await response.json().catch(() => ({})) as T
}

export const api = {
    get: <T>(endpoint: string, options?: FetchOptions & { params?: Record<string, any> }) => {
        let url = endpoint;
        if (options?.params) {
            const query = new URLSearchParams(options.params as any).toString();
            url += `?${query}`;
        }
        return fetcher<T>(url, { ...options, method: "GET" })
    },
    post: <T>(endpoint: string, body: any, options?: FetchOptions & { params?: Record<string, any> }) => {
        let url = endpoint;
        if (options?.params) {
            const query = new URLSearchParams(options.params as any).toString();
            url += `?${query}`;
        }
        return fetcher<T>(url, { ...options, method: "POST", body: body ? JSON.stringify(body) : undefined }) // Allow empty body
    },
    put: <T>(endpoint: string, body: any, options?: FetchOptions) =>
        fetcher<T>(endpoint, { ...options, method: "PUT", body: JSON.stringify(body) }),
    patch: <T>(endpoint: string, body: any, options?: FetchOptions) =>
        fetcher<T>(endpoint, { ...options, method: "PATCH", body: JSON.stringify(body) }),
    delete: <T>(endpoint: string, options?: FetchOptions) => fetcher<T>(endpoint, { ...options, method: "DELETE" }),
}
