"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
    ArrowLeft, MoreHorizontal, Calendar, Users, CheckCircle2, Clock,
    FileText, Download, Edit, Trash2, Archive, ExternalLink,
    Globe, Code, Eye, Rocket, Loader2, MessageSquare, AlertCircle
} from "lucide-react"
import { ProjectTimeline, ProjectStage } from "@/components/project-timeline"
import { projectService } from "@/app/services/projectService"
import { authService } from "@/app/services/authService"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/formatters"
import { toast } from "sonner"

interface ProjectData {
    id: number
    name: string
    subdomain: string
    custom_domain?: string
    stage: ProjectStage
    tier?: string
    description?: string
    createdAt: string
}

const statusConfig: Record<string, { label: string; color: string; bg: string; icon: any }> = {
    "pending": { label: "Menunggu Konfirmasi", color: "text-yellow-500", bg: "bg-yellow-500/10 border-yellow-500/20", icon: Clock },
    "development": { label: "Dalam Pengembangan", color: "text-blue-500", bg: "bg-blue-500/10 border-blue-500/20", icon: Code },
    "review": { label: "Siap Review", color: "text-purple-500", bg: "bg-purple-500/10 border-purple-500/20", icon: Eye },
    "live": { label: "Live / Selesai", color: "text-green-500", bg: "bg-green-500/10 border-green-500/20", icon: Rocket },
    "cancelled": { label: "Cancelled", color: "text-red-500", bg: "bg-red-500/10 border-red-500/20", icon: AlertCircle },
}

