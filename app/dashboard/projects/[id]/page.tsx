"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    ArrowLeft, MoreHorizontal, Calendar, Users, CheckCircle2, Clock,
    FileText, Download, Edit, Trash2, Archive, ExternalLink
} from "lucide-react"

// Mock project data
const projectData = {
    id: "1",
    title: "E-Learning Platform Revamp",
    client: {
        name: "EduTech Indonesia",
        email: "contact@edutech.id",
    },
    status: "in-progress",
    progress: 65,
    startDate: "Aug 01, 2025",
    endDate: "Oct 24, 2025",
    description: "Complete overhaul of the existing LMS platform with modern UI/UX, improved performance, and new features including video streaming, interactive quizzes, and real-time collaboration tools.",
    team: [
        { name: "Alex", role: "Lead Developer" },
        { name: "Sarah", role: "UI Designer" },
        { name: "Mike", role: "Backend Dev" },
    ],
    timeline: [
        { title: "Project Kickoff", date: "Aug 01", status: "completed" },
        { title: "Design System & UI/UX", date: "Aug 15", status: "completed" },
        { title: "Frontend Development", date: "Sep 10", status: "in-progress" },
        { title: "Backend Integration", date: "Oct 01", status: "pending" },
        { title: "UAT & Testing", date: "Oct 15", status: "pending" },
        { title: "Final Delivery", date: "Oct 24", status: "pending" },
    ],
    files: [
        { name: "UI_Design_System_v2.fig", size: "124 MB", type: "Figma", date: "Aug 20" },
        { name: "SRS_Document_Signed.pdf", size: "2.4 MB", type: "PDF", date: "Aug 05" },
        { name: "Frontend_Build_Alpha.zip", size: "45 MB", type: "ZIP", date: "Sep 15" },
        { name: "API_Documentation.md", size: "156 KB", type: "Markdown", date: "Sep 18" },
    ],
    activities: [
        { action: "Completed Frontend Module 3", user: "Alex", time: "2 hours ago" },
        { action: "Uploaded new design assets", user: "Sarah", time: "5 hours ago" },
        { action: "Fixed payment gateway bug", user: "Mike", time: "1 day ago" },
        { action: "Client reviewed milestone 2", user: "EduTech", time: "2 days ago" },
    ]
}

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
    "pending": { label: "Pending", color: "text-yellow-500", bg: "bg-yellow-500/10 border-yellow-500/20" },
    "in-progress": { label: "In Progress", color: "text-blue-500", bg: "bg-blue-500/10 border-blue-500/20" },
    "review": { label: "Review", color: "text-purple-500", bg: "bg-purple-500/10 border-purple-500/20" },
    "completed": { label: "Completed", color: "text-green-500", bg: "bg-green-500/10 border-green-500/20" },
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
    const [showActions, setShowActions] = useState(false)
    const status = statusConfig[projectData.status]

    return (
        <div className="space-y-8 max-w-7xl mx-auto relative z-10">
            {/* Back Navigation & Actions */}
            <div className="flex items-center justify-between">
                <Link
                    href="/dashboard/projects"
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-white transition-colors group"
                >
                    <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Projects
                </Link>

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
            </div>

            {/* Project Header */}
            <div className="p-8 rounded-3xl bg-[#111111]/80 border border-white/5 backdrop-blur-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="relative z-10 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Badge className={`${status.bg} ${status.color} border px-3 py-1`}>
                                {status.label}
                            </Badge>
                            <span className="text-sm text-muted-foreground">ID: #{projectData.id}</span>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold text-white">{projectData.title}</h1>

                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Users size={16} />
                                <span>{projectData.client.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={16} />
                                <span>{projectData.startDate} - {projectData.endDate}</span>
                            </div>
                        </div>

                        <p className="text-muted-foreground max-w-2xl leading-relaxed">
                            {projectData.description}
                        </p>
                    </div>

                    <div className="lg:text-right space-y-3">
                        <div>
                            <p className="text-sm text-muted-foreground mb-1">Overall Progress</p>
                            <p className="text-4xl font-bold text-white">{projectData.progress}%</p>
                        </div>
                        <div className="w-48 h-3 bg-white/5 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-primary to-blue-500 rounded-full transition-all duration-1000"
                                style={{ width: `${projectData.progress}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Timeline & Activity */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Timeline */}
                    <div className="p-6 md:p-8 rounded-3xl bg-[#111111]/80 border border-white/5 backdrop-blur-xl">
                        <h3 className="text-xl font-bold text-white mb-6">Project Timeline</h3>
                        <div className="space-y-0 relative">
                            <div className="absolute left-[19px] top-2 bottom-6 w-0.5 bg-white/10" />

                            {projectData.timeline.map((item, i) => (
                                <div key={i} className="flex gap-6 relative pb-6 last:pb-0">
                                    <div className={`z-10 w-10 h-10 rounded-full flex items-center justify-center border-4 border-[#111111] transition-colors duration-300 ${item.status === 'completed' ? 'bg-green-500 text-black' :
                                            item.status === 'in-progress' ? 'bg-primary text-white animate-pulse' :
                                                'bg-white/5 text-muted-foreground border-white/10'
                                        }`}>
                                        {item.status === 'completed' ? <CheckCircle2 size={18} /> : <div className="w-2.5 h-2.5 rounded-full bg-current" />}
                                    </div>
                                    <div className="pt-1.5 flex-1">
                                        <div className="flex justify-between mb-1">
                                            <h4 className={`font-semibold ${item.status === 'pending' ? 'text-muted-foreground' : 'text-white'}`}>
                                                {item.title}
                                            </h4>
                                            <span className="text-sm text-muted-foreground font-mono">{item.date}</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground capitalize">{item.status.replace('-', ' ')}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="p-6 md:p-8 rounded-3xl bg-[#111111]/80 border border-white/5 backdrop-blur-xl">
                        <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
                        <div className="space-y-4">
                            {projectData.activities.map((activity, i) => (
                                <div key={i} className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/[0.02] transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white shrink-0">
                                        {activity.user.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-white">
                                            <span className="font-medium">{activity.user}</span>
                                            <span className="text-muted-foreground"> {activity.action}</span>
                                        </p>
                                        <span className="text-xs text-muted-foreground/60">{activity.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Team & Files */}
                <div className="space-y-8">
                    {/* Team */}
                    <div className="p-6 rounded-3xl bg-[#111111]/80 border border-white/5 backdrop-blur-xl">
                        <h3 className="text-lg font-bold text-white mb-4">Team Members</h3>
                        <div className="space-y-3">
                            {projectData.team.map((member, i) => (
                                <div key={i} className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-white font-bold text-sm">
                                        {member.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white">{member.name}</p>
                                        <p className="text-xs text-muted-foreground">{member.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button variant="outline" className="w-full mt-4 border-white/10 bg-transparent hover:bg-white/5 text-white rounded-xl h-10 text-sm">
                            Manage Team
                        </Button>
                    </div>

                    {/* Files */}
                    <div className="p-6 rounded-3xl bg-[#111111]/80 border border-white/5 backdrop-blur-xl">
                        <h3 className="text-lg font-bold text-white mb-4">Project Files</h3>
                        <div className="space-y-2">
                            {projectData.files.map((file, i) => (
                                <div key={i} className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors group flex items-center justify-between">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                                            <FileText size={18} />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-white truncate">{file.name}</p>
                                            <p className="text-xs text-muted-foreground">{file.size} • {file.date}</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Download size={16} />
                                    </Button>
                                </div>
                            ))}
                        </div>
                        <Button variant="outline" className="w-full mt-4 border-white/10 bg-transparent hover:bg-white/5 text-white rounded-xl h-10 text-sm">
                            View All Files
                        </Button>
                    </div>

                    {/* Client Info */}
                    <div className="p-6 rounded-3xl bg-[#111111]/80 border border-white/5 backdrop-blur-xl">
                        <h3 className="text-lg font-bold text-white mb-4">Client Information</h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Company</p>
                                <p className="text-white font-medium">{projectData.client.name}</p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Email</p>
                                <p className="text-white font-medium">{projectData.client.email}</p>
                            </div>
                        </div>
                        <Button className="w-full mt-4 bg-white text-black hover:bg-gray-200 rounded-xl h-10 text-sm font-bold">
                            <ExternalLink size={16} className="mr-2" /> View Client Profile
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
