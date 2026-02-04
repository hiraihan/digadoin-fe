import { api } from "./api"

export interface CreateOrderResponse {
    order_id: number
    payment_url?: string
    status: string
    total_price?: number
}

export interface Order {
    id: number
    user_id: number
    subscription_plan_id: number
    total_price: number
    status: string
    created_at: string
    paid_at?: string
}

export interface OrderPaymentDetails {
    id: number
    status: string
    total_price: number
    created_at: string
    plan_name: string
    plan_category?: string
    plan_description?: string
    duration_months: number
}

export interface SimulatePaymentResponse {
    success: boolean
    message: string
    order_id: number
    status: string
    transaction_id?: string
}

import { authService } from "./authService"
import { transactionService } from "./transactionService"

export const orderService = {
    /**
     * Create a new order for a pricing plan
     * This will initialize payment via Midtrans
     */
    createOrder: async (pricingPlanId: number, templateId?: number, projectDetails?: { name: string, subdomain: string, description: string }): Promise<CreateOrderResponse> => {
        try {
            // We rely on the stored token for authentication, no need to call getMe()
            // The backend handles user identification via the token

            const payload: any = {
                pricing_plan_id: pricingPlanId,
                template_id: templateId || null
            }

            if (projectDetails) {
                payload.project_name = projectDetails.name
                payload.subdomain = projectDetails.subdomain
                payload.description = projectDetails.description
            }

            const response = await transactionService.createOrder(payload)
            return {
                order_id: response.order_id,
                status: response.status,
                total_price: response.total_price,
                payment_url: response.payment_url
            }
        } catch (error: any) {
            console.error("Create order error:", error)
            throw error
        }
    },

    /**
     * Get order details by ID
     */
    getOrder: async (orderId: number): Promise<Order> => {
        return await api.get<Order>(`/orders/${orderId}`)
    },

    /**
     * Get current user's orders
     */
    /**
     * Get current user's orders
     */
    getMyOrders: async (): Promise<Order[]> => {
        const response = await api.get<any>("/orders/my-orders")
        if (Array.isArray(response)) return response
        if (response?.items) return response.items
        return []
    },

    /**
     * Get orders for a specific user
     */
    getUserOrders: async (userId: number): Promise<Order[]> => {
        const response = await api.get<any>("/orders", { params: { user_id: userId } })
        if (Array.isArray(response)) return response
        if (response?.items) return response.items
        return []
    },

    /**
     * Check payment status of an order
     */
    checkPaymentStatus: async (orderId: number): Promise<{ status: string; paid_at?: string }> => {
        return await api.get<{ status: string; paid_at?: string }>(`/orders/${orderId}/status`)
    },

    /**
     * Get order details for payment page
     */
    getOrderForPayment: async (orderId: number): Promise<OrderPaymentDetails> => {
        return await api.get<OrderPaymentDetails>(`/payments/order-details/${orderId}`)
    },

    /**
     * Simulate payment (for demo/development)
     */
    simulatePayment: async (orderId: number, action: 'pay' | 'cancel', paymentMethod: string = 'bank_transfer'): Promise<SimulatePaymentResponse> => {
        return await api.post<SimulatePaymentResponse>(`/payments/simulate/${orderId}`, {
            action,
            payment_method: paymentMethod
        })
    }
}
