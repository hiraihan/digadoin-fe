import { api } from "./api"
import { PricingPlan, PricingPlanCreate, PricingPlanUpdate, Template, TemplateCreate, TemplateUpdate } from "@/app/types/product"

export const productService = {
    // --- Pricing Plans ---
    getPricingPlans: async (params?: { skip?: number, limit?: number, active_only?: boolean }): Promise<PricingPlan[]> => {
        // API returns { items: PricingPlan[] } usually in standard layout or plain array
        // Based on other services, let's assume direct array or wrapper.
        // Spec check: standard paginated response usually.
        const response = await api.get<any>("/products/pricing-plans", { params })
        if (Array.isArray(response)) return response
        if (response?.items && Array.isArray(response.items)) return response.items
        return []
    },

    getPricingPlan: async (id: number): Promise<PricingPlan> => {
        return await api.get<PricingPlan>(`/products/pricing-plans/${id}`)
    },

    createPricingPlan: async (data: PricingPlanCreate): Promise<PricingPlan> => {
        return await api.post<PricingPlan>("/products/pricing-plans", data)
    },

    updatePricingPlan: async (id: number, data: PricingPlanUpdate): Promise<PricingPlan> => {
        return await api.put<PricingPlan>(`/products/pricing-plans/${id}`, data)
    },

    deletePricingPlan: async (id: number): Promise<void> => {
        return await api.delete(`/products/pricing-plans/${id}`)
    },

    // --- Templates ---
    getTemplates: async (params?: { skip?: number, limit?: number, active_only?: boolean }): Promise<Template[]> => {
        const response = await api.get<any>("/products/templates", { params })
        if (Array.isArray(response)) return response
        if (response?.items && Array.isArray(response.items)) return response.items
        return []
    },

    getTemplate: async (id: number): Promise<Template> => {
        return await api.get<Template>(`/products/templates/${id}`)
    },

    createTemplate: async (data: TemplateCreate): Promise<Template> => {
        return await api.post<Template>("/products/templates", data)
    },

    updateTemplate: async (id: number, data: TemplateUpdate): Promise<Template> => {
        return await api.put<Template>(`/products/templates/${id}`, data)
    },

    deleteTemplate: async (id: number): Promise<void> => {
        return await api.delete(`/products/templates/${id}`)
    }
}
