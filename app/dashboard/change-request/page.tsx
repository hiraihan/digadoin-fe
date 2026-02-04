"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
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
import { AlertCircle, Bug, Sparkles, Palette, HelpCircle, Upload, X, Loader2, CheckCircle2, FolderOpen } from "lucide-react"
import { toast } from "sonner"
import { projectService } from "@/app/services/projectService"

interface ProjectOption {
    id: number | string
    name: string
    stage: string
}

const requestTypes = [
    { value: "bug", label: "Bug Fix", icon: Bug, color: "text-red-500", bg: "bg-red-500/10 border-red-500/20" },
    { value: "feature", label: "New Feature", icon: Sparkles, color: "text-blue-500", bg: "bg-blue-500/10 border-blue-500/20" },
    { value: "design", label: "Design Change", icon: Palette, color: "text-purple-500", bg: "bg-purple-500/10 border-purple-500/20" },
    { value: "other", label: "Other", icon: HelpCircle, color: "text-gray-400", bg: "bg-white/5 border-white/10" },
]

const priorityLevels = [
    { value: "low", label: "Low", color: "text-green-500", bg: "bg-green-500/10 border-green-500/20" },
    { value: "medium", label: "Medium", color: "text-yellow-500", bg: "bg-yellow-500/10 border-yellow-500/20" },
    { value: "high", label: "High", color: "text-orange-500", bg: "bg-orange-500/10 border-orange-500/20" },
    { value: "critical", label: "Critical", color: "text-red-500", bg: "bg-red-500/10 border-red-500/20" },
]

import { Suspense } from "react"

