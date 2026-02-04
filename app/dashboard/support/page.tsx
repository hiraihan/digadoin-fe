"use client"

import { useState, useEffect } from "react"
import { ticketService, Ticket, CreateTicketDTO } from "@/app/services/ticketService"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { MessageSquare, Send, HelpCircle, Plus, Loader2, ArrowLeft, Clock } from "lucide-react"
import { toast } from "sonner"

export default function SupportPage() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [replyText, setReplyText] = useState("")
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [newTicket, setNewTicket] = useState<CreateTicketDTO>({
    subject: "",
    message: "",
    priority: "medium"
  })

  useEffect(() => {
    loadTickets()
  }, [])

  const loadTickets = async () => {
    setLoading(true)
    try {
      const data = await ticketService.getMyTickets()
      setTickets(data)
    } catch (error) {
      console.error("Failed to load tickets", error)
      toast.error("Could not load tickets")
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTicket.subject || !newTicket.message) return

    setSubmitting(true)
    try {
      const ticket = await ticketService.createTicket(newTicket)
      setTickets(prev => [ticket, ...prev])
      setNewTicket({ subject: "", message: "", priority: "medium" })
      setIsCreateOpen(false)
      toast.success("Ticket created successfully")
    } catch (error) {
      toast.error("Failed to create ticket")
    } finally {
      setSubmitting(false)
    }
  }

  const handleReply = async () => {
    if (!selectedTicket || !replyText.trim()) return

    setSubmitting(true)
    try {
      await ticketService.replyToTicket(selectedTicket.id, { message: replyText })
      // Refresh ticket to get updated messages
      const updated = await ticketService.getTicket(selectedTicket.id)
      setSelectedTicket(updated)
      setTickets(prev => prev.map(t => t.id === updated.id ? updated : t))
      setReplyText("")
      toast.success("Reply sent")
    } catch (error) {
      toast.error("Failed to send reply")
    } finally {
      setSubmitting(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
      case 'answered': return 'bg-green-500/10 text-green-500 border-green-500/20'
      case 'closed': return 'bg-gray-500/10 text-gray-400 border-gray-500/20'
      default: return 'bg-white/10 text-white border-white/20'
    }
  }

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Support Center</h1>
          <p className="text-muted-foreground">Create and track your support tickets.</p>
        </div>

        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" /> New Ticket
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#111111] border-white/10 text-white">
            <DialogHeader>
              <DialogTitle>Create Support Ticket</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateTicket} className="space-y-4">
              <div className="space-y-2">
                <Label>Subject</Label>
                <Input
                  value={newTicket.subject}
                  onChange={e => setNewTicket(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="Brief description of your issue"
                  className="bg-white/5 border-white/10"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Priority</Label>
                <Select
                  value={newTicket.priority}
                  onValueChange={(value) => setNewTicket(prev => ({ ...prev, priority: value as any }))}
                >
                  <SelectTrigger className="w-full bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#111111] border-white/10 text-white">
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Message</Label>
                <Textarea
                  value={newTicket.message}
                  onChange={e => setNewTicket(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Describe your issue in detail..."
                  className="bg-white/5 border-white/10 min-h-[120px]"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
                Submit Ticket
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ticket List */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Your Tickets</h3>

          {loading ? (
            <div className="flex justify-center p-8">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : tickets.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground rounded-2xl bg-[#111111]/80 border border-white/5">
              <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-50" />
              <p>No tickets yet</p>
              <p className="text-sm">Create one to get help</p>
            </div>
          ) : (
            tickets.map(ticket => (
              <button
                key={ticket.id}
                onClick={() => setSelectedTicket(ticket)}
                className={`w-full text-left p-4 rounded-2xl border transition-all ${selectedTicket?.id === ticket.id
                  ? 'bg-primary/10 border-primary/50'
                  : 'bg-[#111111]/80 border-white/5 hover:border-white/10'
                  }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="font-semibold text-white text-sm line-clamp-1">{ticket.subject}</h4>
                  <Badge className={`shrink-0 text-[10px] ${getStatusColor(ticket.status)}`}>
                    {ticket.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock size={12} /> {ticket.created_at ? formatTime(ticket.created_at) : 'Just now'}
                </p>
              </button>
            ))
          )}
        </div>

        {/* Ticket Detail / Chat */}
        <div className="lg:col-span-2">
          {selectedTicket ? (
            <Card className="bg-[#111111]/80 border-white/5 h-full flex flex-col">
              <CardHeader className="border-b border-white/5">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden"
                    onClick={() => setSelectedTicket(null)}
                  >
                    <ArrowLeft size={18} />
                  </Button>
                  <div>
                    <CardTitle className="text-lg">{selectedTicket.subject}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Badge className={`text-[10px] ${getStatusColor(selectedTicket.status)}`}>
                        {selectedTicket.status}
                      </Badge>
                      <span>• {selectedTicket.priority} priority</span>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 p-4 space-y-4 overflow-y-auto max-h-[400px]">
                {selectedTicket.messages?.length > 0 ? (
                  selectedTicket.messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex gap-3 ${msg.sender_id === 1 ? 'justify-end' : ''}`}
                    >
                      <div className={`max-w-[80%] p-4 rounded-2xl ${msg.sender_id === 1
                        ? 'bg-primary/20 rounded-tr-none'
                        : 'bg-white/10 rounded-tl-none'
                        }`}>
                        <p className="text-sm text-white">{msg.message}</p>
                        <span className="text-[10px] text-muted-foreground mt-2 block">
                          {formatTime(msg.created_at)}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    <p>No messages in this ticket</p>
                  </div>
                )}
              </CardContent>

              {selectedTicket.status !== 'closed' && (
                <div className="p-4 border-t border-white/5">
                  <div className="flex gap-2">
                    <Textarea
                      value={replyText}
                      onChange={e => setReplyText(e.target.value)}
                      placeholder="Type your reply..."
                      className="bg-white/5 border-white/10 min-h-[60px] max-h-[100px]"
                    />
                    <Button
                      onClick={handleReply}
                      disabled={!replyText.trim() || submitting}
                      className="shrink-0"
                    >
                      {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send size={18} />}
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          ) : (
            <div className="h-full flex items-center justify-center rounded-3xl bg-[#111111]/80 border border-white/5 min-h-[400px]">
              <div className="text-center text-muted-foreground">
                <HelpCircle className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p>Select a ticket to view details</p>
                <p className="text-sm">or create a new one</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}