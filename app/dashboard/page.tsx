"use client"

import { useState, useEffect } from "react" // Tambah useEffect
import { ArrowUpRight, Users, DollarSign, ShoppingBag, Activity, Clock, FileText, CreditCard } from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const adminData = [
  { name: "Jan", revenue: 4000 }, { name: "Feb", revenue: 3000 }, { name: "Mar", revenue: 5000 },
  { name: "Apr", revenue: 2780 }, { name: "May", revenue: 1890 }, { name: "Jun", revenue: 2390 },
  { name: "Jul", revenue: 3490 }, { name: "Aug", revenue: 4200 }, { name: "Sep", revenue: 5100 },
  { name: "Oct", revenue: 6200 }, { name: "Nov", revenue: 7400 }, { name: "Dec", revenue: 8900 },
]

const clientData = [
  { name: "W1", progress: 10 }, { name: "W2", progress: 25 }, { name: "W3", progress: 40 },
  { name: "W4", progress: 45 }, { name: "W5", progress: 60 }, { name: "W6", progress: 65 },
]

export default function DashboardPage() {
  const [role, setRole] = useState("admin")

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole")
    if (storedRole) setRole(storedRole)
  }, [])

  return (
    <div className="space-y-10 relative z-10">
      {/* Header Title */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          {role === "client" ? "Project Overview" : "Dashboard Overview"}
        </h1>
        <p className="text-muted-foreground">
          {role === "client" ? "Track your project progress and milestones." : "Welcome back, here's what's happening today."}
        </p>
      </div>

      {/* --- TAMPILAN ADMIN --- */}
      {role === "admin" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Revenue" value="$45,231.89" trend="+20.1%" icon={DollarSign} trendColor="text-green-400" color="primary" />
            <StatCard title="Active Projects" value="12" trend="+2 new" icon={ShoppingBag} trendColor="text-white/70" color="blue-500" />
            <StatCard title="Total Clients" value="284" trend="+18%" icon={Users} trendColor="text-green-400" color="purple-500" />
            <StatCard title="Server Load" value="34%" trend="Optimal" icon={Activity} trendColor="text-white/70" color="pink-500" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 p-6 md:p-8 rounded-3xl bg-[#111111]/80 border border-white/5 backdrop-blur-xl min-h-[400px] flex flex-col shadow-2xl">
               <div className="flex items-center justify-between mb-8">
                   <h3 className="text-xl font-bold text-white">Revenue Analytics</h3>
                   <div className="text-xs text-muted-foreground bg-white/5 px-3 py-1 rounded-full">Yearly View</div>
               </div>
               <div className="flex-1 w-full h-[300px]">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={adminData}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#666', fontSize: 12}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#666', fontSize: 12}} />
                      <Tooltip contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} itemStyle={{ color: '#fff' }} />
                      <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                    </AreaChart>
                 </ResponsiveContainer>
               </div>
            </div>
            <div className="p-6 md:p-8 rounded-3xl bg-[#111111]/80 border border-white/5 backdrop-blur-xl">
                <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
                <div className="space-y-6">
                    <ActivityItem title="New Project Started" desc="LMS Platform" time="2m ago" icon={ShoppingBag} color="bg-primary/10 text-primary" />
                    <ActivityItem title="New Client" desc="Sarah Connor joined" time="1h ago" icon={Users} color="bg-green-500/10 text-green-500" />
                    <ActivityItem title="Payment Received" desc="$1,200 from Alpha" time="1d ago" icon={DollarSign} color="bg-purple-500/10 text-purple-500" />
                </div>
            </div>
          </div>
        </>
      )}

      {/* --- TAMPILAN CLIENT (POV Berbeda) --- */}
      {role === "client" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Project Status" value="65%" trend="On Track" icon={Activity} trendColor="text-green-400" color="primary" />
            <StatCard title="Next Milestone" value="UAT Test" trend="Due: Oct 24" icon={Clock} trendColor="text-yellow-400" color="blue-500" />
            <StatCard title="Outstanding Invoice" value="$1,500" trend="Due in 3 days" icon={CreditCard} trendColor="text-red-400" color="purple-500" />
            <StatCard title="Documents" value="12 Files" trend="3 New" icon={FileText} trendColor="text-white/70" color="pink-500" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 p-6 md:p-8 rounded-3xl bg-[#111111]/80 border border-white/5 backdrop-blur-xl min-h-[400px] flex flex-col shadow-2xl">
               <div className="flex items-center justify-between mb-8">
                   <h3 className="text-xl font-bold text-white">Development Progress</h3>
                   <div className="text-xs text-muted-foreground bg-white/5 px-3 py-1 rounded-full">Weekly Sprint</div>
               </div>
               <div className="flex-1 w-full h-[300px]">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={clientData}>
                      <defs>
                        <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#666', fontSize: 12}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#666', fontSize: 12}} />
                      <Tooltip contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} itemStyle={{ color: '#fff' }} />
                      <Area type="monotone" dataKey="progress" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorProgress)" />
                    </AreaChart>
                 </ResponsiveContainer>
               </div>
            </div>
            <div className="p-6 md:p-8 rounded-3xl bg-[#111111]/80 border border-white/5 backdrop-blur-xl">
                <h3 className="text-xl font-bold text-white mb-6">Notifications</h3>
                <div className="space-y-6">
                    <ActivityItem title="Milestone Completed" desc="Phase 1: Design System" time="Yesterday" icon={Activity} color="bg-green-500/10 text-green-500" />
                    <ActivityItem title="New Invoice" desc="#INV-2024-001 generated" time="2d ago" icon={CreditCard} color="bg-purple-500/10 text-purple-500" />
                    <ActivityItem title="Meeting Scheduled" desc="Weekly Sync with Team" time="Mon, 10:00 AM" icon={Users} color="bg-blue-500/10 text-blue-500" />
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