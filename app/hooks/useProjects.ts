import { useState, useEffect, useCallback } from "react"
import { projectService } from "@/app/services/projectService"
import { Project as ApiProject } from "@/app/types/api"
import { Project, CreateProjectDTO, UpdateProjectDTO, ProjectStatus } from "@/app/types"

export function useProjects() {
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const mapApiToUi = (apiProj: ApiProject): Project => {
        return {
            id: apiProj.id.toString(),
            clientId: apiProj.user_id.toString(),
            name: apiProj.name || apiProj.subdomain || "Untitled Project",
            status: mapStatus(apiProj.stage),
            domain: apiProj.custom_domain || `${apiProj.subdomain}.digado.in`,
            tier: "Standard", // Placeholder
            description: apiProj.description || "Website Instance",
            createdAt: apiProj.created_at
        }
    }

    const mapStatus = (stage: string): ProjectStatus => {
        const s = (stage || '').toLowerCase();
        switch (s) {
            case 'pending': return ProjectStatus.PENDING;
            case 'development': return ProjectStatus.DEVELOPMENT;
            case 'review': return ProjectStatus.REVIEW;
            case 'live':
            case 'completed':
                return ProjectStatus.LIVE;
            case 'suspended': return ProjectStatus.SUSPENDED;
            case 'cancelled': return ProjectStatus.CANCELLED;
            default: return ProjectStatus.DEVELOPMENT;
        }
    }

    const fetchProjects = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const data = await projectService.getMyProjects()
            // data is ApiProject[]
            if (Array.isArray(data)) {
                setProjects(data.map(mapApiToUi))
            } else {
                setProjects([])
            }
        } catch (err: any) {
            setError(err.message || "Failed to fetch projects")
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchProjects()
    }, [fetchProjects])

    const createProject = async (data: CreateProjectDTO) => {
        try {
            await projectService.create(data)
            await fetchProjects() // Refresh list
            return { success: true }
        } catch (err: any) {
            return { success: false, error: err.message }
        }
    }

    const updateProject = async (id: string, data: UpdateProjectDTO) => {
        try {
            await projectService.update(parseInt(id), data)
            await fetchProjects()
            return { success: true }
        } catch (err: any) {
            return { success: false, error: err.message }
        }
    }

    const deleteProject = async (id: string) => {
        try {
            await projectService.delete(parseInt(id))
            setProjects((prev) => prev.filter((p) => p.id !== id)) // Optimistic update
            return { success: true }
        } catch (err: any) {
            await fetchProjects() // Revert on failure
            return { success: false, error: err.message }
        }
    }

    return {
        projects,
        loading,
        error,
        fetchProjects,
        createProject,
        updateProject,
        deleteProject,
    }
}
