import { cn } from "@/lib/utils"

interface SkeletonProps {
    className?: string
}

export function Skeleton({ className }: SkeletonProps) {
    return (
        <div
            className={cn(
                "animate-pulse rounded-lg bg-white/5",
                className
            )}
        />
    )
}

// Pre-built skeleton variants
export function SkeletonText({ className }: SkeletonProps) {
    return <Skeleton className={cn("h-4 w-full", className)} />
}

export function SkeletonCircle({ className }: SkeletonProps) {
    return <Skeleton className={cn("h-10 w-10 rounded-full", className)} />
}

export function SkeletonButton({ className }: SkeletonProps) {
    return <Skeleton className={cn("h-10 w-24 rounded-xl", className)} />
}

// Card skeleton for project/client cards
export function SkeletonCard() {
    return (
        <div className="p-6 rounded-[22px] bg-[#111111]/80 border border-white/5 space-y-4">
            <div className="flex justify-between items-start">
                <Skeleton className="h-12 w-12 rounded-xl" />
                <Skeleton className="h-8 w-8 rounded-lg" />
            </div>
            <div className="space-y-2">
                <SkeletonText className="w-3/4" />
                <SkeletonText className="w-1/2" />
            </div>
            <div className="space-y-2">
                <div className="flex justify-between">
                    <SkeletonText className="w-16" />
                    <SkeletonText className="w-10" />
                </div>
                <Skeleton className="h-2 w-full rounded-full" />
            </div>
        </div>
    )
}

// Table row skeleton
export function SkeletonTableRow() {
    return (
        <div className="grid grid-cols-12 gap-4 p-4 items-center border-b border-white/5">
            <div className="col-span-4 flex items-center gap-4">
                <SkeletonCircle />
                <div className="space-y-2 flex-1">
                    <SkeletonText className="w-32" />
                    <SkeletonText className="w-24 h-3" />
                </div>
            </div>
            <div className="col-span-2">
                <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <div className="col-span-2">
                <SkeletonText className="w-20" />
            </div>
            <div className="col-span-3">
                <SkeletonText className="w-24" />
            </div>
            <div className="col-span-1 flex justify-end">
                <Skeleton className="h-8 w-8 rounded-lg" />
            </div>
        </div>
    )
}

// Stats card skeleton
export function SkeletonStatCard() {
    return (
        <div className="p-6 rounded-[22px] bg-[#111111]/80 border border-white/5">
            <div className="flex justify-between items-start">
                <div className="space-y-3">
                    <SkeletonText className="w-24 h-3" />
                    <Skeleton className="h-8 w-20" />
                    <SkeletonText className="w-16 h-3" />
                </div>
                <Skeleton className="h-12 w-12 rounded-2xl" />
            </div>
        </div>
    )
}

// Dashboard page skeleton
export function SkeletonDashboard({ className }: SkeletonProps) {
    return (
        <div className={cn("space-y-10", className)}>
            <div className="space-y-2">
                <Skeleton className="h-10 w-64" />
                <SkeletonText className="w-80" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                    <SkeletonStatCard key={i} />
                ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Skeleton className="h-[400px] rounded-3xl" />
                </div>
                <Skeleton className="h-[400px] rounded-3xl" />
            </div>
        </div>
    )
}
