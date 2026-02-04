import { api } from "./api"
import { User } from "@/app/types/api"

export const userService = {
    getAllUsers: async (params?: { skip?: number, limit?: number, search?: string }): Promise<User[]> => {
        // Use /auth/users endpoint (admin only)
        try {
            const response = await api.get<any>("/auth/users", { params })
            if (Array.isArray(response)) return response
            if (response?.items) return response.items
            return []
        } catch (error: any) {
            console.warn("Fetch users failed:", error?.message || error)
            // Return empty array on error - no more mock data
            return []
        }
    },

    // Optional: Get user details with more info
    getUserById: async (id: number): Promise<User> => {
        return api.get<User>(`/auth/users/${id}`)
    },

    createUser: async (data: any): Promise<User> => {
        return api.post<User>("/auth/users", data)
    },

    updateUser: async (id: number, data: Partial<User>): Promise<User> => {
        return api.put<User>(`/auth/users/${id}`, data)
    },

    deleteUser: async (id: number): Promise<void> => {
        return api.delete(`/auth/users/${id}`)
    }
}
