"use client"

import { useState, useEffect } from "react"
import { useProjects } from "@/app/hooks/useProjects"
import { ProjectStats } from "@/app/components/dashboard/projects/ProjectStats"
import { ProjectFilters } from "@/app/components/dashboard/projects/ProjectFilters"
import { ProjectList } from "@/app/components/dashboard/projects/ProjectList"
import { ProjectDialog } from "@/app/components/dashboard/projects/ProjectDialog"
import { DeleteConfirmModal } from "@/components/ui/confirm-modal"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { toast } from "sonner"
import { Project, CreateProjectDTO, UpdateProjectDTO } from "@/app/types"

export default function ProjectsPage() {
  const {
    projects,
    loading,
    error,
    createProject,
    updateProject,
    deleteProject
  } = useProjects()

  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("ALL")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  // Dialog States
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  // Delete Modal State
  // Delete Modal State
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null)

  // Custom Role-based Data Fetching override
  // (We override the hook's default behavior slightly or assumption is hook handles it, but hook is client-centric)
  // Let's rely on checking auth role here or update the hook. Use logic here for simplicity.
  const [role, setRole] = useState("user")
  const [isAdminProjects, setIsAdminProjects] = useState<Project[]>([])

  useEffect(() => {
    // Check role and fetch admin data if needed
    import("@/app/services/authService").then(async (m) => {
      try {
        const user = await m.authService.getMe()
        setRole(user.role)
        if (user.role === 'admin' || user.role === 'editor') {
          import("@/app/services/projectService").then(async (ps) => {
            const allProjects = await ps.projectService.getAllProjects()
            // Map API Project to UI Project type
            const mappedProjects = allProjects.map((p: any) => ({
              id: String(p.id),
              clientId: String(p.user_id || '0'),
              name: p.name || p.subdomain || 'Untitled',
              status: p.stage?.toLowerCase() || 'pending',  // Keep lowercase to match enum
              domain: p.custom_domain || undefined,
              tier: 'Standard', // Default
              description: '',
              createdAt: p.created_at || new Date().toISOString()
            })) as Project[]
            setIsAdminProjects(mappedProjects)
          })
        }
      } catch (e) { }
    })
  }, [])

  // Use admin projects if admin, otherwise use hook's projects
  const displayProjects = (role === 'admin' || role === 'editor') && isAdminProjects.length > 0 ? isAdminProjects : projects
  const isClient = role === 'user' || role === 'client'

  // Computed Projects: Filtered -> Sorted -> Paginated
  const filteredProjects = displayProjects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(search.toLowerCase()) ||
      (project.description || "").toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "ALL" || project.status === statusFilter
    return matchesSearch && matchesStatus
  }).sort((a, b) => {
    // Sort Newest to Oldest (Desc)
    const dateA = new Date(a.createdAt || 0).getTime()
    const dateB = new Date(b.createdAt || 0).getTime()
    return dateB - dateA
  })

  // Pagination Logic
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage)
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1)
  }, [search, statusFilter])

  // Handlers - Admin only: Edit existing projects
  const handleEdit = (project: Project) => {
    if (role === 'admin' || role === 'editor') {
      setEditingProject(project)
      setIsDialogOpen(true)
    }
  }

  const handleDeleteClick = (project: Project) => {
    if (role === 'admin') {
      setProjectToDelete(project)
    }
  }

  const handleSubmit = async (data: UpdateProjectDTO) => {
    if (editingProject) {
      const result = await updateProject(editingProject.id, data)
      if (result.success) {
        toast.success("Project updated successfully")
      } else {
        toast.error(result.error || "Failed to update project")
      }
    }
  }

  const confirmDelete = async () => {
    if (projectToDelete) {
      const result = await deleteProject(projectToDelete.id)
      if (result.success) {
        toast.success("Project deleted")
      } else {
        toast.error(result.error || "Failed to delete project")
      }
      setProjectToDelete(null)
    }
  }

  return (
    <div className="flex flex-col space-y-8 p-8 max-w-[1600px] mx-auto animate-in fade-in duration-500">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Projects</h1>
          <p className="text-muted-foreground mt-1">
            {isClient ? "Your website projects from orders." : "Manage all client projects."}
          </p>
        </div>
        {/* Client: Order button, Admin: No create (projects come from orders) */}
        {isClient && (
          <a href="/dashboard/order" className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/20 h-10 px-4 py-2 rounded-md font-medium">
            <Plus className="w-4 h-4 mr-2" />
            Order New Website
          </a>
        )}
      </div>

      {/* Stats */}
      <ProjectStats projects={displayProjects} />

      {/* Filters & Content */}
      <div className="space-y-6">
        <ProjectFilters
          search={search}
          status={statusFilter}
          onSearchChange={setSearch}
          onStatusChange={setStatusFilter}
        />

        {loading ? (
          // Simple Loading State (Skeleton component could be used here)
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-[200px] rounded-xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-red-500">
            Error loading projects: {error}
          </div>
        ) : (
          <>
            <ProjectList
              projects={paginatedProjects}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
              isAdmin={role === 'admin' || role === 'editor'}
            />

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-8">
                <div className="text-sm text-muted-foreground">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredProjects.length)} of {filteredProjects.length} projects
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="h-8 w-24"
                  >
                    Previous
                  </Button>
                  <div className="flex items-center gap-1 mx-2">
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${currentPage === i + 1
                          ? "bg-primary text-white"
                          : "text-muted-foreground hover:bg-white/5 hover:text-white"
                          }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="h-8 w-24"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modals */}
      <ProjectDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleSubmit}
        project={editingProject}
      />

      <DeleteConfirmModal
        isOpen={!!projectToDelete}
        onClose={() => setProjectToDelete(null)}
        onConfirm={confirmDelete}
        itemName={projectToDelete?.name}
      />
    </div>
  )
}