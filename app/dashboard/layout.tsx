"use client"

import type React from "react"
import { useState, useEffect } from "react" // Tambah useEffect
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard, ShoppingBag, Users, Settings, LogOut, Menu, X, Search,
  PanelLeftClose, PanelLeftOpen, FileText, CreditCard, HelpCircle, User, MessageSquareText, TicketCheck, Package, Home
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { NotificationPanel } from "@/components/dashboard/notification-panel"

// Menu untuk ADMIN (Reorganized for clarity)
const adminItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: ShoppingBag, label: "New Orders", href: "/dashboard/orders" },
  { icon: Package, label: "Active Projects", href: "/dashboard/projects" },
  { icon: TicketCheck, label: "Support Tickets", href: "/dashboard/tickets" },
  { icon: CreditCard, label: "Pricing & Plans", href: "/dashboard/products" },
  { icon: Users, label: "Clients", href: "/dashboard/clients" },
]

// Menu untuk CLIENT (POV Berbeda)
const clientItems = [
  { icon: LayoutDashboard, label: "My Dashboard", href: "/dashboard" },
  { icon: FileText, label: "My Project", href: "/dashboard/projects" },
  { icon: MessageSquareText, label: "Change Request", href: "/dashboard/change-request" },
  { icon: TicketCheck, label: "My Tickets", href: "/dashboard/tickets" },
  { icon: CreditCard, label: "Billing & Invoices", href: "/dashboard/billing" },
  { icon: HelpCircle, label: "Support", href: "/dashboard/support" },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [user, setUser] = useState<{ name: string, email: string, role: string } | null>(null)
  const [role, setRole] = useState("client") // Default to client for safety

  const pathname = usePathname()
  const router = useRouter()

  // Cek Role saat mount
  useEffect(() => {
    const fetchUser = async () => {
      if (typeof window !== 'undefined') {
        const storedRole = localStorage.getItem("userRole")
        const token = localStorage.getItem("token")

        if (storedRole) {
          setRole(storedRole)
        }

        if (token) {
          try {
            // Dynamically import to avoid server-side issues if any
            const { authService } = await import("@/app/services/authService")
            const userData = await authService.getMe()
            setUser(userData as any)
            // Sync role just in case
            setRole(userData.role)
            localStorage.setItem("userRole", userData.role)
          } catch (e) {
            console.error("Failed to fetch user in layout", e)
          }
        }
      }
    }
    fetchUser()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("userRole")
    localStorage.removeItem("token")
    toast.success("Logged out", { description: "See you again soon!" })
    router.push("/login")
  }

  const isClient = role === "client" || role === "user"

  // Pilih menu berdasarkan role
  // API roles: admin, editor, user. Frontend concept: client = user.
  const sidebarItems = isClient ? clientItems : adminItems

  return (
    <div className="h-screen bg-[#0A0A0A] flex overflow-hidden">
      {/* SIDEBAR */}
      {/* Hide Sidebar only on Client Order Page */}
      {!pathname?.match(/^\/dashboard\/order($|\/)/) && (
        <aside className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-[#111111]/80 backdrop-blur-xl border-r border-white/5 transition-all duration-300 ease-in-out md:relative h-full",
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
              {isCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden text-muted-foreground" onClick={() => setIsMobileMenuOpen(false)}><X size={24} /></Button>
          </div>

          {/* Role Badge (Optional) */}
          {!isCollapsed && (
            <div className="px-6 mb-4">
              <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {isClient ? "Client Portal" : "Admin Workspace"}
              </div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto custom-scrollbar px-4 space-y-2 min-h-0">
            <nav className="space-y-2">
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
              <Link href="/" className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-200 group relative overflow-hidden text-muted-foreground hover:text-white hover:bg-white/5 mt-4 border-t border-white/5",
                isCollapsed && "justify-center px-2 py-3"
              )}>
                <Home size={22} className={cn("shrink-0 transition-transform duration-300 group-hover:scale-110")} />
                {!isCollapsed && <span>Back to Home</span>}
              </Link>
            </nav>
          </div>

          <div className="p-4 mt-auto border-t border-white/5">
            <Button variant="ghost" onClick={handleLogout} className={cn("w-full justify-start gap-4 text-muted-foreground hover:text-red-400 hover:bg-red-500/10 rounded-2xl h-12 px-4", isCollapsed && "justify-center px-0")}>
              <LogOut size={22} className="shrink-0" />
              {!isCollapsed && <span>Log Out</span>}
            </Button>
          </div>
        </aside>
      )}

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
                <Input placeholder="Search projects, clients..." className="border-0 p-0 h-auto bg-transparent placeholder:text-muted-foreground/50 focus-visible:ring-0" />
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            <NotificationPanel />

            {/* User Dropdown */}
            <div className="relative">
              <div
                className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary to-purple-500 cursor-pointer hover:ring-2 ring-white/20 transition-all flex items-center justify-center font-bold text-white text-sm"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                {isClient ? 'C' : 'A'}
              </div>

              {isUserMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-[#111111] border border-white/10 rounded-xl shadow-2xl z-50 py-1 overflow-hidden backdrop-blur-xl">
                    <div className="px-4 py-3 border-b border-white/5 mb-1">
                      <p className="text-sm font-medium text-white truncate">{user?.name || (isClient ? "Client Account" : "Administrator")}</p>
                      <p className="text-xs text-muted-foreground truncate">{user?.email || role}</p>
                    </div>

                    <Link
                      href={isClient ? "/dashboard/profile" : "/dashboard/settings"}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <User size={16} />
                      {isClient ? "Profile Settings" : "System Settings"}
                    </Link>

                    <div
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors cursor-pointer"
                    >
                      <LogOut size={16} />
                      Log Out
                    </div>
                  </div>
                </>
              )}
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