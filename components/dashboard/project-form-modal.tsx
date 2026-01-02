"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { X, Loader2, Calendar, Users } from "lucide-react"

interface ProjectFormModalProps {
    isOpen: boolean
    onClose: () => void
    mode: "create" | "edit"
    projectData?: {
        title: string
        client: string
        status: string
        description: string
        startDate: string
        endDate: string
    }
}

const statusOptions = [
    { value: "pending", label: "Pending", color: "bg-yellow-500" },
    { value: "in-progress", label: "In Progress", color: "bg-blue-500" },
    { value: "review", label: "Review", color: "bg-purple-500" },
    { value: "completed", label: "Completed", color: "bg-green-500" },
]

const mockClients = [
    "EduTech Indonesia",
    "CoinBase Asia",
    "Logistics Pro",
    "Law Firm Group",
    "Skynet Systems",
]

export function ProjectFormModal({ isOpen, onClose, mode, projectData }: ProjectFormModalProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: projectData?.title || "",
        client: projectData?.client || "",
        status: projectData?.status || "pending",
        description: projectData?.description || "",
        startDate: projectData?.startDate || "",
        endDate: projectData?.endDate || "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setIsLoading(false)
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-lg mx-4 bg-[#111111] border border-white/10 rounded-3xl shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/5">
                    <div>
                        <h2 className="text-xl font-bold text-white">
                            {mode === "create" ? "Create New Project" : "Edit Project"}
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            {mode === "create" ? "Add a new project to your workspace" : "Update project details"}
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

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {/* Project Title */}
                    <div className="space-y-2">
                        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Project Title
                        </Label>
                        <Input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter project title"
                            className="h-12 bg-white/5 border-white/10 focus:border-primary/50 rounded-xl"
                            required
                        />
                    </div>

                    {/* Client Select */}
                    <div className="space-y-2">
                        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Client
                        </Label>
                        <div className="relative">
                            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <select
                                name="client"
                                value={formData.client}
                                onChange={handleChange}
                                className="w-full h-12 pl-10 pr-4 bg-white/5 border border-white/10 focus:border-primary/50 rounded-xl text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20"
                                required
                            >
                                <option value="" disabled className="bg-[#111111]">Select a client</option>
                                {mockClients.map((client) => (
                                    <option key={client} value={client} className="bg-[#111111]">{client}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Status */}
                    <div className="space-y-2">
                        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Status
                        </Label>
                        <div className="grid grid-cols-4 gap-2">
                            {statusOptions.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, status: option.value }))}
                                    className={`p-3 rounded-xl border text-xs font-medium transition-all ${formData.status === option.value
                                            ? "border-primary bg-primary/10 text-white"
                                            : "border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-white"
                                        }`}
                                >
                                    <div className={`w-2 h-2 rounded-full ${option.color} mx-auto mb-1.5`} />
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Date Range */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Start Date
                            </Label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    name="startDate"
                                    type="date"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    className="h-12 pl-10 bg-white/5 border-white/10 focus:border-primary/50 rounded-xl [color-scheme:dark]"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                End Date
                            </Label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    name="endDate"
                                    type="date"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                    className="h-12 pl-10 bg-white/5 border-white/10 focus:border-primary/50 rounded-xl [color-scheme:dark]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Description
                        </Label>
                        <Textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Brief project description..."
                            className="min-h-[100px] bg-white/5 border-white/10 focus:border-primary/50 rounded-xl resize-none"
                        />
                    </div>

                    {/* Actions */}
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
                                "Create Project"
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
