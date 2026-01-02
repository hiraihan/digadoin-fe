"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, MessageSquare, Clock, CheckCircle2, AlertCircle, Plus } from "lucide-react"

interface Ticket {
    id: string
    subject: string
    status: "open" | "in-progress" | "resolved" | "closed"
    priority: "low" | "medium" | "high" | "critical"
    createdAt: string
    lastReply: string
    messages: number
}

const mockTickets: Ticket[] = [
    {
        id: "TKT-2025-001",
        subject: "Login page not loading on mobile devices",
        status: "open",
        priority: "high",
        createdAt: "Jan 02, 2025",
        lastReply: "2 hours ago",
        messages: 3,
    },
    {
        id: "TKT-2024-042",
        subject: "Request for additional dashboard analytics",
        status: "in-progress",
        priority: "medium",
        createdAt: "Dec 28, 2024",
        lastReply: "1 day ago",
        messages: 7,
    },
    {
        id: "TKT-2024-038",
        subject: "Payment integration not working correctly",
        status: "resolved",
        priority: "critical",
        createdAt: "Dec 20, 2024",
        lastReply: "3 days ago",
        messages: 12,
    },
    {
        id: "TKT-2024-035",
        subject: "Change color scheme for dashboard",
        status: "closed",
        priority: "low",
        createdAt: "Dec 15, 2024",
        lastReply: "1 week ago",
        messages: 5,
    },
]

const statusConfig = {
    "open": { label: "Open", color: "text-blue-500", bg: "bg-blue-500/10 border-blue-500/20", icon: AlertCircle },
    "in-progress": { label: "In Progress", color: "text-yellow-500", bg: "bg-yellow-500/10 border-yellow-500/20", icon: Clock },
    "resolved": { label: "Resolved", color: "text-green-500", bg: "bg-green-500/10 border-green-500/20", icon: CheckCircle2 },
    "closed": { label: "Closed", color: "text-gray-400", bg: "bg-white/5 border-white/10", icon: CheckCircle2 },
}

const priorityColors = {
    low: "text-green-500",
    medium: "text-yellow-500",
    high: "text-orange-500",
    critical: "text-red-500",
}

export default function TicketsPage() {
    const [filter, setFilter] = useState<"all" | "open" | "closed">("all")
    const [searchQuery, setSearchQuery] = useState("")

    const filteredTickets = mockTickets.filter((ticket) => {
        const matchesFilter =
            filter === "all" ||
            (filter === "open" && (ticket.status === "open" || ticket.status === "in-progress")) ||
            (filter === "closed" && (ticket.status === "resolved" || ticket.status === "closed"))

        const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ticket.id.toLowerCase().includes(searchQuery.toLowerCase())

        return matchesFilter && matchesSearch
    })

    return (
        <div className="max-w-5xl mx-auto space-y-8 relative z-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Support Tickets</h1>
                    <p className="text-muted-foreground">View and manage your support requests.</p>
                </div>
                <Link href="/dashboard/change-request">
                    <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl h-12 px-6 shadow-lg shadow-primary/20">
                        <Plus className="w-4 h-4 mr-2" /> New Request
                    </Button>
                </Link>
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

            {/* Tickets List */}
            {filteredTickets.length > 0 ? (
                <div className="space-y-4">
                    {filteredTickets.map((ticket) => {
                        const status = statusConfig[ticket.status]
                        const StatusIcon = status.icon

                        return (
                            <div
                                key={ticket.id}
                                className="p-5 rounded-2xl bg-[#111111]/80 border border-white/5 backdrop-blur-xl hover:border-white/10 transition-all group cursor-pointer"
                            >
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-xs font-mono text-muted-foreground">{ticket.id}</span>
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${status.bg} ${status.color}`}>
                                                <StatusIcon size={12} />
                                                {status.label}
                                            </span>
                                            <span className={`text-xs font-medium ${priorityColors[ticket.priority]} capitalize`}>
                                                {ticket.priority}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-white group-hover:text-primary transition-colors truncate">
                                            {ticket.subject}
                                        </h3>
                                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                            <span>Created: {ticket.createdAt}</span>
                                            <span className="flex items-center gap-1">
                                                <MessageSquare size={14} />
                                                {ticket.messages} messages
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 md:text-right">
                                        <div>
                                            <p className="text-xs text-muted-foreground mb-1">Last Reply</p>
                                            <p className="text-sm text-white font-medium">{ticket.lastReply}</p>
                                        </div>
                                        <Button
                                            variant="outline"
                                            className="border-white/10 bg-white/5 text-white hover:bg-white/10 rounded-xl"
                                        >
                                            View
                                        </Button>
                                    </div>
                                </div>
                            </div>
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
