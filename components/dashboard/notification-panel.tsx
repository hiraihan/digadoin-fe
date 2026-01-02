"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Bell, Check, X, ShoppingBag, Users, DollarSign, MessageSquare, AlertCircle } from "lucide-react"

interface Notification {
    id: string
    type: "project" | "client" | "payment" | "message" | "alert"
    title: string
    description: string
    time: string
    isRead: boolean
}

const mockNotifications: Notification[] = [
    {
        id: "1",
        type: "project",
        title: "New Project Started",
        description: "E-Learning Platform Revamp is now active",
        time: "2m ago",
        isRead: false,
    },
    {
        id: "2",
        type: "client",
        title: "New Client Registered",
        description: "Sarah Connor joined as a new client",
        time: "1h ago",
        isRead: false,
    },
    {
        id: "3",
        type: "payment",
        title: "Payment Received",
        description: "$2,500 from CoinBase Asia",
        time: "3h ago",
        isRead: true,
    },
    {
        id: "4",
        type: "message",
        title: "New Support Message",
        description: "Client requested project update",
        time: "5h ago",
        isRead: true,
    },
    {
        id: "5",
        type: "alert",
        title: "Deadline Approaching",
        description: "LMS Platform due in 3 days",
        time: "1d ago",
        isRead: true,
    },
]

const iconMap = {
    project: ShoppingBag,
    client: Users,
    payment: DollarSign,
    message: MessageSquare,
    alert: AlertCircle,
}

const colorMap = {
    project: "bg-blue-500/10 text-blue-500",
    client: "bg-green-500/10 text-green-500",
    payment: "bg-purple-500/10 text-purple-500",
    message: "bg-primary/10 text-primary",
    alert: "bg-yellow-500/10 text-yellow-500",
}

export function NotificationPanel() {
    const [isOpen, setIsOpen] = useState(false)
    const [notifications, setNotifications] = useState(mockNotifications)

    const unreadCount = notifications.filter(n => !n.isRead).length

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, isRead: true })))
    }

    const markAsRead = (id: string) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, isRead: true } : n
        ))
    }

    return (
        <div className="relative">
            {/* Trigger Button */}
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="text-muted-foreground hover:text-white hover:bg-white/5 rounded-xl relative"
            >
                <Bell size={22} />
                {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#0A0A0A] animate-pulse" />
                )}
            </Button>

            {/* Dropdown Panel */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Panel */}
                    <div className="absolute right-0 top-full mt-2 w-[380px] bg-[#111111] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in slide-in-from-top-2 fade-in duration-200">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-white/5">
                            <div className="flex items-center gap-2">
                                <h3 className="font-bold text-white">Notifications</h3>
                                {unreadCount > 0 && (
                                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                                        {unreadCount} new
                                    </span>
                                )}
                            </div>
                            {unreadCount > 0 && (
                                <button
                                    onClick={markAllAsRead}
                                    className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
                                >
                                    Mark all as read
                                </button>
                            )}
                        </div>

                        {/* Notifications List */}
                        <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                            {notifications.length > 0 ? (
                                <div className="divide-y divide-white/5">
                                    {notifications.map((notification) => {
                                        const Icon = iconMap[notification.type]
                                        const color = colorMap[notification.type]

                                        return (
                                            <div
                                                key={notification.id}
                                                onClick={() => markAsRead(notification.id)}
                                                className={`p-4 flex gap-3 cursor-pointer transition-colors hover:bg-white/[0.02] ${!notification.isRead ? "bg-primary/[0.02]" : ""
                                                    }`}
                                            >
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
                                                    <Icon size={18} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <h4 className={`text-sm font-medium truncate ${!notification.isRead ? "text-white" : "text-muted-foreground"}`}>
                                                            {notification.title}
                                                        </h4>
                                                        {!notification.isRead && (
                                                            <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                                                        {notification.description}
                                                    </p>
                                                    <span className="text-[10px] text-muted-foreground/60 mt-1 block">
                                                        {notification.time}
                                                    </span>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            ) : (
                                /* Empty State */
                                <div className="p-8 text-center">
                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3">
                                        <Bell size={20} className="text-muted-foreground" />
                                    </div>
                                    <p className="text-sm text-muted-foreground">No notifications yet</p>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-3 border-t border-white/5 bg-white/[0.02]">
                            <Button
                                variant="ghost"
                                className="w-full h-10 text-sm text-muted-foreground hover:text-white hover:bg-white/5 rounded-xl"
                            >
                                View all notifications
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
