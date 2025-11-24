import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { TechStack } from "@/components/tech-stack"
import { ServicesGrid } from "@/components/services-grid"
import { ProjectsShowcase } from "@/components/projects-showcase"
import { Process } from "@/components/process"
import { Pricing } from "@/components/pricing"
import { FAQSection } from "@/components/faq-section"
import { Testimonials } from "@/components/testimonials"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/20 page-transition">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TechStack />
        <ServicesGrid />
        <ProjectsShowcase />
        <Process />
        <Pricing />
        <Testimonials />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
