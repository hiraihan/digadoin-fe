"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Phone, Building, Calendar, Globe, MapPin, Briefcase } from "lucide-react"

interface ClientProfileModalProps {
    isOpen: boolean
    onClose: () => void
    client: {
        name: string
        email: string
        phone: string
        company: string
        role: string
        status: string
        joinedDate?: string
        website?: string
        bio?: string
        stats?: {
            totalProjects: number
            activeProjects: number
            totalSpent: string
        }
    } | null
}

export function ClientProfileModal({ isOpen, onClose, client }: ClientProfileModalProps) {
    if (!client) return null

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .substring(0, 2)
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-[#111111] border-white/10 text-white sm:max-w-2xl">
                <DialogHeader>
                    <div className="flex items-start justify-between">
                        <div>
                            <DialogTitle className="text-xl font-bold">Client Profile</DialogTitle>
                            <DialogDescription className="text-muted-foreground mt-1">
                                Detailed information about the client.
                            </DialogDescription>
                        </div>
                        <Badge
                            variant="outline"
                            className={`${client.status === 'active' ? 'text-green-500 border-green-500/20 bg-green-500/10' : 'text-red-500 border-red-500/20 bg-red-500/10'} capitalize px-3 py-1`}
                        >
                            {client.status}
                        </Badge>
                    </div>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                    {/* Left Column: Avatar & Basic Info */}
                    <div className="md:col-span-1 flex flex-col items-center text-center space-y-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                        <Avatar className="h-24 w-24 border-2 border-white/10 shadow-xl">
                            <AvatarFallback className="bg-gradient-to-br from-primary to-blue-600 text-2xl font-bold text-white">
                                {getInitials(client.name)}
                            </AvatarFallback>
                        </Avatar>

                        <div>
                            <h3 className="text-lg font-bold text-white">{client.name}</h3>
                            <p className="text-sm text-muted-foreground">{client.role}</p>
                        </div>

                        {client.company && (
                            <div className="flex items-center gap-2 text-sm text-white/80 bg-white/5 px-3 py-1.5 rounded-lg w-full justify-center">
                                <Building className="w-4 h-4 text-primary" />
                                <span>{client.company}</span>
                            </div>
                        )}

                        <div className="w-full pt-4 border-t border-white/10">
                            <div className="grid grid-cols-2 gap-2 text-center">
                                <div className="p-2 rounded-lg bg-black/20">
                                    <p className="text-xs text-muted-foreground">Projects</p>
                                    <p className="text-lg font-bold text-white">{client.stats?.totalProjects || 0}</p>
                                </div>
                                <div className="p-2 rounded-lg bg-black/20">
                                    <p className="text-xs text-muted-foreground">Active</p>
                                    <p className="text-lg font-bold text-green-500">{client.stats?.activeProjects || 0}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Detailed Details */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="space-y-4">
                            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Contact Information</h4>

                            <div className="grid gap-3">
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
                                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                        <Mail className="w-4 h-4" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-muted-foreground">Email Address</p>
                                        <p className="text-sm font-medium text-white truncate">{client.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
                                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                        <Phone className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">Phone Number</p>
                                        <p className="text-sm font-medium text-white">{client.phone || "Not provided"}</p>
                                    </div>
                                </div>

                                {client.website && (
                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
                                        <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                            <Globe className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Website</p>
                                            <a href={client.website} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-white hover:underline hover:text-primary">
                                                {client.website}
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {client.bio && (
                            <div className="space-y-2">
                                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">About</h4>
                                <p className="text-sm text-white/80 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">
                                    {client.bio}
                                </p>
                            </div>
                        )}

                        <div className="pt-2 flex justify-end">
                            <Button variant="outline" onClick={onClose} className="border-white/10 hover:bg-white/10 text-white">
                                Close
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
