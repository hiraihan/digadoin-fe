import { LucideIcon, Inbox } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
    icon?: LucideIcon
    title: string
    description?: string
    actionLabel?: string
    onAction?: () => void
    className?: string
}

export function EmptyState({
    icon: Icon = Inbox,
    title,
    description,
    actionLabel,
    onAction,
    className,
}: EmptyStateProps) {
    return (
        <div className={cn("flex flex-col items-center justify-center p-12 text-center", className)}>
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                <Icon className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            {description && (
                <p className="text-muted-foreground text-sm max-w-md mb-6">{description}</p>
            )}
            {actionLabel && onAction && (
                <Button
                    onClick={onAction}
                    className="bg-white text-black hover:bg-gray-200 rounded-xl h-12 px-6 font-bold"
                >
                    {actionLabel}
                </Button>
            )}
        </div>
    )
}

// Pre-built variants for common use cases
export function EmptyProjects({ onAction }: { onAction?: () => void }) {
    return (
        <EmptyState
            title="No Projects Yet"
            description="You haven't created any projects. Get started by creating your first project."
            actionLabel="Create Project"
            onAction={onAction}
        />
    )
}

export function EmptyClients({ onAction }: { onAction?: () => void }) {
    return (
        <EmptyState
            title="No Clients Found"
            description="Your client directory is empty. Add your first client to get started."
            actionLabel="Add Client"
            onAction={onAction}
        />
    )
}

export function EmptyNotifications() {
    return (
        <EmptyState
            title="All Caught Up!"
            description="You have no new notifications at the moment."
        />
    )
}

export function EmptySearch({ query }: { query?: string }) {
    return (
        <EmptyState
            title="No Results Found"
            description={query
                ? `We couldn't find anything matching "${query}". Try different keywords.`
                : "Try adjusting your search or filter criteria."}
        />
    )
}
