"use client"

import { Check, Clock, Code, Eye, Rocket } from "lucide-react"
import { cn } from "@/lib/utils"

export type ProjectStage = "pending" | "development" | "review" | "live"

interface ProjectTimelineProps {
    stage: ProjectStage
    className?: string
}

const stages = [
    {
        id: "pending",
        label: "Waiting",
        description: "Menunggu konfirmasi admin",
        icon: Clock
    },
    {
        id: "development",
        label: "Development",
        description: "Sedang dikerjakan",
        icon: Code
    },
    {
        id: "review",
        label: "Review",
        description: "Siap untuk direview",
        icon: Eye
    },
    {
        id: "live",
        label: "Live",
        description: "Project sudah selesai",
        icon: Rocket
    },
]

function getStageIndex(stage: ProjectStage): number {
    return stages.findIndex(s => s.id === stage)
}

export function ProjectTimeline({ stage, className }: ProjectTimelineProps) {
    const currentIndex = getStageIndex(stage)

    return (
        <div className={cn("w-full", className)}>
            {/* Desktop Timeline */}
            <div className="hidden md:flex items-center justify-between relative">
                {/* Progress line background */}
                <div className="absolute left-0 right-0 top-5 h-1 bg-white/10 rounded-full" />

                {/* Progress line filled */}
                <div
                    className="absolute left-0 top-5 h-1 bg-gradient-to-r from-primary to-green-500 rounded-full transition-all duration-500"
                    style={{
                        width: `${currentIndex === 0 ? 0 : (currentIndex / (stages.length - 1)) * 100}%`
                    }}
                />

                {stages.map((s, index) => {
                    const Icon = s.icon
                    const isCompleted = index < currentIndex
                    const isCurrent = index === currentIndex
                    const isPending = index > currentIndex

                    return (
                        <div
                            key={s.id}
                            className="flex flex-col items-center relative z-10"
                        >
                            <div
                                className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2",
                                    isCompleted && "bg-green-500 border-green-500 text-white",
                                    isCurrent && "bg-primary border-primary text-white ring-4 ring-primary/20 scale-110",
                                    isPending && "bg-[#111] border-white/20 text-muted-foreground"
                                )}
                            >
                                {isCompleted ? (
                                    <Check className="w-5 h-5" />
                                ) : (
                                    <Icon className="w-5 h-5" />
                                )}
                            </div>
                            <div className="mt-3 text-center">
                                <p className={cn(
                                    "text-sm font-medium",
                                    isCurrent && "text-primary",
                                    isCompleted && "text-green-400",
                                    isPending && "text-muted-foreground"
                                )}>
                                    {s.label}
                                </p>
                                <p className="text-xs text-muted-foreground mt-0.5 max-w-[100px]">
                                    {s.description}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Mobile Timeline (Vertical) */}
            <div className="md:hidden space-y-4">
                {stages.map((s, index) => {
                    const Icon = s.icon
                    const isCompleted = index < currentIndex
                    const isCurrent = index === currentIndex
                    const isPending = index > currentIndex

                    return (
                        <div
                            key={s.id}
                            className={cn(
                                "flex items-center gap-4 p-3 rounded-xl transition-all",
                                isCurrent && "bg-primary/10 border border-primary/30"
                            )}
                        >
                            <div
                                className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2",
                                    isCompleted && "bg-green-500 border-green-500 text-white",
                                    isCurrent && "bg-primary border-primary text-white",
                                    isPending && "bg-[#111] border-white/20 text-muted-foreground"
                                )}
                            >
                                {isCompleted ? (
                                    <Check className="w-5 h-5" />
                                ) : (
                                    <Icon className="w-5 h-5" />
                                )}
                            </div>
                            <div>
                                <p className={cn(
                                    "text-sm font-medium",
                                    isCurrent && "text-primary",
                                    isCompleted && "text-green-400",
                                    isPending && "text-muted-foreground"
                                )}>
                                    {s.label}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {s.description}
                                </p>
                            </div>
                            {isCurrent && (
                                <span className="ml-auto text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                                    Current
                                </span>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

// Compact version for card display
export function ProjectStageIndicator({ stage }: { stage: ProjectStage }) {
    const config: Record<ProjectStage, { label: string; className: string }> = {
        pending: {
            label: "Waiting",
            className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/30"
        },
        development: {
            label: "In Development",
            className: "bg-blue-500/10 text-blue-500 border-blue-500/30"
        },
        review: {
            label: "Ready for Review",
            className: "bg-purple-500/10 text-purple-500 border-purple-500/30"
        },
        live: {
            label: "Live",
            className: "bg-green-500/10 text-green-500 border-green-500/30"
        }
    }

    const { label, className } = config[stage] || config.pending

    return (
        <span className={cn(
            "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border",
            className
        )}>
            {label}
        </span>
    )
}
