import { api } from "./api"
import { Order, CreateOrderDTO, PaymentStatus, Invoice } from "@/app/types/transaction"

export const transactionService = {
    // --- Orders ---
    createOrder: async (data: CreateOrderDTO): Promise<{ order_id: number, status: string, total_price: number, payment_url?: string }> => {
        return await api.post<{ order_id: number, status: string, total_price: number, payment_url?: string }>("/orders/create", data)
    },

    getMyOrders: async (userId: number, params?: { skip?: number, limit?: number }): Promise<Order[]> => {
        // Spec says /api/v1/orders and takes user_id query param
        const response = await api.get<any>("/orders", { params: { user_id: userId, ...params } })
        if (Array.isArray(response)) return response
        if (response?.items && Array.isArray(response.items)) return response.items
        return []
    },

    getOrder: async (id: number): Promise<Order> => {
        return await api.get<Order>(`/orders/${id}`)
    },

    cancelOrder: async (id: number): Promise<void> => {
        await api.put(`/orders/${id}/cancel`, {})
    },

    // --- Payments ---
    createPayment: async (orderId: number): Promise<{ payment_url: string }> => {
        // Spec: POST /api/v1/payments/create?order_id=...
        return await api.post<{ payment_url: string }>(`/payments/create`, null, { params: { order_id: orderId } })
    },

    getPaymentStatus: async (orderId: number): Promise<PaymentStatus> => {
        return await api.get<PaymentStatus>(`/payments/by-order/${orderId}`)
    },

    // --- Invoices ---
    getInvoice: async (orderId: number): Promise<Invoice | { url: string }> => {
        return await api.get<any>(`/invoices/${orderId}`)
    },

    downloadInvoice: async (orderId: number): Promise<Blob> => {
        // Force responseType blob for file download
        return await api.get<any>(`/invoices/${orderId}`, { responseType: 'blob' } as any)
    },

    generateInvoice: async (orderId: number): Promise<void> => {
        await api.post(`/invoices/generate/${orderId}`, {})
    }
}
