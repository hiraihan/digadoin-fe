import { Project } from "@/app/types"
import { ProjectCard } from "./ProjectCard"
import { FolderOpen } from "lucide-react"

// ...

interface ProjectListProps {
    projects: Project[]
    onEdit: (project: Project) => void
    onDelete: (project: Project) => void
    isAdmin?: boolean
    onStageChange?: (projectId: string, newStage: string) => void
}

export function ProjectList({ projects, onEdit, onDelete, isAdmin = false, onStageChange }: ProjectListProps) {
    if (projects.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center border border-dashed border-white/10 rounded-3xl bg-white/5 mx-auto w-full">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                    <FolderOpen className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-white mb-1">No projects found</h3>
                <p className="text-muted-foreground text-sm max-w-sm">
                    {isAdmin
                        ? "There are no projects in the system matching your criteria."
                        : "You haven't ordered any website projects yet."}
                </p>
            </div>
        )
    }

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {projects.map((project) => (
                <ProjectCard
                    key={project.id}
                    project={project}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    isAdmin={isAdmin}
                    onStageChange={onStageChange}
                />
            ))}
        </div>
    )
}
