"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { ticketService, Ticket } from "@/app/services/ticketService"
import { toast } from "sonner"
import { Loader2, ArrowLeft, Send, User, ShieldCheck, Clock, CheckCircle2, AlertCircle, FileText, Lock, Zap } from "lucide-react"
import { format } from "date-fns"
import { useAuth } from "@/app/hooks/useAuth"
import { TicketSidebar } from "@/app/components/dashboard/tickets/TicketSidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const statusConfig = {
    "open": { label: "Open", color: "text-blue-500", bg: "bg-blue-500/10 border-blue-500/20", icon: AlertCircle },
    "answered": { label: "Answered", color: "text-yellow-500", bg: "bg-yellow-500/10 border-yellow-500/20", icon: Clock },
    "closed": { label: "Closed", color: "text-gray-400", bg: "bg-white/5 border-white/10", icon: CheckCircle2 },
}

const MACROS = [
    { label: "Check status...", text: "" },
    { label: "Payment Received", text: "We have confirmed your payment. Your project is now being processed." },
    { label: "Need Access", text: "Could you please provide access credentials so we can investigate further?" },
    { label: "Closing Ticket", text: "We haven't heard back in a while. I'll go ahead and close this ticket for now. Feel free to obtain it if you need more help." },
    { label: "On It", text: "We are looking into this issue right away. Will update you shortly." }
]

