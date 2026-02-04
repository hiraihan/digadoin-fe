import { api } from "./api"

export interface Ticket {
    id: number
    user_id: number
    subject: string
    status: "open" | "answered" | "closed"
    priority: string
    request_type?: string
    project_id?: number
    created_at?: string
    createdAt?: string // Fallback
    messages: TicketMessage[]
}

export interface TicketMessage {
    sender_id: number
    message: string
    created_at: string
}

export interface CreateTicketDTO {
    subject: string
    message: string
    priority?: "low" | "medium" | "high"
    request_type?: string
    project_id?: number
}

export interface ReplyTicketDTO {
    message: string
}

export const ticketService = {
    /**
     * Create a new support ticket
     * POST /api/v1/delivery/tickets
     */
    createTicket: async (data: CreateTicketDTO): Promise<Ticket> => {
        return await api.post<Ticket>("/delivery/tickets", data)
    },

    /**
     * Get all tickets for current user
     * GET /api/v1/delivery/tickets
     */
    getMyTickets: async (): Promise<Ticket[]> => {
        const response = await api.get<any>("/delivery/tickets")
        if (Array.isArray(response)) return response
        if (response?.items) return response.items
        return []
    },

    /**
     * Get ticket detail with all messages
     * GET /api/v1/delivery/tickets/{id}
     */
    getTicket: async (id: number): Promise<Ticket> => {
        return await api.get<Ticket>(`/delivery/tickets/${id}`)
    },

    /**
     * Reply to an existing ticket
     * POST /api/v1/delivery/tickets/{id}/reply
     */
    replyToTicket: async (id: number, data: ReplyTicketDTO): Promise<TicketMessage> => {
        return await api.post<TicketMessage>(`/delivery/tickets/${id}/reply`, data)
    },

    /**
     * Get all tickets (Admin only)
     * GET /api/v1/delivery/tickets/all
     */
    getAllTickets: async (params?: { skip?: number; limit?: number; status?: string }): Promise<Ticket[]> => {
        return await api.get<Ticket[]>("/delivery/tickets/all", { params })
    }
}
