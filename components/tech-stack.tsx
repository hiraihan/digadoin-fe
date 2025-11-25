import React from "react"
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiSupabase,
  SiStripe,
  SiVercel,
  SiPostgresql,
  SiFramer,
  SiZod,
  SiReacthookform,
  SiRadixui,
  SiNodedotjs,
  SiPrisma,
  SiDocker,
  SiGithub,
} from "react-icons/si"

const techs = [
  // --- Baris 1 ---
  { name: "Next.js 15", icon: SiNextdotjs, color: "#ffffff" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  
  // --- Baris 2 ---
  { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
  { name: "Stripe", icon: SiStripe, color: "#635BFF" },
  { name: "Vercel", icon: SiVercel, color: "#ffffff" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },

  // --- Baris 3 ---
  { name: "Framer Motion", icon: SiFramer, color: "#0055FF" },
  { name: "Zod", icon: SiZod, color: "#3E67B1" },
  { name: "React Hook Form", icon: SiReacthookform, color: "#EC5990" },
  { name: "Radix UI", icon: SiRadixui, color: "#ffffff" },

  // --- Baris 4 ---
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Prisma", icon: SiPrisma, color: "#ffffff" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "GitHub", icon: SiGithub, color: "#ffffff" },
]

export function TechStack() {
  return (
    <section className="py-32 bg-black relative overflow-hidden">
      {/* Background Ambient Lights (Apple Style) */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none opacity-50" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none opacity-50" />
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-[0.03]"></div>

      <div className="container px-6 md:px-16 max-w-[1200px] mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-4">
            <span className="text-xs font-bold text-white/70 tracking-[0.2em] uppercase">
              Technology Stack
            </span>
          </div>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Built for <span className="text-gradient-primary">Performance</span>
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
            Kami menggunakan teknologi modern terbaik untuk memastikan aplikasi Anda cepat, aman, dan mudah dikembangkan.
          </p>
        </div>

        {/* Grid Layout 4x4 - Apple Bento Style */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {techs.map((tech) => (
            <div
              key={tech.name}
              className="group relative flex flex-col items-center justify-center gap-5 p-8 rounded-3xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 transition-all duration-500 cursor-default overflow-hidden"
              style={{ "--hover-color": tech.color } as React.CSSProperties}
            >
              {/* Glow Effect saat Hover (Background Light) */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--hover-color)]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Glow Spot di tengah */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[var(--hover-color)]/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Icon Container */}
              <div className="relative z-10 p-4 rounded-2xl bg-white/5 border border-white/5 shadow-lg group-hover:scale-110 transition-transform duration-500 group-hover:border-[var(--hover-color)]/30">
                <tech.icon 
                  className="w-8 h-8 md:w-10 md:h-10 text-white/40 transition-all duration-300 group-hover:text-[var(--hover-color)]" 
                />
              </div>
              
              {/* Name Label */}
              <span className="relative z-10 text-sm font-medium text-white/40 tracking-wide transition-colors duration-300 group-hover:text-white">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}