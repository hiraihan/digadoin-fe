"use client"

import { useState, useEffect } from "react"
import { Hero } from "@/components/hero"
import { TechStack } from "@/components/tech-stack"
import { ServicesGrid } from "@/components/services-grid"
import { ProjectsShowcase } from "@/components/projects-showcase"
import { Process } from "@/components/process"
import { Pricing } from "@/components/pricing"
import { FAQSection } from "@/components/faq-section"
import { Testimonials } from "@/components/testimonials"
import { ContactSection } from "@/components/contact-section"
import { TeamSection } from "@/components/team-section"
import { contentService } from "@/app/services/contentService"
import { LandingPageContent, initialContent } from "@/app/types/content"
import { Loader2 } from "lucide-react"

export default function Home() {
  const [content, setContent] = useState<LandingPageContent | null>(null)

  useEffect(() => {
    contentService.get().then(setContent).catch(() => setContent(initialContent))
  }, [])

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/20 page-transition">
      <main className="flex-1">
        <Hero data={content.hero} />
        <TechStack />
        <ServicesGrid data={content.services} />
        <ProjectsShowcase data={content.projects} />
        <Process />
        <Pricing />
        <Testimonials data={content.testimonials} />
        <FAQSection data={content.faq} />
        <TeamSection />
        <ContactSection />
      </main>
    </div>
  )
}
