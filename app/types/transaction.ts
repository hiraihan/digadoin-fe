import { PricingPlan, Template } from "./product"

export interface Order {
    id: number
    user_id: number
    pricing_plan_id: number
    template_id?: number
    amount: number
    total_price?: number  // Backend returns this instead of amount
    status: 'pending' | 'paid' | 'cancelled' | 'failed'
    created_at: string
    updated_at: string

    // Relations (might be included in response)
    pricing_plan?: PricingPlan
    template?: Template
}

export interface CreateOrderDTO {
    pricing_plan_id: number
    template_id?: number
    // Project Details
    project_name?: string
    subdomain?: string
    description?: string
    tier?: string
}

export interface PaymentStatus {
    status: string // e.g. "pending", "settlement", "expire"
    order_id: string
    transaction_id: string
    payment_type: string
}

export interface Invoice {
    id: string // or number
    url: string // PDF download URL
    order_id: number
    amount: number
    status: string
    created_at: string
}
