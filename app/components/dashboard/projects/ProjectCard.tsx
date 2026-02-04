import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Project } from "@/app/types"
import { Edit, Trash2, Globe, Clock, Eye, Code, Rocket, ExternalLink, Loader2, LayoutDashboard, Activity, HardDrive, XCircle } from "lucide-react"
import { format } from "date-fns"
import Link from "next/link"
import { useState } from "react"
import { adminOrderService } from "@/app/services/adminOrderService"
import { toast } from "sonner"

interface ProjectCardProps {
    project: Project
    onEdit: (project: Project) => void
    onDelete: (project: Project) => void
    isAdmin?: boolean
    onStageChange?: (projectId: string, newStage: string) => void
}

const STAGES = ['pending', 'development', 'review', 'live', 'cancelled'] as const

// Map API stage to display config
function getStageConfig(status: string) {
    const normalizedStatus = status?.toLowerCase() || 'pending'

    const stageConfigs: Record<string, { label: string; className: string; icon: any; pulse?: boolean }> = {
        pending: {
            label: "Waiting",
            className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/30",
            icon: Clock
        },
        development: {
            label: "In Development",
            className: "bg-blue-500/10 text-blue-500 border-blue-500/30",
            icon: Code
        },
        review: {
            label: "Review",
            className: "bg-purple-500/10 text-purple-500 border-purple-500/30",
            icon: Eye
        },
        live: {
            label: "Live",
            className: "bg-green-500/10 text-green-500 border-green-500/30",
            icon: Rocket,
            pulse: true
        },
        // Legacy status mapping
        in_progress: {
            label: "Dev",
            className: "bg-blue-500/10 text-blue-500 border-blue-500/30",
            icon: Code
        },
        completed: {
            label: "Live",
            className: "bg-green-500/10 text-green-500 border-green-500/30",
            icon: Rocket,
            pulse: true
        },
        cancelled: {
            label: "Cancelled",
            className: "bg-red-500/10 text-red-500 border-red-500/30",
            icon: XCircle
        }
    }

    return stageConfigs[normalizedStatus] || stageConfigs.pending
}

