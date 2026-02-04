import { api } from "./api"
import { Project, WebsiteInstance } from "@/app/types/api"

export const projectService = {
    // For Admin: Get All Projects
    getAllProjects: async (params?: { skip?: number, limit?: number }): Promise<Project[]> => {
        try {
            // Attempting to fetch all projects. Endpoint guess based on structure.
            // Adjust path if spec defines differently for admin listing.
            const response = await api.get<any>("/delivery/projects", { params })
            if (Array.isArray(response)) {
                return response.map(mapInstanceToProject);
            } else if (Array.isArray(response?.items)) {
                return response.items.map(mapInstanceToProject);
            }
        } catch (e) {
            console.warn("Failed to fetch all projects (admin), falling back to empty or my-projects", e)
        }
        return [];
    },

    getMyProjects: async (): Promise<Project[]> => {
        // The API returns { items: [...] } or directly generic response structure based on Swagger
        // Looking at spec, it returns WebsiteInstanceResponse[] wrapped in array
        const response = await api.get<any>("/delivery/my-projects")

        // Check if response is array or wrapped
        if (Array.isArray(response)) {
            return response.map(mapInstanceToProject);
        } else if (Array.isArray(response?.items)) {
            return response.items.map(mapInstanceToProject);
        }
        return [];
    },

    getProject: async (id: number): Promise<Project> => {
        try {
            // Try fetching directly by ID (Admin/Owner access)
            const response = await api.get<any>(`/delivery/projects/${id}`);
            return mapInstanceToProject(response);
        } catch (e) {
            // Fallback for some roles or if endpoint limited (though ideally API should handle permission)
            // But if 404/403, try looking in my-projects as backup if it was a caching/list issue
            try {
                const projects = await projectService.getMyProjects();
                const project = projects.find(p => p.id === id);
                if (project) return project;
            } catch (inner) { /* ignore */ }

            throw e; // Throw original error if not found in list either
        }
    },

    updateDomain: async (id: number, domain: string): Promise<void> => {
        await api.put(`/delivery/projects/${id}/domain`, { custom_domain: domain });
    },

    create: async (data: { name?: string; subdomain?: string; tier?: string; description?: string }): Promise<void> => {
        // API endpoint: POST /delivery/projects
        // Backend expects: { subdomain, name, tier, description }
        // Map name to subdomain if subdomain not provided
        const subdomain = data.subdomain || (data.name ? data.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') : `project-${Date.now()}`)
        await api.post("/delivery/projects", {
            subdomain,
            name: data.name || subdomain,
            tier: data.tier || 'Basic',
            description: data.description || ''
        })
    },

    update: async (id: number, data: any): Promise<void> => {
        if (data.domain) {
            await projectService.updateDomain(id, data.domain);
        }
        if (data.status) {
            await api.put(`/delivery/projects/${id}/stage`, { stage: data.status });
        }
    },

    delete: async (id: number): Promise<void> => {
        // No delete endpoint for client in spec.
        console.warn("Delete project not supported for client.");
    }
}

function mapInstanceToProject(instance: WebsiteInstance): Project {
    return {
        ...instance,
        name: instance.name || instance.subdomain, // Use name if available, fallback to subdomain
        domain: instance.custom_domain || `${instance.subdomain}.digado.in`, // Map domain with fallback
        status: instance.stage, // Map stage to status
        createdAt: instance.created_at // Map created_at
    }
}
