import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User as UserIcon, Mail, Globe, ExternalLink, AlertTriangle, Loader2 } from "lucide-react"
import { Project, User } from "@/app/types/index"
import { useEffect, useState } from "react"
import { projectService } from "@/app/services/projectService"
import { userService } from "@/app/services/userService"
import { orderService } from "@/app/services/orderService"



interface TicketSidebarProps {
    userId: number
    tickeId: number
}

export function TicketSidebar({ userId, tickeId }: TicketSidebarProps) {
    const [userProjects, setUserProjects] = useState<Project[]>([])
    const [userProfile, setUserProfile] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [ltv, setLtv] = useState(0)

    useEffect(() => {
        const fetchContext = async () => {
            try {
                if (userId && userId !== 0) {
                    let user: any = null
                    try {
                        user = await userService.getUserById(userId)
                    } catch (err) {
                        console.warn("Direct fetch failed, falling back")
                    }

                    if (user && user.data) user = user.data

                    if (!user || (!user.email && !user.name)) {
                        const allUsers = await userService.getAllUsers({ limit: 100 })
                        const found = allUsers.find((u: any) => u.id === userId)
                        if (found) user = found
                    }

                    if (user) setUserProfile(user)
                }

                const allProjects = await projectService.getAllProjects()
                const userSpecific = allProjects.filter(p => Number(p.user_id) === Number(userId))
                setUserProjects(userSpecific.slice(0, 5))

                if (userId && userId !== 0) {
                    const orders = await orderService.getUserOrders(userId)
                    let totalSpent = 0
                    if (orders && orders.length > 0) {
                        totalSpent = orders
                            .filter((o: any) => o.status === 'paid')
                            .reduce((sum: number, o: any) => sum + Number(o.total_price || o.amount || 0), 0)
                    }
                    setLtv(totalSpent)
                }

            } catch (e) {
                console.error("Context load failed", e)
            } finally {
                setLoading(false)
            }
        }

        if (userId) fetchContext()
    }, [userId])

    const planName = "Pro"

    if (loading) {
        return (
            <div className="space-y-6">
                <Card className="bg-[#111111]/90 border-white/10 h-[200px] flex items-center justify-center">
                    <Loader2 className="animate-spin text-muted-foreground" />
                </Card>
            </div>
        )
    }

    const displayName = (userProfile as any)?.full_name || userProfile?.name || (userProfile as any)?.username || `User #${userId}`
    const displayEmail = userProfile?.email || "No email"

    let joinDateRaw = (userProfile as any)?.created_at || (userProfile as any)?.createdAt || (userProfile as any)?.joined_at

    if (!joinDateRaw && userProjects.length > 0) {
        const sortedProjects = [...userProjects].sort((a, b) => new Date((a as any).created_at || 0).getTime() - new Date((b as any).created_at || 0).getTime())
        if ((sortedProjects[0] as any)?.created_at) joinDateRaw = (sortedProjects[0] as any).created_at
    }

    if (!joinDateRaw) {
        joinDateRaw = new Date().toISOString()
    }

    let memberSince = "N/A"
    if (joinDateRaw) {
        try {
            memberSince = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(joinDateRaw))
        } catch (e) {
            console.warn("Date parse error", e)
        }
    }

    return (
        <div className="space-y-6">
            <Card className="bg-[#111111]/90 border-white/10 overflow-hidden">
                <div className="h-24 bg-gradient-to-r from-blue-600/20 to-purple-600/20 relative">
                    <div className="absolute -bottom-8 left-6">
                        <div className="w-16 h-16 rounded-full bg-[#111111] border-2 border-white/10 flex items-center justify-center">
                            <UserIcon className="w-8 h-8 text-muted-foreground" />
                        </div>
                    </div>
                </div>
                <CardHeader className="pt-10 pb-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="text-xl font-bold">{displayName}</CardTitle>
                            <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                                <Mail className="w-3 h-3" /> {displayEmail}
                            </p>
                            <div className="mt-2 text-xs text-muted-foreground uppercase bg-white/5 py-0.5 px-2 rounded inline-block">
                                {userProfile?.role || 'user'}
                            </div>
                        </div>
                        <Badge variant="outline" className="border-blue-500/50 text-blue-400 bg-blue-500/10">
                            {planName}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-3">
                        <div className="p-3 rounded-lg bg-white/5 border border-white/5 flex justify-between items-center">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider">LTV</p>
                            <p className="text-sm font-mono font-bold text-green-400">
                                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(ltv)}
                            </p>
                        </div>
                        <div className="p-3 rounded-lg bg-white/5 border border-white/5 flex justify-between items-center">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider">Member Since</p>
                            <p className="text-sm font-medium text-white capitalize">{memberSince}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-[#111111]/90 border-white/10">
                <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                        <Globe className="w-4 h-4" /> Active Projects
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {userProjects.length > 0 ? (
                        userProjects.map(project => (
                            <div key={project.id} className="flex items-center justify-between p-2 rounded hover:bg-white/5 transition-colors group">
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium text-white truncate group-hover:text-primary transition-colors">{project.name}</p>
                                    <a href={`https://${project.domain}`} target="_blank" className="text-xs text-muted-foreground flex items-center gap-1 hover:underline">
                                        {project.domain || "No domain"} <ExternalLinkIcon />
                                    </a>
                                </div>
                                <div className={`w-2 h-2 rounded-full ${project.status === 'live' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-gray-600'}`} />
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-muted-foreground italic">No projects found for this user.</p>
                    )}
                </CardContent>
            </Card>

            <Card className="bg-yellow-500/5 border-yellow-500/20 border-dashed">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-yellow-500/80 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" /> Internal Notes
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-yellow-200/60 italic">
                        User requires fast response times. Previous ticket #124 was escalated due to delay.
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}

function ExternalLinkIcon() {
    return (
        <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
    )
}
