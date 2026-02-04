import { api } from "./api"
import { User, TokenResponse } from "@/app/types/api"

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

    register: async (userData: any): Promise<User> => {
        return api.post<User>("/auth/register", userData)
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
    }
}
