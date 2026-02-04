import { projectService } from "./projectService"
import { transactionService } from "./transactionService"
import { authService } from "./authService"
import { api } from "./api"

// Types for Dashboard Stats
export interface ClientStats {
    totalProjects: number
    activeProjects: number
    pendingProjects: number
    completedProjects: number
    totalSpent: number
}

export interface AdminStats {
    revenue: number
    activeProjects: number
    totalClients: number
    serverLoad: number // Mock this as we don't have infrastructure data
}

export const dashboardService = {
    getClientStats: async (): Promise<ClientStats> => {
        try {
            const user = await authService.getMe()
            const [projects, orders] = await Promise.all([
                projectService.getMyProjects(),
                transactionService.getMyOrders(user.id)
            ])

            const totalSpent = orders
                .filter(o => o.status === 'paid')
                .reduce((sum, o) => sum + (o.total_price || 0), 0)

            return {
                totalProjects: projects.length,
                totalSpent,
                activeProjects: projects.filter(p => {
                    const stage = (p.stage || p.status || '').toLowerCase().trim()
                    return stage === 'development' || stage === 'active' || stage === 'review'
                }).length,
                pendingProjects: projects.filter(p => {
                    const stage = (p.stage || p.status || '').toLowerCase().trim()
                    return stage === 'pending' || stage === 'provisioning'
                }).length,
                completedProjects: projects.filter(p => {
                    const stage = (p.stage || '').toLowerCase()
                    return stage === 'live' || stage === 'completed'
                }).length
            }
        } catch (error) {
            console.error("Failed to fetch client stats", error)
            return { totalProjects: 0, activeProjects: 0, pendingProjects: 0, completedProjects: 0, totalSpent: 0 }
        }
    },

    getAdminStats: async (): Promise<AdminStats> => {
        try {
            // Parallel fetch for aggregation
            // 1. Projects
            const projectsPromise = projectService.getAllProjects();
            // 2. Orders (for revenue)
            const ordersPromise = api.get<any>("/orders/admin/all", { params: { limit: 1000 } }).catch(() => ({ items: [] }));
            // 3. Users (for total clients) - Use the new endpoint via userService logic or direct API
            const usersPromise = api.get<any>("/auth/users", { params: { limit: 1000 } }).catch(() => []);

            const [projects, ordersResponse, usersResponse] = await Promise.all([
                projectsPromise,
                ordersPromise,
                usersPromise
            ])

            const orderList = ordersResponse?.items || []
            const usersList = Array.isArray(usersResponse) ? usersResponse : (usersResponse?.items || [])

            // Use total_price (what backend returns) instead of amount
            const revenue = orderList
                .filter((o: any) => o.status === 'paid')
                .reduce((acc: number, curr: any) => acc + (curr.total_price || curr.amount || 0), 0)

            const activeProjects = projects.filter(p => {
                const stage = (p.stage || '').toLowerCase()
                return stage === 'development' || stage === 'active' || stage === 'live'
            }).length

            return {
                revenue,
                activeProjects,
                totalClients: usersList.length > 0 ? usersList.length : 0,
                serverLoad: Math.floor(Math.random() * 30) + 20
            }
        } catch (error) {
            console.error("Failed to fetch admin stats", error)
            return { revenue: 0, activeProjects: 0, totalClients: 0, serverLoad: 0 }
        }
    }
}

