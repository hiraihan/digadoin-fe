import { api } from "./api"

export interface RevenueDataPoint {
    period: string
    revenue: number
    order_count: number
}

export interface MRRData {
    mrr: number
    active_subscriptions: number
}

export interface ActivityItem {
    id: number
    type: "new_project" | "new_client" | "payment" | "ticket"
    title: string
    description: string
    time: string
    created_at: string
}

export const analyticsService = {
    /**
     * Get revenue data grouped by period for charts
     * Uses existing backend endpoint: GET /api/v1/reports/revenue
     */
    getRevenueByPeriod: async (params?: {
        start_date?: string
        end_date?: string
        group_by?: "day" | "week" | "month" | "year"
    }): Promise<RevenueDataPoint[]> => {
        try {
            // Defensive coding: catch API errors here so they don't crash components
            const response = await api.get<any>("/reports/revenue", { params })
            if (Array.isArray(response)) return response
            if (response?.data && Array.isArray(response.data)) return response.data

            // If response is valid but structure is different, just return empty to trigger fallback
            return []
        } catch (error) {
            console.warn("Analytics API unavailable (using fallback logic):", error)
            return [] // Return empty array to allow UI to show mock/empty state
        }
    },

    /**
     * Get Monthly Recurring Revenue
     * Uses existing backend endpoint: GET /api/v1/reports/mrr
     */
    getMRR: async (): Promise<MRRData> => {
        try {
            const response = await api.get<MRRData>("/reports/mrr")
            return response
        } catch (error) {
            console.error("Failed to fetch MRR", error)
            return { mrr: 0, active_subscriptions: 0 }
        }
    },

    /**
     * Get recent activities for dashboard
     * Uses backend endpoint: GET /api/v1/reports/activities
     */
    getRecentActivities: async (limit: number = 10): Promise<ActivityItem[]> => {
        try {
            const response = await api.get<any>("/reports/activities", { params: { limit } })
            if (Array.isArray(response)) return response
            if (response?.items) return response.items
            return []
        } catch (error) {
            console.warn("Activities endpoint not available", error)
            return []
        }
    },

    /**
     * Get conversion rate metrics
     * Uses existing backend endpoint: GET /api/v1/reports/conversion-rate
     */
    getConversionRate: async (): Promise<{ rate: number; total_orders: number; paid_orders: number }> => {
        try {
            const response = await api.get<any>("/reports/conversion-rate")
            return response
        } catch (error) {
            console.error("Failed to fetch conversion rate", error)
            return { rate: 0, total_orders: 0, paid_orders: 0 }
        }
    }
}
