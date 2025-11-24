import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5"></div>
      <div className="container px-4 md:px-6 relative">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Ready to Launch Your Platform?</h2>
          <p className="text-xl text-muted-foreground mb-10">
            Whether you need a custom LMS, a bustling marketplace, or a unique web application, we have the expertise to
            bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="h-14 px-8 text-lg rounded-full">
              Schedule Consultation
            </Button>
            <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full bg-background">
              View Pricing
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
