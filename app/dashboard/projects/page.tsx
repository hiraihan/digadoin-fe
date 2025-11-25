"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, MoreHorizontal, Calendar, CheckCircle2, Clock, FileText, Download, ChevronRight, User } from "lucide-react"

// --- DATA MOCKUP ---
const adminProjects = [
  { title: "E-Learning Platform Revamp", client: "EduTech Indonesia", status: "In Progress", progress: 65, color: "blue", team: 3 },
  { title: "Crypto Marketplace UI/UX", client: "CoinBase Asia", status: "Review", progress: 90, color: "purple", team: 2 },
  { title: "SaaS Dashboard System", client: "Logistics Pro", status: "Pending", progress: 15, color: "orange", team: 4 },
  { title: "Company Profile Website", client: "Law Firm Group", status: "Completed", progress: 100, color: "green", team: 2 },
]

// Data Proyek Spesifik untuk Client (Detail View)
const clientProject = {
  title: "LMS Platform Development",
  status: "Development Phase",
  progress: 65,
  nextMilestone: "UAT Testing",
  dueDate: "Oct 24, 2025",
  timeline: [
    { title: "Project Kickoff", date: "Aug 01", status: "completed" },
    { title: "Design System & UI/UX", date: "Aug 15", status: "completed" },
    { title: "Frontend Development", date: "Sep 10", status: "in-progress" },
    { title: "Backend Integration", date: "Oct 01", status: "pending" },
    { title: "Final Delivery", date: "Oct 24", status: "pending" },
  ],
  files: [
    { name: "UI_Design_System_v2.fig", size: "124 MB", type: "Figma" },
    { name: "SRS_Document_Signed.pdf", size: "2.4 MB", type: "PDF" },
    { name: "Frontend_Build_Alpha.zip", size: "45 MB", type: "ZIP" },
  ]
}

export default function ProjectsPage() {
  const [role, setRole] = useState("admin")

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole")
    if (storedRole) setRole(storedRole)
  }, [])

  // --- TAMPILAN ADMIN (List View) ---
  if (role === "admin") {
    return (
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Projects Directory</h1>
            <p className="text-muted-foreground">Manage and track your ongoing development projects.</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl h-12 px-6 shadow-lg shadow-primary/20 transition-all">
            <Plus className="mr-2 h-5 w-5" /> New Project
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {adminProjects.map((project, i) => (
            <div key={i} className="group relative p-6 rounded-[22px] bg-[#111111]/80 border border-white/5 backdrop-blur-xl hover:border-white/10 transition-all duration-300 hover:-translate-y-1">
              <div className={`absolute top-0 right-0 w-32 h-32 bg-${project.color}-500/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-${project.color}-500/20 transition-all duration-500`} />
              
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className={`w-6 h-6 rounded-full bg-${project.color}-500/50`} />
                </div>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white rounded-lg"><MoreHorizontal size={20} /></Button>
              </div>

              <div className="mb-6 relative z-10">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-sm text-muted-foreground">{project.client}</p>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-xs"><span className="text-muted-foreground">Progress</span><span className="text-white font-bold">{project.progress}%</span></div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full bg-${project.color}-500 transition-all duration-1000`} style={{ width: `${project.progress}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // --- TAMPILAN CLIENT (Detail View / Portal) ---
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm text-primary font-medium tracking-wider uppercase">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Active Project
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-white">{clientProject.title}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Kolom Kiri: Status & Timeline */}
        <div className="lg:col-span-2 space-y-8">
          {/* Main Progress Card */}
          <div className="p-8 rounded-3xl bg-[#111111]/80 border border-white/5 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Current Phase</p>
                  <h2 className="text-2xl font-bold text-white">{clientProject.status}</h2>
                </div>
                <div className="text-right">
                  <p className="text-muted-foreground text-sm mb-1">Next Milestone</p>
                  <div className="flex items-center gap-2 text-primary font-semibold">
                    <Clock size={18} /> {clientProject.nextMilestone}
                  </div>
                </div>
              </div>
              <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden mb-4">
                <div className="h-full bg-gradient-to-r from-primary to-blue-600 rounded-full relative" style={{ width: `${clientProject.progress}%` }}>
                  <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/50 shadow-[0_0_10px_white]"></div>
                </div>
              </div>
              <p className="text-sm text-right text-muted-foreground">Overall Progress: <span className="text-white font-bold">{clientProject.progress}%</span></p>
            </div>
          </div>

          {/* Timeline */}
          <div className="p-8 rounded-3xl bg-[#111111]/80 border border-white/5 backdrop-blur-xl">
            <h3 className="text-xl font-bold text-white mb-6">Project Roadmap</h3>
            <div className="space-y-0 relative">
              {/* Vertical Line */}
              <div className="absolute left-[19px] top-2 bottom-6 w-0.5 bg-white/10"></div>
              
              {clientProject.timeline.map((item, i) => (
                <div key={i} className="flex gap-6 relative pb-8 last:pb-0 group">
                  <div className={`z-10 w-10 h-10 rounded-full flex items-center justify-center border-4 border-[#111111] transition-colors duration-300 ${
                    item.status === 'completed' ? 'bg-green-500 text-black' :
                    item.status === 'in-progress' ? 'bg-primary text-white animate-pulse' :
                    'bg-white/5 text-muted-foreground border-white/10'
                  }`}>
                    {item.status === 'completed' ? <CheckCircle2 size={18} /> : <div className="w-2.5 h-2.5 rounded-full bg-current" />}
                  </div>
                  <div className="pt-1.5 flex-1">
                    <div className="flex justify-between mb-1">
                      <h4 className={`font-semibold text-lg ${item.status === 'pending' ? 'text-muted-foreground' : 'text-white'}`}>{item.title}</h4>
                      <span className="text-sm text-muted-foreground font-mono">{item.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground capitalize">{item.status.replace('-', ' ')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Files & Team */}
        <div className="space-y-8">
          {/* Deliverables */}
          <div className="p-6 rounded-3xl bg-[#111111]/80 border border-white/5 backdrop-blur-xl">
            <h3 className="text-lg font-bold text-white mb-4">Latest Deliverables</h3>
            <div className="space-y-3">
              {clientProject.files.map((file, i) => (
                <div key={i} className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors group flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                      <FileText size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white line-clamp-1">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{file.size} • {file.type}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                    <Download size={18} />
                  </Button>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 border-white/10 bg-transparent hover:bg-white/5 text-white rounded-xl">
              View All Files
            </Button>
          </div>

          {/* Team Contact */}
          <div className="p-6 rounded-3xl bg-[#111111]/80 border border-white/5 backdrop-blur-xl">
            <h3 className="text-lg font-bold text-white mb-4">Your Dedicated Team</h3>
            <div className="flex items-center -space-x-3 mb-4">
               {[1,2,3].map((_,i) => (
                 <div key={i} className="w-10 h-10 rounded-full border-2 border-[#111111] bg-white/10 relative hover:z-10 hover:scale-110 transition-transform"></div>
               ))}
            </div>
            <p className="text-sm text-muted-foreground mb-4">Need help? Contact your project manager directly.</p>
            <Button className="w-full bg-white text-black hover:bg-gray-200 rounded-xl font-bold">
              Chat with PM
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}