function ChangeRequestContent() {
    const searchParams = useSearchParams()
    const projectIdParam = searchParams.get("projectId")

    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [files, setFiles] = useState<File[]>([])
    const [projects, setProjects] = useState<ProjectOption[]>([])
    const [loadingProjects, setLoadingProjects] = useState(true)

    const [formData, setFormData] = useState({
        projectId: projectIdParam || "",
        type: "bug",
        priority: "medium",
        subject: "",
        description: "",
    })

    // Fetch user's projects on mount
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const myProjects = await projectService.getMyProjects()
                setProjects(myProjects.map(p => ({
                    id: p.id,
                    name: p.name || p.subdomain || `Project #${p.id}`,
                    stage: p.stage || 'pending'
                })))
            } catch (error) {
                console.error("Failed to fetch projects:", error)
            } finally {
                setLoadingProjects(false)
            }
        }
        fetchProjects()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files))
        }
    }

    const removeFile = (index: number) => {
        setFiles(files.filter((_, i) => i !== index))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.projectId) {
            toast.error("Please select a project")
            return
        }

        if (!formData.subject || !formData.description) {
            toast.error("Please fill in all required fields")
            return
        }

        setIsLoading(true)
        try {
            // Import ticket service dynamically
            const { ticketService } = await import("@/app/services/ticketService")

            // Include project info in subject/description
            const selectedProject = projects.find(p => String(p.id) === formData.projectId)

            await ticketService.createTicket({
                subject: formData.subject,
                message: `Project: ${selectedProject?.name} (ID: ${formData.projectId})\nType: ${formData.type}\n\n${formData.description}`,
                priority: formData.priority as "low" | "medium" | "high",
                request_type: formData.type,
                project_id: Number(formData.projectId)
            })

            setIsSubmitted(true)
            toast.success("Request Submitted!", {
                description: "We'll review your request and get back to you soon."
            })
        } catch (error: any) {
            console.error("Create ticket error:", error)
            toast.error(error.message || "Failed to submit request")
        } finally {
            setIsLoading(false)
        }
    }

    if (isSubmitted) {
        return (
            <div className="max-w-2xl mx-auto relative z-10">
                <div className="p-8 md:p-12 rounded-3xl bg-[#111111]/80 border border-white/5 backdrop-blur-xl text-center">
                    <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">Request Submitted!</h1>
                    <p className="text-muted-foreground mb-6">
                        Your change request has been submitted successfully. Our team will review it and get back to you within 24-48 hours.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Button
                            onClick={() => {
                                setIsSubmitted(false)
                                setFormData({ projectId: "", type: "bug", priority: "medium", subject: "", description: "" })
                                setFiles([])
                            }}
                            variant="outline"
                            className="border-white/10 bg-white/5 text-white hover:bg-white/10 rounded-xl h-12 px-6"
                        >
                            Submit Another
                        </Button>
                        <Button
                            className="bg-white text-black hover:bg-gray-200 rounded-xl h-12 px-6 font-bold"
                            onClick={() => window.location.href = '/dashboard/tickets'}
                        >
                            View My Tickets
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-3xl mx-auto space-y-8 relative z-10">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Submit Change Request</h1>
                <p className="text-muted-foreground">Request a revision, report a bug, or suggest a new feature for your project.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Project Selection */}
                <div className="p-6 md:p-8 rounded-3xl bg-[#111111]/80 border border-white/5 backdrop-blur-xl">
                    <Label className="text-sm font-semibold text-white mb-4 block">
                        <FolderOpen className="w-4 h-4 inline mr-2" />
                        Select Project *
                    </Label>
                    {loadingProjects ? (
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Loading your projects...
                        </div>
                    ) : projects.length === 0 ? (
                        <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-500">
                            You don't have any projects yet. Please wait for your order to be processed.
                        </div>
                    ) : (
                        <Select
                            value={formData.projectId}
                            onValueChange={(value) => setFormData(prev => ({ ...prev, projectId: value }))}
                        >
                            <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl">
                                <SelectValue placeholder="Choose a project to request changes for" />
                            </SelectTrigger>
                            <SelectContent>
                                {projects.map((project) => (
                                    <SelectItem key={project.id} value={String(project.id)}>
                                        <div className="flex items-center gap-2">
                                            <span>{project.name}</span>
                                            <span className="text-xs text-muted-foreground capitalize">({project.stage})</span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                </div>

                {/* Request Type */}
                <div className="p-6 md:p-8 rounded-3xl bg-[#111111]/80 border border-white/5 backdrop-blur-xl">
                    <Label className="text-sm font-semibold text-white mb-4 block">Request Type</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {requestTypes.map((type) => {
                            const Icon = type.icon
                            const isSelected = formData.type === type.value
                            return (
                                <button
                                    key={type.value}
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, type: type.value }))}
                                    className={`p-4 rounded-2xl border text-center transition-all ${isSelected
                                        ? `${type.bg} ${type.color} border-current`
                                        : "border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-white"
                                        }`}
                                >
                                    <Icon className="w-6 h-6 mx-auto mb-2" />
                                    <span className="text-sm font-medium">{type.label}</span>
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Priority & Subject */}
                <div className="p-6 md:p-8 rounded-3xl bg-[#111111]/80 border border-white/5 backdrop-blur-xl space-y-6">
                    <div className="space-y-3">
                        <Label className="text-sm font-semibold text-white">Priority Level</Label>
                        <div className="flex gap-2">
                            {priorityLevels.map((priority) => {
                                const isSelected = formData.priority === priority.value
                                return (
                                    <button
                                        key={priority.value}
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, priority: priority.value }))}
                                        className={`flex-1 py-2.5 px-4 rounded-xl border text-sm font-medium transition-all ${isSelected
                                            ? `${priority.bg} ${priority.color} border-current`
                                            : "border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10"
                                            }`}
                                    >
                                        {priority.label}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-semibold text-white">Subject *</Label>
                        <Input
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="Brief summary of your request"
                            className="h-12 bg-white/5 border-white/10 focus:border-primary/50 rounded-xl"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-semibold text-white">Description *</Label>
                        <Textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Provide detailed information about your request. Include steps to reproduce if reporting a bug."
                            className="min-h-[150px] bg-white/5 border-white/10 focus:border-primary/50 rounded-xl resize-none"
                            required
                        />
                    </div>
                </div>

                {/* File Attachments */}
                <div className="p-6 md:p-8 rounded-3xl bg-[#111111]/80 border border-white/5 backdrop-blur-xl">
                    <Label className="text-sm font-semibold text-white mb-4 block">Attachments (Optional)</Label>

                    <label className="block cursor-pointer">
                        <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 text-center hover:border-primary/50 hover:bg-primary/5 transition-all">
                            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                            <p className="text-sm text-muted-foreground mb-1">Drag and drop files here, or click to browse</p>
                            <p className="text-xs text-muted-foreground/60">PNG, JPG, PDF, ZIP up to 10MB each</p>
                        </div>
                        <input
                            type="file"
                            multiple
                            onChange={handleFileChange}
                            className="hidden"
                            accept=".png,.jpg,.jpeg,.pdf,.zip"
                        />
                    </label>

                    {files.length > 0 && (
                        <div className="mt-4 space-y-2">
                            {files.map((file, index) => (
                                <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                                            <Upload size={18} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-white">{file.name}</p>
                                            <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                                        </div>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeFile(index)}
                                        className="text-muted-foreground hover:text-red-400 hover:bg-red-500/10"
                                    >
                                        <X size={16} />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Submit */}
                <div className="flex justify-end gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        className="border-white/10 bg-white/5 text-white hover:bg-white/10 rounded-xl h-12 px-6"
                        onClick={() => window.history.back()}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={isLoading || projects.length === 0}
                        className="bg-primary hover:bg-primary/90 text-white rounded-xl h-12 px-8 font-bold shadow-lg shadow-primary/20"
                    >
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit Request"}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default function ChangeRequestPage() {
    return (
        <Suspense fallback={<div className="p-8 text-center">Loading form...</div>}>
            <ChangeRequestContent />
        </Suspense>
    )
}
