export interface User {
    id: number;
    name: string;
    full_name?: string; // Add optional if backend varies
    email: string;
    is_active: boolean;
    role: 'admin' | 'editor' | 'user';
    created_at?: string;
    // Profile Fields
    company?: string;
    phone?: string;
    website?: string;
    bio?: string;
}

export interface TokenResponse {
    access_token: string;
    token_type: string;
}

export interface WebsiteInstance {
    id: number;
    order_id?: number;
    user_id: number;
    name?: string;
    subdomain: string;
    custom_domain?: string | null;
    tier?: string;
    description?: string;
    stage: 'pending' | 'development' | 'review' | 'live';
    repo_url?: string;
    server_ip?: string;
    created_at: string;
    updated_at?: string;
}

export interface WebsiteInstanceCreate {
    order_id?: number;
    user_id: number;
    subdomain: string;
}

export interface Project extends WebsiteInstance {
    // Project alias for WebsiteInstance with additional UI mappings
    // These are mapped in projectService for UI compatibility
    domain?: string;   // Alias for custom_domain
    status?: string;   // Alias for stage
    createdAt?: string; // Alias for created_at
}

export interface Page {
    id: number;
    slug: string; // Key identifier
    title: string;
    content: string; // JSON string or HTML content
    is_published: boolean;
    created_at?: string;
    updated_at?: string;
}

// Transaction / Product Types
export interface PricingPlan {
    id: number;
    name: string;
    description?: string;
    price: number;
    duration_months: number;
    features?: string[];
    is_active: boolean;
}

export interface Template {
    id: number;
    name: string;
    description?: string;
    category?: string;
    preview_image?: string;
    price_adjustment?: number;
    is_active: boolean;
}

export interface Order {
    id: number;
    status: 'pending' | 'paid' | 'cancelled' | 'failed';
    amount: number;
    created_at: string;
    user_id: number;
    pricing_plan_id: number;
    template_id?: number;
    pricing_plan?: PricingPlan;
    template?: Template;
}