export default function TicketDetailPage() {
    const params = useParams()
    const router = useRouter()
    const { user } = useAuth()
    const [ticket, setTicket] = useState<Ticket | null>(null)
    const [loading, setLoading] = useState(true)
    const [replying, setReplying] = useState(false)
    const [replyMessage, setReplyMessage] = useState("")
    const [replyMode, setReplyMode] = useState<"public" | "internal">("public")
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const ticketId = Number(params.id)
    const isAdmin = user?.role === 'admin' || user?.role === 'editor'

    const fetchTicket = async () => {
        try {
            const data = await ticketService.getTicket(ticketId)
            setTicket(data)
        } catch (error: any) {
            console.error("Failed to fetch ticket:", error)
            toast.error("Failed to load ticket details")
            router.push("/dashboard/tickets")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (ticketId) fetchTicket()
    }, [ticketId])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [ticket?.messages])

    const handleReply = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!replyMessage.trim()) return

        if (replyMode === 'internal') {
            toast.success("Internal note added (Simulated)")
            setReplyMessage("")
            return
        }

        setReplying(true)
        try {
            await ticketService.replyToTicket(ticketId, { message: replyMessage })
            toast.success("Reply sent successfully")
            setReplyMessage("")
            fetchTicket() // Refresh messages
        } catch (error: any) {
            toast.error(error.message || "Failed to send reply")
        } finally {
            setReplying(false)
        }
    }

    const handleMacroChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const text = e.target.value
        if (text) setReplyMessage(prev => prev ? prev + "\n" + text : text)
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        )
    }

    const safeFormatDate = (dateStr?: string | Date) => {
        if (!dateStr) return "N/A"
        try {
            return format(new Date(dateStr), "MMM d, yyyy HH:mm")
        } catch {
            return "Invalid Date"
        }
    }

    if (!ticket) return null

    const status = statusConfig[ticket.status as keyof typeof statusConfig] || statusConfig.open
    const StatusIcon = status.icon

    return (
        <div className="max-w-[1600px] mx-auto pb-8">
            {/* Breadcrumbs */}
            <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                <span className="hover:text-white cursor-pointer" onClick={() => router.push("/dashboard")}>Dashboard</span>
                <span>/</span>
                <span className="hover:text-white cursor-pointer" onClick={() => router.push("/dashboard/tickets")}>Tickets</span>
                <span>/</span>
                <span className="text-white">#{ticketId}</span>
            </div>

            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full hover:bg-white/10">
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                        {ticket.subject}
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${status.bg} ${status.color}`}>
                            <StatusIcon size={12} />
                            {status.label}
                        </span>
                    </h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        Ticket ID: #{ticket.id} • Created {safeFormatDate(ticket.created_at)}
                    </p>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Main Chat Area */}
                <div className="flex-1 flex flex-col min-h-[600px] relative">
                    <div className="flex-1 space-y-6 pb-40">
                        {ticket.messages?.map((msg, index) => {
                            const isMe = msg.sender_id === user?.id
                            // Basic logic for support identification
                            const isSupport = msg.sender_id !== ticket.user_id && msg.sender_id !== 0

                            return (
                                <div key={index} className={`flex gap-4 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isSupport ? "bg-primary/20 text-primary" : "bg-white/10 text-white"}`}>
                                        {isSupport ? <ShieldCheck size={20} /> : <User size={20} />}
                                    </div>
                                    <div className={`flex flex-col max-w-[85%] ${isMe ? "items-end" : "items-start"}`}>
                                        <div className={`p-5 rounded-2xl shadow-sm ${isMe
                                            ? "bg-primary text-white rounded-tr-none"
                                            : "bg-[#111111] border border-white/10 text-gray-200 rounded-tl-none"
                                            }`}>
                                            <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.message}</p>
                                        </div>
                                        <span className="text-xs text-muted-foreground mt-1 px-1">
                                            {isSupport ? "Support Team" : (isMe ? "You" : "User")} • {safeFormatDate(msg.created_at)}
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Enhanced Reply Input */}
                    <Card className="absolute bottom-0 left-0 right-0 bg-[#09090b] border border-white/10 shadow-2xl z-20 overflow-hidden">
                        <Tabs value={replyMode} onValueChange={(v: any) => setReplyMode(v)} className="w-full">
                            <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5">
                                <TabsList className="h-8 bg-black/20">
                                    <TabsTrigger value="public" className="text-xs px-3 h-6 data-[state=active]:bg-primary data-[state=active]:text-white">
                                        <FileText className="w-3 h-3 mr-1.5" /> Public Reply
                                    </TabsTrigger>
                                    {isAdmin && (
                                        <TabsTrigger value="internal" className="text-xs px-3 h-6 data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-500">
                                            <Lock className="w-3 h-3 mr-1.5" /> Internal Note
                                        </TabsTrigger>
                                    )}
                                </TabsList>

                                {isAdmin && (
                                    <div className="flex items-center gap-2">
                                        <Zap className="w-3.5 h-3.5 text-yellow-400" />
                                        <select
                                            className="bg-transparent text-xs text-muted-foreground focus:outline-none cursor-pointer hover:text-white"
                                            onChange={handleMacroChange}
                                            value=""
                                        >
                                            <option value="" disabled>Insert Macro...</option>
                                            {MACROS.map((m, i) => (
                                                <option key={i} value={m.text} className="bg-black text-white">{m.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>

                            <TabsContent value="public" className="p-4 m-0">
                                <div className="flex gap-4">
                                    <Textarea
                                        value={replyMessage}
                                        onChange={(e) => setReplyMessage(e.target.value)}
                                        placeholder="Type your reply..."
                                        className="min-h-[80px] bg-transparent border-0 focus-visible:ring-0 p-0 resize-none"
                                    />
                                    <Button
                                        onClick={handleReply}
                                        disabled={replying || !replyMessage.trim()}
                                        className="bg-primary hover:bg-primary/90 text-white h-10 w-10 p-0 rounded-full shrink-0 self-end mb-1"
                                    >
                                        {replying ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                                    </Button>
                                </div>
                            </TabsContent>
                            <TabsContent value="internal" className="p-4 m-0 bg-yellow-500/5">
                                <div className="flex gap-4">
                                    <Textarea
                                        value={replyMessage}
                                        onChange={(e) => setReplyMessage(e.target.value)}
                                        placeholder="Add an internal note visible only to staff..."
                                        className="min-h-[80px] bg-transparent border-0 focus-visible:ring-0 p-0 resize-none text-yellow-200 placeholder:text-yellow-500/50"
                                    />
                                    <Button
                                        onClick={handleReply}
                                        disabled={replying || !replyMessage.trim()}
                                        className="bg-yellow-600 hover:bg-yellow-700 text-white h-10 w-10 p-0 rounded-full shrink-0 self-end mb-1"
                                    >
                                        <Lock className="w-4 h-4" />
                                    </Button>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </Card>
                </div>

                {/* Context Sidebar - Admin Only */}
                {isAdmin && (
                    <div className="hidden lg:block w-[320px] shrink-0">
                        <div className="sticky top-6">
                            <TicketSidebar
                                userId={ticket.user_id}
                                tickeId={ticket.id}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
