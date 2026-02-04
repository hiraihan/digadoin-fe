"use client"

import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HeroSection } from "@/app/types/content"
import Link from "next/link"

interface HeroProps {
  data: HeroSection
}

// Check if user is authenticated by looking for token
const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false
  const token = localStorage.getItem("token")
  return !!token
}

export function Hero({ data }: HeroProps) {
  const router = useRouter()

  const handleStartProject = () => {
    if (isAuthenticated()) {
      router.push("/dashboard/order")
    } else {
      router.push("/login?redirect=/dashboard/order")
    }
  }

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden pt-24 pb-16">
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 grid-pattern opacity-40"></div>
        <div className="absolute inset-0 mesh-gradient"></div>
        <div className="absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-chart-1/20 rounded-full blur-[150px] opacity-30"></div>
        <div className="absolute right-0 top-0 w-[600px] h-[600px] bg-chart-2/15 rounded-full blur-[120px] opacity-25"></div>
        <div className="absolute left-0 bottom-0 w-[600px] h-[600px] bg-chart-3/15 rounded-full blur-[120px] opacity-25"></div>
      </div>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-16 flex flex-col items-center">
        <div className="flex flex-col items-center text-center space-y-10 max-w-6xl mx-auto">
          <div className="inline-flex items-center rounded-full border border-border/50 bg-card/30 px-4 py-2 text-sm backdrop-blur-xl hover:bg-card/40 transition-colors duration-300">
            <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2.5 animate-pulse"></span>
            <span className="text-xs font-semibold tracking-wider uppercase text-foreground/90">
              {data.badge}
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none text-gradient-primary">
            {data.titleLine1} <br />
            <span className="text-gradient-accent">{data.titleLine2}</span>
          </h1>

          <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light tracking-tight">
            {data.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center pt-4">
            <Button
              size="lg"
              className="h-14 px-10 text-base rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover-glow font-semibold tracking-wide"
              onClick={handleStartProject}
            >
              {data.ctaPrimary} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-14 px-10 text-base rounded-full border-border bg-card/30 hover:bg-card/50 backdrop-blur-sm transition-all duration-300 font-semibold tracking-wide"
            >
              <Link href="#projects">{data.ctaSecondary}</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16 pt-24 w-full max-w-7xl border-t border-border/30 mt-32">
          {data.stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-6 hover:bg-card/20 rounded-2xl transition-all duration-300 group"
            >
              <span className="text-5xl md:text-6xl font-bold text-foreground mb-3 tracking-tight group-hover:text-primary transition-colors">
                {stat.value}
              </span>
              <span className="text-xs md:text-sm text-muted-foreground uppercase tracking-widest font-semibold">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
