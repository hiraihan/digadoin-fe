"use client"

import type React from "react"
import { useState, useEffect } from "react" // Tambah useEffect
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard, ShoppingBag, Users, Settings, LogOut, Menu, X, Bell, Search,
  PanelLeftClose, PanelLeftOpen, FileText, CreditCard, HelpCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

// Menu untuk ADMIN
const adminItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: ShoppingBag, label: "Projects", href: "/dashboard/projects" },
  { icon: Users, label: "Clients", href: "/dashboard/clients" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
]

// Menu untuk CLIENT (POV Berbeda)
const clientItems = [
  { icon: LayoutDashboard, label: "My Dashboard", href: "/dashboard" },
  { icon: FileText, label: "My Project", href: "/dashboard/projects" }, // Reuse page tapi logic nanti beda
  { icon: CreditCard, label: "Billing & Invoices", href: "/dashboard/billing" }, // Halaman baru (mock)
  { icon: HelpCircle, label: "Support Ticket", href: "/dashboard/support" }, // Halaman baru (mock)
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [role, setRole] = useState("admin") // Default admin agar aman saat SSR
  
  const pathname = usePathname()
  const router = useRouter()

  // Cek Role saat mount
  useEffect(() => {
    const storedRole = localStorage.getItem("userRole")
    if (storedRole) {
      setRole(storedRole)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("userRole") // Hapus sesi
    toast.success("Logged out", { description: "See you again soon!" })
    router.push("/login")
  }

  // Pilih menu berdasarkan role
  const sidebarItems = role === "client" ? clientItems : adminItems

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex overflow-hidden">
      {/* SIDEBAR */}
      <aside className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-[#111111]/80 backdrop-blur-xl border-r border-white/5 transition-all duration-300 ease-in-out md:relative",
          isCollapsed ? "w-[80px]" : "w-[280px]",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}>
        
        {/* Header Sidebar */}
        <div className={cn("h-20 flex items-center px-6 mb-6", isCollapsed ? "justify-center px-2" : "justify-between")}>
           {!isCollapsed && (
            <Link href="/dashboard" className="flex items-center gap-3 group">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-blue-600 text-white font-bold text-lg shadow-lg shadow-primary/20">D</div>
                <span className="text-xl font-bold text-white tracking-tight">digado.in</span>
            </Link>
           )}
           <Button variant="ghost" size="icon" className="hidden md:flex text-muted-foreground hover:text-white hover:bg-white/5 rounded-xl" onClick={() => setIsCollapsed(!isCollapsed)}>
             {isCollapsed ? <PanelLeftOpen size={20}/> : <PanelLeftClose size={20}/> }
           </Button>
           <Button variant="ghost" size="icon" className="md:hidden text-muted-foreground" onClick={() => setIsMobileMenuOpen(false)}><X size={24} /></Button>
        </div>

        {/* Role Badge (Optional) */}
        {!isCollapsed && (
          <div className="px-6 mb-4">
            <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {role === "client" ? "Client Portal" : "Admin Workspace"}
            </div>
          </div>
        )}

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href} className={cn(
                  "flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-200 group relative overflow-hidden",
                  isActive ? "bg-primary text-white font-semibold shadow-[0_4px_20px_-5px_rgba(var(--primary-rgb),0.5)]" : "text-muted-foreground hover:text-white hover:bg-white/5",
                   isCollapsed && "justify-center px-2 py-3"
                )}>
                <item.icon size={22} className={cn("shrink-0 transition-transform duration-300", !isActive && "group-hover:scale-110")} />
                {!isCollapsed && <span>{item.label}</span>}
                {isActive && !isCollapsed && <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-20 pointer-events-none"></div>}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 mt-auto">
          <Button variant="ghost" onClick={handleLogout} className={cn("w-full justify-start gap-4 text-muted-foreground hover:text-red-400 hover:bg-red-500/10 rounded-2xl h-12 px-4", isCollapsed && "justify-center px-0")}>
            <LogOut size={22} className="shrink-0" />
            {!isCollapsed && <span>Log Out</span>}
          </Button>
        </div>
      </aside>

      {isMobileMenuOpen && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />}

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 flex items-center justify-between px-6 md:px-10 border-b border-white/5 bg-[#0A0A0A]/50 backdrop-blur-md z-30 sticky top-0">
          <div className="flex items-center gap-4 flex-1">
            <Button variant="ghost" size="icon" className="md:hidden text-muted-foreground hover:bg-white/5 rounded-xl" onClick={() => setIsMobileMenuOpen(true)}><Menu size={24} /></Button>
            {/* Search Bar hanya untuk Admin */}
            {role === "admin" && (
              <div className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-white/5 rounded-2xl border border-white/5 w-full max-w-md focus-within:border-primary/50 focus-within:bg-white/10 transition-all">
                  <Search size={18} className="text-muted-foreground" />
                  <Input placeholder="Search projects, clients..." className="border-0 p-0 h-auto bg-transparent placeholder:text-muted-foreground/50 focus-visible:ring-0"/>
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white hover:bg-white/5 rounded-xl relative">
              <Bell size={22} />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#0A0A0A]"></span>
            </Button>
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary to-purple-500 cursor-pointer hover:ring-2 ring-white/20 transition-all flex items-center justify-center font-bold text-white text-sm">
              {role === 'client' ? 'C' : 'A'}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar relative">
            <div className="absolute inset-0 grid-pattern opacity-[0.02] pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none"></div>
            {children}
        </main>
      </div>
    </div>
  )
}