export default function ProjectDetailPage() {
    const params = useParams()
    const router = useRouter()
    const projectId = Number(params.id)

    const [project, setProject] = useState<ProjectData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [showActions, setShowActions] = useState(false)
    const [role, setRole] = useState<string>("user")

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get user role
                const user = await authService.getMe()
                setRole(user.role)

                // Get project data
                const data = await projectService.getProject(projectId)
                setProject({
                    id: Number(data.id),
                    name: data.name || data.subdomain || 'Untitled',
                    subdomain: data.subdomain || '',
                    custom_domain: data.custom_domain || undefined,
                    stage: (data.stage?.toLowerCase() || 'pending') as ProjectStage,
                    tier: data.tier,
                    description: data.description,
                    createdAt: data.created_at || new Date().toISOString()
                })
            } catch (err: any) {
                setError(err.message || "Failed to load project")
            } finally {
                setLoading(false)
            }
        }

        if (projectId) {
            fetchData()
        }
    }, [projectId])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
                    <p className="text-muted-foreground">Memuat detail project...</p>
                </div>
            </div>
        )
    }

    if (error || !project) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Card className="max-w-md w-full bg-[#111]/80 border-white/10">
                    <CardContent className="pt-6 text-center">
                        <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
                        <h2 className="text-xl font-bold text-white mb-2">Project Tidak Ditemukan</h2>
                        <p className="text-muted-foreground mb-6">{error}</p>
                        <Link href="/dashboard/projects">
                            <Button>Kembali ke Projects</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        )
    }

    const status = statusConfig[project.stage] || statusConfig.pending
    const StatusIcon = status.icon
    const isAdmin = role === 'admin' || role === 'editor'
    const isClient = role === 'user' || role === 'client'

    return (
        <div className="space-y-8 max-w-7xl mx-auto relative z-10 animate-in fade-in duration-500">
            {/* Back Navigation & Actions */}
            <div className="flex items-center justify-between">
                <Link
                    href="/dashboard/projects"
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-white transition-colors group"
                >
                    <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    Kembali ke Projects
                </Link>

                {isAdmin && (
                    <div className="relative">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setShowActions(!showActions)}
                            className="text-muted-foreground hover:text-white hover:bg-white/5 rounded-xl"
                        >
                            <MoreHorizontal size={20} />
                        </Button>

                        {showActions && (
                            <>
                                <div className="fixed inset-0 z-40" onClick={() => setShowActions(false)} />
                                <div className="absolute right-0 top-full mt-2 w-48 bg-[#111111] border border-white/10 rounded-xl shadow-lg z-50 overflow-hidden animate-in slide-in-from-top-2">
                                    <button className="w-full px-4 py-3 text-left text-sm text-white hover:bg-white/5 flex items-center gap-3 transition-colors">
                                        <Edit size={16} /> Edit Project
                                    </button>
                                    <button className="w-full px-4 py-3 text-left text-sm text-white hover:bg-white/5 flex items-center gap-3 transition-colors">
                                        <Archive size={16} /> Archive
                                    </button>
                                    <button className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-3 transition-colors">
                                        <Trash2 size={16} /> Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* Project Header */}
            <div className="p-8 rounded-3xl bg-[#111111]/80 border border-white/5 backdrop-blur-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="relative z-10 space-y-6">
                    <div className="flex items-center gap-3 flex-wrap">
                        <span className={`inline-flex items-center gap-1.5 ${status.bg} ${status.color} border px-3 py-1 rounded-full text-sm font-medium`}>
                            <StatusIcon className="w-4 h-4" />
                            {status.label}
                        </span>
                        <span className="text-sm text-muted-foreground">ID: #{project.id}</span>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-white">{project.name}</h1>

                    <div className="flex items-center gap-6 text-sm text-muted-foreground flex-wrap">
                        {project.subdomain && (
                            <div className="flex items-center gap-2">
                                <Globe size={16} />
                                <span>{project.subdomain}.digado.in</span>
                            </div>
                        )}
                        {project.custom_domain && (
                            <a
                                href={`https://${project.custom_domain}`}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 text-primary hover:underline"
                            >
                                <ExternalLink size={16} />
                                <span>{project.custom_domain}</span>
                            </a>
                        )}
                        <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            <span>Dibuat {formatDate(project.createdAt)}</span>
                        </div>
                    </div>

                    {project.description && (
                        <p className="text-muted-foreground max-w-2xl leading-relaxed">
                            {project.description}
                        </p>
                    )}
                </div>
            </div>

            {/* Timeline Card - Different for Client vs Admin */}
            <Card className="bg-[#111111]/80 border border-white/5 backdrop-blur-xl">
                <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        Progress Project
                    </CardTitle>
                    <CardDescription>
                        {isClient
                            ? "Pantau status pengembangan project Anda"
                            : "Status pengerjaan project"
                        }
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ProjectTimeline stage={project.stage} />
                </CardContent>
            </Card>

            {/* Actions Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Visit Website */}
                {project.stage === 'live' && (
                    <Card className="bg-[#111111]/80 border border-white/5 hover:border-green-500/30 transition-all">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 rounded-xl bg-green-500/10">
                                    <Rocket className="w-6 h-6 text-green-500" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">Website Live!</h3>
                                    <p className="text-sm text-muted-foreground">Project Anda sudah online</p>
                                </div>
                            </div>
                            <a
                                href={`https://${project.subdomain}.digado.in`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Button className="w-full gap-2">
                                    <Globe className="w-4 h-4" />
                                    Kunjungi Website
                                </Button>
                            </a>
                        </CardContent>
                    </Card>
                )}

                {/* Change Request */}
                {isClient && (
                    <Card className="bg-[#111111]/80 border border-white/5 hover:border-primary/30 transition-all">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 rounded-xl bg-primary/10">
                                    <MessageSquare className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">Ajukan Perubahan</h3>
                                    <p className="text-sm text-muted-foreground">Request revisi atau fitur baru</p>
                                </div>
                            </div>
                            <Link href={`/dashboard/change-request?projectId=${project.id}`}>
                                <Button variant="outline" className="w-full gap-2">
                                    <Edit className="w-4 h-4" />
                                    Buat Request
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                )}

                {/* Support - Hide for Admin */}
                {!isAdmin && (
                    <Card className="bg-[#111111]/80 border border-white/5 hover:border-white/20 transition-all">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 rounded-xl bg-white/5">
                                    <FileText className="w-6 h-6 text-muted-foreground" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">Butuh Bantuan?</h3>
                                    <p className="text-sm text-muted-foreground">Hubungi tim support kami</p>
                                </div>
                            </div>
                            <Link href="/dashboard/support">
                                <Button variant="ghost" className="w-full gap-2">
                                    Buka Support
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Project Info */}
            <Card className="bg-[#111111]/80 border border-white/5">
                <CardHeader>
                    <CardTitle className="text-white">Informasi Project</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex justify-between py-2 border-b border-white/5">
                                <span className="text-muted-foreground">Subdomain</span>
                                <span className="text-white font-medium">
                                    {project.subdomain}.digado.in
                                </span>
                            </div>
                            {project.custom_domain && (
                                <div className="flex justify-between py-2 border-b border-white/5">
                                    <span className="text-muted-foreground">Custom Domain</span>
                                    <span className="text-white font-medium">{project.custom_domain}</span>
                                </div>
                            )}
                            <div className="flex justify-between py-2 border-b border-white/5">
                                <span className="text-muted-foreground">Tier</span>
                                <span className="text-white font-medium">{project.tier || 'Standard'}</span>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between py-2 border-b border-white/5">
                                <span className="text-muted-foreground">Status</span>
                                <span className={status.color}>{status.label}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-white/5">
                                <span className="text-muted-foreground">Dibuat pada</span>
                                <span className="text-white">{formatDate(project.createdAt, 'long')}</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
