"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MessageSquare, Clock, CheckCircle2, AlertCircle, Plus, Loader2 } from "lucide-react"
import { ticketService, Ticket } from "@/app/services/ticketService"
import { toast } from "sonner"
import { format } from "date-fns"
import { useAuth } from "@/app/hooks/useAuth"

const statusConfig = {
    "open": { label: "Open", color: "text-blue-500", bg: "bg-blue-500/10 border-blue-500/20", icon: AlertCircle },
    "answered": { label: "Answered", color: "text-yellow-500", bg: "bg-yellow-500/10 border-yellow-500/20", icon: Clock },
    "closed": { label: "Closed", color: "text-gray-400", bg: "bg-white/5 border-white/10", icon: CheckCircle2 },
}

const priorityColors: Record<string, string> = {
    low: "text-green-500",
    medium: "text-yellow-500",
    high: "text-orange-500",
    critical: "text-red-500",
}

export default function TicketsPage() {
    const { user, role } = useAuth()
    const [tickets, setTickets] = useState<Ticket[]>([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState<"all" | "open" | "closed">("all")
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        if (role) fetchTickets()
    }, [role])

    const fetchTickets = async () => {
        setLoading(true)
        try {
            const data = role === 'admin'
                ? await ticketService.getAllTickets()
                : await ticketService.getMyTickets()
            console.log("Fetched Tickets:", data) // DEBUG: Check created_at field
            setTickets(data)
        } catch (error) {
            console.error("Failed to fetch tickets:", error)
            toast.error("Failed to load tickets")
        } finally {
            setLoading(false)
        }
    }

    const filteredTickets = tickets.filter((ticket) => {
        const matchesFilter =
            filter === "all" ||
            (filter === "open" && (ticket.status === "open" || ticket.status === "answered")) ||
            (filter === "closed" && ticket.status === "closed")

        // Robust search
        const subject = (ticket.subject || "").toLowerCase()
        const query = searchQuery.toLowerCase()
        const matchesSearch = subject.includes(query) || String(ticket.id).includes(query)

        return matchesFilter && matchesSearch
    })

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return "N/A"
        try {
            return format(new Date(dateStr), "MMM d, yyyy")
        } catch {
            return dateStr
        }
    }

    if (!user) return null // Wait for auth

    return (
        <div className="max-w-5xl mx-auto space-y-8 relative z-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        {role === 'admin' ? 'All Support Tickets' : 'Support Tickets'}
                    </h1>
                    <p className="text-muted-foreground">
                        {role === 'admin' ? 'Manage Change Requests and Support Issues.' : 'View and manage your support requests.'}
                    </p>
                </div>
                {role !== 'admin' && (
                    <Link href="/dashboard/change-request">
                        <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl h-12 px-6 shadow-lg shadow-primary/20">
                            <Plus className="w-4 h-4 mr-2" /> New Request
                        </Button>
                    </Link>
                )}
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search tickets..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-11 h-12 bg-white/5 border-white/10 rounded-xl focus:border-primary/50"
                    />
                </div>
                <div className="flex gap-2">
                    {(["all", "open", "closed"] as const).map((status) => (
                        <Button
                            key={status}
                            variant="outline"
                            onClick={() => setFilter(status)}
                            className={`rounded-xl h-12 px-5 capitalize ${filter === status
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-white"
                                }`}
                        >
                            {status}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Loading State */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            ) : filteredTickets.length > 0 ? (
                /* Tickets List */
                <div className="space-y-4">
                    {filteredTickets.map((ticket) => {
                        const status = statusConfig[ticket.status as keyof typeof statusConfig] || statusConfig.open
                        const StatusIcon = status.icon

                        return (
                            <Link
                                href={`/dashboard/tickets/${ticket.id}`}
                                key={ticket.id}
                                className="block"
                            >
                                <div
                                    className="p-5 rounded-2xl bg-[#111111]/80 border border-white/5 backdrop-blur-xl hover:border-white/10 transition-all group cursor-pointer"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="text-xs font-mono text-muted-foreground">TKT-{ticket.id}</span>
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${status.bg} ${status.color}`}>
                                                    <StatusIcon size={12} />
                                                    {status.label}
                                                </span>
                                                <span className={`text-xs font-medium ${priorityColors[ticket.priority] || 'text-muted-foreground'} capitalize`}>
                                                    {ticket.priority}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-semibold text-white group-hover:text-primary transition-colors truncate">
                                                {ticket.subject}
                                            </h3>
                                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                                <span>Created: {formatDate(ticket.created_at || ticket.createdAt || ticket.messages?.[0]?.created_at)}</span>
                                                <span className="flex items-center gap-1">
                                                    <MessageSquare size={14} />
                                                    {ticket.messages?.length || 0} messages
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 md:text-right">
                                            <Button
                                                variant="outline"
                                                className="border-white/10 bg-white/5 text-white hover:bg-white/10 rounded-xl pointer-events-none"
                                            >
                                                View
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            ) : (
                /* Empty State */
                <div className="p-12 rounded-3xl bg-[#111111]/80 border border-white/5 backdrop-blur-xl text-center">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                        <MessageSquare className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">No Tickets Found</h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                        {searchQuery
                            ? "No tickets match your search criteria. Try adjusting your filters."
                            : "You haven't submitted any support tickets yet."}
                    </p>
                    <Link href="/dashboard/change-request">
                        <Button className="bg-white text-black hover:bg-gray-200 rounded-xl h-12 px-6 font-bold">
                            Submit Your First Request
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    )
}
