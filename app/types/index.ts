export * from './api'
export interface ApiResponse<T> {
    data: T
    message?: string
}

export interface PaginatedResponse<T> {
    data: T[]
    total: number
    page: number
    limit: number
    totalPages: number
}

export enum ProjectStatus {
    PENDING = "pending",
    DEVELOPMENT = "development",
    REVIEW = "review",
    LIVE = "live",
    SUSPENDED = "suspended",
    CANCELLED = "cancelled",
}

export interface Project {
    id: string
    clientId: string
    name: string
    status: ProjectStatus
    domain?: string
    tier?: string
    description?: string
    createdAt: string
    updatedAt?: string
}

export interface CreateProjectDTO {
    name: string
    tier: string
    domain?: string
    description?: string
    clientId?: string // required for Admin, ignored for Client if auto-filled by backend, but let's keep it optional
}

export interface UpdateProjectDTO {
    status?: ProjectStatus
    domain?: string
    tier?: string
    description?: string
    name?: string
}

export interface ProjectStats {
    totalProjects: number
    activeProjects: number
    completedProjects: number
    revenue?: number
}
