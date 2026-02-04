"use client"

import { useState, useEffect } from "react"
import { ArrowUpRight, Users, DollarSign, ShoppingBag, Activity, Clock, FileText, CreditCard } from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { analyticsService, RevenueDataPoint, ActivityItem as AnalyticsActivity } from "@/app/services/analyticsService"
import { formatCurrency } from "@/lib/formatters"
import { adminOrderService } from "@/app/services/adminOrderService"
import { projectService } from "@/app/services/projectService"
import { SkeletonDashboard } from "@/components/ui/skeleton"
import { ticketService } from "@/app/services/ticketService"

import dynamic from "next/dynamic"

const QuickActionsWidget = dynamic(() => import("@/app/components/dashboard/QuickActionsWidget").then(mod => mod.QuickActionsWidget), {
  loading: () => <SkeletonDashboard className="h-40 w-full" />,
  ssr: false
})
const TopSpendersWidget = dynamic(() => import("@/app/components/dashboard/TopSpendersWidget").then(mod => mod.TopSpendersWidget), {
  loading: () => <SkeletonDashboard className="h-64 w-full" />,
  ssr: false
})

// ... imports remain the same

export default function DashboardPage() {
  const [role, setRole] = useState<string | null>(null)
  const [clientStats, setClientStats] = useState({ totalProjects: 0, activeProjects: 0, pendingProjects: 0, completedProjects: 0, totalSpent: 0 })
  const [myProjects, setMyProjects] = useState<any[]>([])
  const [notifications, setNotifications] = useState<any[]>([])
  const [adminStats, setAdminStats] = useState({ revenue: 0, activeProjects: 0, totalClients: 0, serverLoad: 0 })
  const [loading, setLoading] = useState(true)

  // New State for Widgets
  const [quickInfos, setQuickInfos] = useState({ pendingProjects: 0, unansweredTickets: 0, pendingOrders: 0 })
  const [topSpenders, setTopSpenders] = useState<any[]>([])

  const [recentActivities, setRecentActivities] = useState<{ title: string; desc: string; time: string; type: string }[]>([])

  // EFFECT 1: Initial Data Load
  useEffect(() => {
    const checkRoleAndFetch = async () => {
      const { authService } = await import("@/app/services/authService")
      try {
        const user = await authService.getMe()
        const userRole = user.role
        setRole(userRole)

        setLoading(true)
        const { dashboardService } = await import("@/app/services/dashboardService")

        if (userRole === 'admin' || userRole === 'editor') {
          // --- ADMIN DATA FETCHING ---

          let totalRevenue = 0
          let allOrders: any[] = []

          // 1. Fetch Orders & Revenue & Top Spenders
          try {
            const ordersResp = await adminOrderService.getAllOrders({})
            if (ordersResp && ordersResp.items) {
              allOrders = ordersResp.items

              // Revenue
              totalRevenue = allOrders
                .filter((o: any) => o.status === 'paid')
                .reduce((sum: number, o: any) => sum + (o.total_price || 0), 0)

              // Top Spenders Calculation
              const spenderMap: Record<string, any> = {}
              allOrders.forEach((o: any) => {
                if (o.status === 'paid') {
                  const email = o.user_email
                  if (!spenderMap[email]) {
                    spenderMap[email] = { name: o.user_name, email: o.user_email, totalSpent: 0, ordersCount: 0 }
                  }
                  spenderMap[email].totalSpent += o.total_price || 0
                  spenderMap[email].ordersCount += 1
                }
              })
              setTopSpenders(Object.values(spenderMap))
            }
          } catch (e) {
            console.warn("Failed to fetch orders", e)
          }

          // 2. Projects & Pending Count
          let activeProjectsCount = 0
          let pendingProjectsCount = 0
          try {
            const allProjects = await projectService.getAllProjects()
            activeProjectsCount = allProjects.filter(p => p.status !== 'cancelled').length
            pendingProjectsCount = allProjects.filter(p => p.status === 'pending').length
          } catch (e) {
            console.warn("Failed to fetch projects", e)
          }

          // 3. Tickets Count
          let openTicketsCount = 0
          try {
            const tickets = await ticketService.getAllTickets({ status: 'open' })
            // API might return array directly or wrapped
            const ticketList = Array.isArray(tickets) ? tickets : (tickets as any).items || []
            openTicketsCount = ticketList.length
          } catch (e) {
            console.warn("Failed fetch tickets", e)
          }

          // 4. Pending Orders
          const pendingOrdersCount = allOrders.filter(o => o.status === 'pending').length

          // Update State
          setQuickInfos({
            pendingProjects: pendingProjectsCount,
            unansweredTickets: openTicketsCount,
            pendingOrders: pendingOrdersCount
          })

          const baseStats = await dashboardService.getAdminStats()
          setAdminStats({
            ...baseStats,
            revenue: totalRevenue,
            activeProjects: activeProjectsCount
          })

          // Recent Activities
          try {
            const activities = await analyticsService.getRecentActivities(5)
            if (activities.length > 0) {
              setRecentActivities(activities.map(a => ({
                title: a.title,
                desc: a.description,
                time: formatTimeAgo(a.created_at),
                type: a.type
              })))
            }
          } catch (e) { console.warn(e) }

        } else {
          // ... Client Logic (Unchanged) ...
          const stats = await dashboardService.getClientStats()
          setClientStats(stats)
          const projects = await projectService.getMyProjects()
          setMyProjects(projects)
          try {
            const { api } = await import("@/app/services/api")
            const data = await api.get<any[]>("/auth/notifications")
            setNotifications(data.slice(0, 5))
          } catch (e) { console.warn(e) }
        }
      } catch (e) {
        console.error("Dashboard Load Error", e)
      } finally {
        setLoading(false)
      }
    }
    checkRoleAndFetch()
  }, [])

  // Helper to format time
  const formatTimeAgo = (dateStr: string): string => {
    const date = new Date(dateStr)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    if (diffMins < 60) return `${diffMins}m ago`
    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours}h ago`
    const diffDays = Math.floor(diffHours / 24)
    return `${diffDays}d ago`
  }

  // Prevent flicker
  if (loading || !role) {
    return <SkeletonDashboard />
  }

  return (
    <div className="space-y-10 relative z-10">
      {/* Header Title */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          {(role === "client" || role === "user") ? "Project Overview" : "Dashboard Overview"}
        </h1>
        <p className="text-muted-foreground">
          {(role === "client" || role === "user") ? "Track your project progress and milestones." : "Welcome back, here's what's happening today."}
        </p>
      </div>

      {/* --- TAMPILAN ADMIN --- */}
      {role === "admin" && (
        <>


          {/* 2. Main Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Revenue"
              value={new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(adminStats.revenue)}
              trend="+20.1%"
              icon={DollarSign}
              trendColor="text-green-400"
              color="primary"
            />
            <StatCard title="Active Projects" value={adminStats.activeProjects} trend="+2 new" icon={ShoppingBag} trendColor="text-white/70" color="blue-500" />
            <StatCard title="Total Clients" value={adminStats.totalClients} trend="+18%" icon={Users} trendColor="text-green-400" color="purple-500" />
            <StatCard title="Server Load" value={`${adminStats.serverLoad}%`} trend="Optimal" icon={Activity} trendColor="text-white/70" color="pink-500" />
          </div>

          {/* 2. Quick Info Widget (Moved Below Stats) */}
          <div className="mb-8">
            <QuickActionsWidget
              pendingProjects={quickInfos.pendingProjects}
              unansweredTickets={quickInfos.unansweredTickets}
              pendingOrders={quickInfos.pendingOrders}
            />
          </div>

          {/* 3. Analytics & Top Spenders */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 min-h-[400px]">
              {/* Replaced Chart with Top Spenders Widget for better data accuracy */}
              <TopSpendersWidget spenders={topSpenders} />
            </div>

            <div className="p-6 md:p-8 rounded-3xl bg-[#111111]/80 border border-white/5 backdrop-blur-xl">
              <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
              <div className="space-y-6">
                {recentActivities.length > 0 ? (
                  recentActivities.slice(0, 3).map((activity, idx) => (
                    <ActivityItem
                      key={idx}
                      title={activity.title}
                      desc={activity.desc}
                      time={activity.time}
                      icon={activity.type === 'new_project' ? ShoppingBag : activity.type === 'new_client' ? Users : DollarSign}
                      color={activity.type === 'new_project' ? 'bg-primary/10 text-primary' : activity.type === 'new_client' ? 'bg-green-500/10 text-green-500' : 'bg-purple-500/10 text-purple-500'}
                    />
                  ))
                ) : (
                  <>
                    <div className="text-center text-muted-foreground py-8">No recent activity</div>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* --- TAMPILAN CLIENT (POV Berbeda) --- */}
      {(role === "client" || role === "user") && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Projects" value={clientStats.totalProjects} trend="All Time" icon={ShoppingBag} trendColor="text-white/70" color="primary" />
            <StatCard title="Active Projects" value={clientStats.activeProjects} trend="In Progress" icon={Activity} trendColor="text-green-400" color="blue-500" />
            <StatCard title="Total Spent" value={formatCurrency(clientStats.totalSpent)} trend="Lifetime" icon={DollarSign} trendColor="text-white/70" color="green-500" />
            <StatCard title="Pending" value={clientStats.pendingProjects} trend="Waiting Approval" icon={Clock} trendColor="text-yellow-400" color="purple-500" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 p-6 md:p-8 rounded-3xl bg-[#111111]/80 border border-white/5 backdrop-blur-xl min-h-[400px] flex flex-col shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-white">Active Projects Overview</h3>
                <div className="text-xs text-muted-foreground bg-white/5 px-3 py-1 rounded-full">{myProjects.length} Projects</div>
              </div>
              <div className="flex-1 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 text-xs text-muted-foreground uppercase tracking-wider">
                      <th className="pb-4 pl-2 font-medium">Project Name</th>
                      <th className="pb-4 font-medium">Stage</th>
                      <th className="pb-4 font-medium">Status</th>
                      <th className="pb-4 font-medium text-right pr-2">Total Value</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {myProjects.length > 0 ? (
                      myProjects.slice(0, 5).map((project, i) => (
                        <tr key={project.id} className="group hover:bg-white/[0.02] border-b border-white/5 last:border-0 transition-colors">
                          <td className="py-4 pl-2 font-medium text-white group-hover:text-primary transition-colors">
                            {project.name || project.subdomain || `Project #${project.id}`}
                            <div className="text-xs text-muted-foreground font-normal">{project.subdomain}.digadoin.com</div>
                          </td>
                          <td className="py-4">
                            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 capitalize">
                              {project.stage || 'Pending'}
                            </span>
                          </td>
                          <td className="py-4">
                            <div className="flex items-center gap-2">
                              {/* Pulse for Active/Live, Yellow for In Progress/Dev, Gray for others */}
                              <div className={`w-1.5 h-1.5 rounded-full ${project.display_status === 'Active' ? 'bg-green-500 animate-pulse' :
                                (project.display_status === 'In Progress' || project.display_status === 'In Dev') ? 'bg-blue-500' :
                                  project.display_status === 'Queue' ? 'bg-yellow-500' :
                                    'bg-gray-500'
                                }`} />
                              <span className="text-gray-300 capitalize">{project.display_status || project.stage || 'Draft'}</span>
                            </div>
                          </td>
                          <td className="py-4 pr-2 text-right tabular-nums text-gray-300">
                            {formatCurrency(project.total_value || 0)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-muted-foreground">
                          No active projects found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="p-6 md:p-8 rounded-3xl bg-[#111111]/80 border border-white/5 backdrop-blur-xl">
              <h3 className="text-xl font-bold text-white mb-6">Recent Notifications</h3>
              <div className="space-y-6">
                {notifications.length > 0 ? (
                  notifications.map((n, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className={`p-3 rounded-2xl shrink-0 ${n.type === 'payment' ? 'bg-purple-500/10 text-purple-500' :
                        n.type === 'project' || n.type === 'shopping-bag' ? 'bg-blue-500/10 text-blue-500' :
                          'bg-primary/10 text-primary'
                        }`}>
                        {n.type === 'payment' ? <DollarSign size={18} /> :
                          n.type === 'project' || n.type === 'shopping-bag' ? <ShoppingBag size={18} /> :
                            <Activity size={18} />}
                      </div>
                      <div className="flex-1 pt-1">
                        <h5 className="text-sm font-bold text-white mb-0.5 line-clamp-1">{n.title}</h5>
                        <p className="text-xs text-muted-foreground line-clamp-2">{n.description}</p>
                        <span className="text-[10px] text-muted-foreground/60 font-medium pt-1.5 block tabular-nums">
                          {new Date(n.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-muted-foreground text-sm">
                    No new notifications.
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}


// --- Sub-Components (Reused) ---
function StatCard({ title, value, trend, icon: Icon, trendColor, color }: any) {
  return (
    <div className="p-6 rounded-[22px] bg-[#111111]/80 border border-white/5 backdrop-blur-xl relative overflow-hidden group hover:border-white/10 transition-all duration-300">
      <div className={`absolute top-0 right-0 w-24 h-24 bg-${color}/10 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2 group-hover:bg-${color}/20 transition-all duration-500`}></div>
      <div className="flex justify-between items-start relative z-10">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <h4 className="text-3xl font-bold text-white mb-2 tabular-nums">{value}</h4>
          <p className={`text-xs font-medium flex items-center gap-1 ${trendColor}`}>
            {trendColor.includes("green") || trendColor.includes("white") ? <ArrowUpRight size={14} /> : null} {trend}
          </p>
        </div>
        <div className={`p-3 rounded-2xl bg-white/5 text-${color} group-hover:scale-110 transition-transform duration-300`}>
          <Icon size={22} />
        </div>
      </div>
    </div>
  )
}

function ActivityItem({ title, desc, time, icon: Icon, color }: any) {
  return (
    <div className="flex items-start gap-4 relative group">
      <div className={`p-3 rounded-2xl shrink-0 ${color} group-hover:scale-105 transition-transform`}>
        <Icon size={18} />
      </div>
      <div className="flex-1 pt-1">
        <h5 className="text-sm font-bold text-white mb-0.5">{title}</h5>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      <span className="text-xs text-muted-foreground/60 font-medium pt-1 tabular-nums">{time}</span>
    </div>
  )
}