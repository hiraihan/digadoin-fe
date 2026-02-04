"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Loader2, User, Building2, Mail, Phone, Lock } from "lucide-react"

interface ClientFormModalProps {
    isOpen: boolean
    onClose: () => void
    mode: "create" | "edit"
    clientData?: {
        name: string
        company: string
        email: string
        phone: string
        status: string
    }
    onSubmit?: (data: any) => Promise<void>
}

const statusOptions = [
    { value: "active", label: "Active", color: "bg-green-500" },
    { value: "inactive", label: "Inactive", color: "bg-red-500" },
    { value: "pending", label: "Pending", color: "bg-yellow-500" },
]

export function ClientFormModal({ isOpen, onClose, mode, clientData, onSubmit }: ClientFormModalProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: clientData?.name || "",
        company: clientData?.company || "",
        email: clientData?.email || "",
        phone: clientData?.phone || "",
        status: clientData?.status || "active",
    })

    useEffect(() => {
        if (isOpen) {
            setFormData({
                name: clientData?.name || "",
                company: clientData?.company || "",
                email: clientData?.email || "",
                phone: clientData?.phone || "",
                status: clientData?.status || "active",
            })
        }
    }, [isOpen, clientData])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            if (onSubmit) {
                await onSubmit(formData)
            } else {
                await new Promise((resolve) => setTimeout(resolve, 1000))
            }
            onClose()
        } catch (error) {
            console.error("Error submitting form:", error)
        } finally {
            setIsLoading(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={onClose}
            />
            <div className="relative w-full max-w-lg mx-4 bg-[#111111] border border-white/10 rounded-3xl shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
                <div className="flex items-center justify-between p-6 border-b border-white/5">
                    <div>
                        <h2 className="text-xl font-bold text-white">
                            {mode === "create" ? "Add New Client" : "Edit Client"}
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            {mode === "create" ? "Add a new client to your directory" : "Update client information"}
                        </p>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="text-muted-foreground hover:text-white hover:bg-white/5 rounded-xl"
                    >
                        <X size={20} />
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div className="space-y-2">
                        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Full Name
                        </Label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className="h-12 pl-10 bg-white/5 border-white/10 focus:border-primary/50 rounded-xl"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Company Name
                        </Label>
                        <div className="relative">
                            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                placeholder="Acme Corporation"
                                className="h-12 pl-10 bg-white/5 border-white/10 focus:border-primary/50 rounded-xl"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Email Address
                        </Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="john@company.com"
                                className="h-12 pl-10 bg-white/5 border-white/10 focus:border-primary/50 rounded-xl"
                                required
                            />
                        </div>
                    </div>

                    {mode === 'create' && (
                        <div className="space-y-2">
                            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Password
                            </Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    name="password"
                                    type="password"
                                    // defaultValue="12345678" // Optional default
                                    onChange={handleChange}
                                    placeholder="Enter password..."
                                    className="h-12 pl-10 bg-white/5 border-white/10 focus:border-primary/50 rounded-xl"
                                    required
                                    minLength={8}
                                />
                            </div>
                            <p className="text-[10px] text-muted-foreground ml-1">
                                Must be at least 8 characters.
                            </p>
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Phone Number
                        </Label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+62 812 3456 7890"
                                className="h-12 pl-10 bg-white/5 border-white/10 focus:border-primary/50 rounded-xl"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Status
                        </Label>
                        <div className="grid grid-cols-3 gap-2">
                            {statusOptions.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, status: option.value }))}
                                    className={`p-3 rounded-xl border text-sm font-medium transition-all flex items-center justify-center gap-2 ${formData.status === option.value
                                        ? "border-primary bg-primary/10 text-white"
                                        : "border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-white"
                                        }`}
                                >
                                    <div className={`w-2 h-2 rounded-full ${option.color}`} />
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="flex-1 h-12 border-white/10 bg-white/5 text-white hover:bg-white/10 rounded-xl"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 h-12 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold shadow-lg shadow-primary/20"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : mode === "create" ? (
                                "Add Client"
                            ) : (
                                "Save Changes"
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
