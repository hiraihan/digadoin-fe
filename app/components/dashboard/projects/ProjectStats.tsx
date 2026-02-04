import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, CheckCircle, Clock, Layout, AlertTriangle } from "lucide-react"
import { Project } from "@/app/types"

interface ProjectStatsProps {
    projects: Project[]
}

export function ProjectStats({ projects }: ProjectStatsProps) {
    const total = projects.length

    // Match against actual status values (case-insensitive)
    const active = projects.filter((p) => {
        const status = (p.status || '').toString().toLowerCase()
        return status === 'development' || status === 'in_progress' || status === 'in-progress'
    }).length

    const completed = projects.filter((p) => {
        const status = (p.status || '').toString().toLowerCase()
        return status === 'live' || status === 'completed'
    }).length

    const pending = projects.filter((p) => {
        const status = (p.status || '').toString().toLowerCase()
        return status === 'pending'
    }).length

    const review = projects.filter((p) => {
        const status = (p.status || '').toString().toLowerCase()
        return status === 'review'
    }).length

    const cancelled = projects.filter((p) => {
        const status = (p.status || '').toString().toLowerCase()
        return status === 'cancelled'
    }).length

    // Other includes suspended, unknown, and any other status
    const other = total - active - completed - pending - review - cancelled

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                    <Layout className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{total}</div>
                    <p className="text-xs text-muted-foreground">All time projects</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending</CardTitle>
                    <Clock className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{pending}</div>
                    <p className="text-xs text-muted-foreground">Awaiting start</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">In Development</CardTitle>
                    <Activity className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{active}</div>
                    <p className="text-xs text-muted-foreground">Currently active</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">In Review</CardTitle>
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{review}</div>
                    <p className="text-xs text-muted-foreground">Awaiting approval</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Live</CardTitle>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{completed}</div>
                    <p className="text-xs text-muted-foreground">Successfully delivered</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
                    <div className="h-4 w-4 rounded-full border-[3px] border-red-500/30 flex items-center justify-center">
                        <div className="h-1.5 w-1.5 rounded-full bg-red-500"></div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{cancelled}</div>
                    <p className="text-xs text-muted-foreground">Discontinued projects</p>
                </CardContent>
            </Card>
        </div>
    )
}
