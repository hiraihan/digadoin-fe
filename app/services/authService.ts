import { api } from "./api"
import { User, TokenResponse } from "@/app/types/api"

interface MessageResponse {
    message: string
}

export const authService = {
    login: async (credentials: any): Promise<TokenResponse> => {
        const data = await api.post<TokenResponse>("/auth/login", credentials)
        if (typeof document !== 'undefined') {
            document.cookie = `token=${data.access_token}; path=/; max-age=86400; SameSite=Lax`
        }
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem("token", data.access_token)
        }
        return data
    },

    register: async (userData: any): Promise<MessageResponse> => {
        return api.post<MessageResponse>("/auth/register", userData)
    },

    getMe: async (options: any = {}): Promise<User> => {
        return api.get<User>("/auth/me", options)
    },

    updateProfile: async (data: any): Promise<User> => {
        return api.put<User>("/auth/me", data)
    },

    logout: async () => {
        if (typeof document !== 'undefined') {
            document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
        }
        if (typeof localStorage !== 'undefined') {
            localStorage.removeItem("token")
        }
        window.location.href = '/login'
    },

    // Password Reset
    forgotPassword: async (email: string): Promise<MessageResponse> => {
        return api.post<MessageResponse>("/auth/forgot-password", { email })
    },

    resetPassword: async (token: string, newPassword: string): Promise<MessageResponse> => {
        return api.post<MessageResponse>("/auth/reset-password", {
            token,
            new_password: newPassword
        })
    },

    // Email Verification
    verifyEmail: async (token: string): Promise<MessageResponse> => {
        return api.post<MessageResponse>("/auth/verify-email", { token })
    },

    resendVerification: async (email: string): Promise<MessageResponse> => {
        return api.post<MessageResponse>("/auth/resend-verification", { email })
    }
}

