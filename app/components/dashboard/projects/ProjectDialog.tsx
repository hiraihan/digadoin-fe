"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { X, Loader2 } from "lucide-react"
import { CreateProjectDTO, UpdateProjectDTO, Project, ProjectStatus } from "@/app/types"

interface ProjectDialogProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: CreateProjectDTO | UpdateProjectDTO) => Promise<void>
    project?: Project | null // if present, in "Edit" mode
}

export function ProjectDialog({ isOpen, onClose, onSubmit, project }: ProjectDialogProps) {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState<Partial<Project>>({
        name: "",
        domain: "",
        tier: "",
        description: "",
        status: ProjectStatus.PENDING,
    })

    // Reset or populate form when opening
    useEffect(() => {
        if (isOpen) {
            if (project) {
                setFormData({
                    name: project.name,
                    domain: project.domain || "",
                    tier: project.tier || "",
                    description: project.description || "",
                    status: project.status,
                })
            } else {
                setFormData({
                    name: "",
                    domain: "",
                    tier: "",
                    description: "",
                    status: ProjectStatus.PENDING,
                })
            }
        }
    }, [isOpen, project])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            // Basic validation
            if (!formData.name || !formData.tier) {
                // In a real app, show validation error
                setLoading(false)
                return
            }

            await onSubmit(formData as CreateProjectDTO | UpdateProjectDTO)
            onClose()
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    if (!isOpen) return null

    const isEdit = !!project

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-lg mx-4 bg-[#111111] border border-white/10 rounded-2xl shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 p-6 max-h-[90vh] overflow-y-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">
                        {isEdit ? "Edit Project" : "Create New Project"}
                    </h2>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="text-muted-foreground hover:text-white hover:bg-white/10 rounded-xl"
                    >
                        <X size={20} />
                    </Button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Project Name <span className="text-red-500">*</span></Label>
                        <Input
                            id="name"
                            placeholder="e.g. Corporate Website"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="tier">Tier <span className="text-red-500">*</span></Label>
                            <Select
                                value={formData.tier}
                                onValueChange={(val) => setFormData({ ...formData, tier: val })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Tier" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Basic">Basic</SelectItem>
                                    <SelectItem value="Professional">Professional</SelectItem>
                                    <SelectItem value="Enterprise">Enterprise</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        {isEdit && (
                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Select
                                    value={formData.status}
                                    onValueChange={(val) => setFormData({ ...formData, status: val as ProjectStatus })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.values(ProjectStatus).map((s) => (
                                            <SelectItem key={s} value={s}>{s.replace("_", " ")}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="domain">Domain (Optional)</Label>
                        <Input
                            id="domain"
                            placeholder="example.com"
                            value={formData.domain}
                            onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description (Optional)</Label>
                        <Textarea
                            id="description"
                            placeholder="Brief details about the project..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="resize-none h-24"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={loading}
                            className="h-11 border-white/10 bg-white/5 text-white hover:bg-white/10 rounded-xl"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="h-11 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isEdit ? "Save Changes" : "Create Project")}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
