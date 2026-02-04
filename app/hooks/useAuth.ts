import { useState, useEffect } from "react"
import { authService } from "@/app/services/authService"
import { User } from "@/app/types/api"

export function useAuth() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await authService.getMe()
                setUser(userData)
            } catch (error) {
                console.error("Failed to fetch user:", error)
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        fetchUser()
    }, [])

    return {
        user,
        role: user?.role,
        loading,
        isAuthenticated: !!user
    }
}
