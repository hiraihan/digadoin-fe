import { api } from "./api"

export interface AdminOrder {
    id: number
    user_id: number
    user_name: string
    user_email: string
    status: string
    total_price: number
    plan_name: string
    plan_category?: string
    created_at: string
    paid_at?: string
    project_id?: number
    project_stage?: string
}

export interface AdminOrdersResponse {
    total: number
    pending_count: number
    paid_count: number
    cancelled_count: number
    items: AdminOrder[]
}

export interface AdminProject {
    id: number
    order_id?: number
    user_id: number
    name?: string
    subdomain: string
    custom_domain?: string
    tier?: string
    description?: string
    stage: string // pending, development, review, live
    created_at: string
}

export const adminOrderService = {
    /**
     * Get all orders for admin (requires admin role)
     */
    getAllOrders: async (params?: { skip?: number; limit?: number; status?: string }): Promise<AdminOrdersResponse> => {
        const queryParams = new URLSearchParams()
        if (params?.skip) queryParams.append('skip', String(params.skip))
        if (params?.limit) queryParams.append('limit', String(params.limit))
        if (params?.status) queryParams.append('status', params.status)

        const queryString = queryParams.toString()
        const url = `/orders/admin/all${queryString ? `?${queryString}` : ''}`

        return await api.get<AdminOrdersResponse>(url)
    },

    /**
     * Get all projects for admin
     */
    getAllProjects: async (params?: { skip?: number; limit?: number; stage?: string }): Promise<AdminProject[]> => {
        const queryParams = new URLSearchParams()
        if (params?.skip) queryParams.append('skip', String(params.skip))
        if (params?.limit) queryParams.append('limit', String(params.limit))
        if (params?.stage) queryParams.append('stage', params.stage)

        const queryString = queryParams.toString()
        const url = `/delivery/projects${queryString ? `?${queryString}` : ''}`

        return await api.get<AdminProject[]>(url)
    },

    /**
     * Update project stage (admin only)
     * Stages: pending -> development -> review -> live
     */
    updateProjectStage: async (projectId: number, stage: string): Promise<{ status: string; message: string }> => {
        return await api.put(`/delivery/projects/${projectId}/stage`, { stage })
    }
}

