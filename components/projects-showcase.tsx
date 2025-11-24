import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ExternalLink, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const projects = [
  {
    title: "EduPrime LMS",
    category: "Learning Management System",
    image: "/modern-lms-dashboard-dark-mode.jpg",
    description:
      "Platform pembelajaran komprehensif dengan fitur live class, kuis interaktif, dan sertifikat otomatis.",
    tags: ["Next.js", "Supabase", "Live Streaming"],
  },
  {
    title: "MarketHub Pro",
    category: "E-Commerce Marketplace",
    image: "/ecommerce-marketplace-ui-design.jpg",
    description: "Marketplace multi-vendor dengan sistem pembayaran terintegrasi dan manajemen stok real-time.",
    tags: ["React", "Node.js", "Payment Gateway"],
  },
  {
    title: "TechCorp Profile",
    category: "Company Profile",
    image: "/modern-corporate-website.png",
    description: "Website korporat futuristik dengan animasi 3D dan performa SEO tinggi.",
    tags: ["Framer Motion", "WebGL", "SEO"],
  },
  {
    title: "HealthCare App",
    category: "Custom Web App",
    image: "/healthcare-dashboard-app.jpg",
    description: "Aplikasi manajemen pasien dan rekam medis elektronik yang aman dan compliant.",
    tags: ["TypeScript", "PostgreSQL", "Security"],
  },
]

export function ProjectsShowcase() {
  return (
    <section id="projects" className="py-32 md:py-40 bg-background relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20"></div>
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-chart-1/10 rounded-full blur-[150px]"></div>
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-chart-3/10 rounded-full blur-[150px]"></div>

      <div className="container px-6 md:px-16 max-w-[1600px] mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-gradient-primary">Karya Terbaik Kami</h2>
          <p className="text-muted-foreground text-xl md:text-2xl leading-relaxed font-light">
            Lihat bagaimana kami membantu bisnis bertransformasi melalui solusi digital yang inovatif dan scalable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative rounded-3xl overflow-hidden border border-border/50 glass-panel hover:border-primary/50 transition-all duration-500 hover-lift hover-glow"
            >
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
              </div>

              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="space-y-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {project.tags.map((tag, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="bg-primary/10 text-primary border-primary/20 backdrop-blur-sm"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-primary/80 tracking-wider uppercase">{project.category}</p>
                    <h3 className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-muted-foreground leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all text-base">
                    {project.description}
                  </p>

                  <Button
                    size="lg"
                    className="w-fit gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 hover-glow rounded-full"
                  >
                    View Case Study <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="absolute -right-20 -bottom-20 h-64 w-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-500"></div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button
            size="lg"
            variant="outline"
            className="gap-2 glass-card hover:border-primary/50 transition-all hover-glow rounded-full px-8 bg-transparent"
          >
            Lihat Semua Portfolio <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
