export interface PricingPlan {
    id: number
    name: string
    category?: string  // e.g., company_profile, ecommerce, lms, saas
    description?: string
    price: number
    duration_months: number
    is_active: boolean
    features: string[] | string // API might return stringified JSON or array
    created_at: string
    updated_at: string
}

export interface PricingPlanCreate {
    name: string
    description?: string
    price: number
    duration_months: number
    features?: string[]
}

export interface PricingPlanUpdate {
    name?: string
    description?: string
    price?: number
    duration_months?: number
    is_active?: boolean
    features?: string[]
}

export interface Template {
    id: number
    name: string
    description?: string
    thumbnail_url?: string
    preview_url?: string
    repo_url?: string
    is_active: boolean
    category?: string
    created_at: string
    updated_at: string
}

export interface TemplateCreate {
    name: string
    description?: string
    thumbnail_url?: string
    preview_url?: string
    repo_url?: string
    category?: string
}

export interface TemplateUpdate {
    name?: string
    description?: string
    thumbnail_url?: string
    preview_url?: string
    repo_url?: string
    is_active?: boolean
    category?: string
}