export function ProjectCard({ project, onEdit, onDelete, isAdmin = false, onStageChange }: ProjectCardProps) {
    const [currentStage, setCurrentStage] = useState(project.status?.toLowerCase() || 'pending')
    const [updating, setUpdating] = useState(false)

    const stageConfig = getStageConfig(currentStage)
    const StageIcon = stageConfig.icon

    const handleStageChange = async (newStage: string) => {
        if (newStage === currentStage) return

        setUpdating(true)
        try {
            await adminOrderService.updateProjectStage(Number(project.id), newStage)
            setCurrentStage(newStage)
            toast.success(`Stage updated to ${newStage}`)
            if (onStageChange) {
                onStageChange(project.id, newStage)
            }
        } catch (error) {
            toast.error("Failed to update stage")
        } finally {
            setUpdating(false)
        }
    }

    const handleImpersonate = () => {
        toast.info(`Accessing dashboard as ${project.name}...`)
        // Logic for auth impersonation would go here
    }

    // Mock Usage Data for "Command Center" feel
    // Deterministic random based on project ID length or name
    const mockDiskUsage = (project.id.length * 7) % 100
    const mockBandwidth = (project.name.length * 9) % 100

    return (
        <Card className="flex flex-col h-full bg-[#111111] border-white/10 hover:border-white/20 transition-all duration-200 group relative overflow-hidden">
            {/* Glossy top highlight for premium feel */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />

            <CardHeader className="flex flex-row items-start justify-between pb-2">
                <div className="space-y-1 flex-1 min-w-0">
                    <CardTitle className="text-lg font-bold text-white line-clamp-1 group-hover:text-primary transition-colors">
                        {project.name}
                    </CardTitle>
                    {project.domain && (
                        <a
                            href={`https://${project.domain}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-muted-foreground hover:text-blue-400 flex items-center gap-1 transition-colors w-fit"
                        >
                            <Globe className="w-3 h-3" />
                            {project.domain}
                        </a>
                    )}
                </div>

                {/* Quick Stage Selector for Admin */}
                {isAdmin ? (
                    <div className="shrink-0">
                        <Select
                            value={currentStage}
                            onValueChange={handleStageChange}
                            disabled={updating}
                        >
                            <SelectTrigger className={`h-8 text-xs border ${stageConfig.className} min-w-[130px] shadow-sm`}>
                                {updating ? (
                                    <Loader2 className="w-3 h-3 animate-spin" />
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <SelectValue />
                                    </div>
                                )}
                            </SelectTrigger>
                            <SelectContent>
                                {STAGES.map((stage) => {
                                    const config = getStageConfig(stage)
                                    const Icon = config.icon
                                    return (
                                        <SelectItem key={stage} value={stage}>
                                            <div className="flex items-center gap-2">
                                                {config.pulse && (
                                                    <span className="relative flex h-2 w-2">
                                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                                    </span>
                                                )}
                                                {!config.pulse && <Icon className="w-3 h-3" />}
                                                <span className="capitalize">{stage}</span>
                                            </div>
                                        </SelectItem>
                                    )
                                })}
                            </SelectContent>
                        </Select>
                    </div>
                ) : (
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border shrink-0 ${stageConfig.className} shadow-inner`}>
                        {stageConfig.pulse && (
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                        )}
                        {!stageConfig.pulse && <StageIcon className="w-3 h-3" />}
                        {stageConfig.label}
                    </span>
                )}
            </CardHeader>

            <CardContent className="flex-1 space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
                    {project.description || "No description provided."}
                </p>

                {/* Command Center Usage Bars (Visual Only) */}
                <div className="space-y-3 pt-2 border-t border-white/5">
                    <div className="space-y-1.5">
                        <div className="flex justify-between text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                            <span className="flex items-center gap-1"><HardDrive className="w-3 h-3" /> Storage</span>
                            <span>{mockDiskUsage}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"
                                style={{ width: `${mockDiskUsage}%` }}
                            />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <div className="flex justify-between text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                            <span className="flex items-center gap-1"><Activity className="w-3 h-3" /> Bandwidth</span>
                            <span>{mockBandwidth}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-violet-600 to-purple-500 rounded-full"
                                style={{ width: `${mockBandwidth}%` }}
                            />
                        </div>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="pt-3 pb-3 border-t border-white/5 bg-white/[0.02] flex justify-between items-center text-xs">
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{format(new Date(project.createdAt), "MMM d")}</span>
                </div>

                <div className="flex gap-2">
                    {currentStage === 'cancelled' ? (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 hover:bg-red-500/10 hover:text-red-500 text-muted-foreground opacity-50"
                            onClick={() => toast.error("Project Cancelled", { description: "Access to project details is restricted for cancelled projects." })}
                        >
                            <span className="sr-only">Details</span>
                            <ExternalLink className="w-4 h-4" />
                        </Button>
                    ) : (
                        <Link
                            href={`/dashboard/projects/${project.id}`}
                        >
                            <Button variant="ghost" size="sm" className="h-7 px-2 hover:bg-white/10 hover:text-white">
                                <span className="sr-only">Details</span>
                                <ExternalLink className="w-4 h-4" />
                            </Button>
                        </Link>
                    )}

                    {isAdmin && (
                        <>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 px-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                                onClick={handleImpersonate}
                                title="Access Dashboard (Impersonate)"
                            >
                                <LayoutDashboard className="w-4 h-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 px-2 text-muted-foreground hover:text-red-400 hover:bg-red-500/10"
                                onClick={() => onDelete(project)}
                                title="Delete Project"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </>
                    )}

                    {!isAdmin && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-muted-foreground hover:text-white"
                            onClick={() => onEdit(project)}
                        >
                            <Edit className="w-4 h-4" />
                        </Button>
                    )}
                </div>
            </CardFooter>
        </Card>
    )
}
