import { ShoppingCart, GraduationCap, LayoutTemplate, Smartphone } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ServicesSection } from "@/app/types/content"

// Icon mapping helper
const iconMap: any = {
  GraduationCap: GraduationCap,
  ShoppingCart: ShoppingCart,
  LayoutTemplate: LayoutTemplate,
  Smartphone: Smartphone,
}

interface ServicesGridProps {
  data: ServicesSection
}

export function ServicesGrid({ data }: ServicesGridProps) {
  return (
    <section id="services" className="py-32 md:py-40 bg-background relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20"></div>
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-chart-1/10 rounded-full blur-[150px]"></div>

      <div className="container px-6 md:px-16 max-w-[1600px] mx-auto relative z-10">
        <div className="flex flex-col items-center text-center mb-20">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-gradient-primary">
            {data.title}
          </h2>
          <p className="text-muted-foreground text-xl md:text-2xl max-w-3xl leading-relaxed font-light">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {data.items.map((service, index) => {
            const Icon = iconMap[service.icon] || LayoutTemplate // Fallback icon
            return (
              <Card
                key={index}
                className={`${service.colSpan} glass-card overflow-hidden relative group hover:border-primary/50 transition-all duration-500 hover-lift hover-glow`}
              >
                <CardHeader className="space-y-4 pb-4">
                  <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 ring-1 ring-primary/20 group-hover:ring-primary/40 group-hover:scale-110">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl md:text-3xl text-foreground group-hover:text-primary transition-colors leading-tight">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base md:text-lg leading-relaxed text-muted-foreground group-hover:text-foreground/80 transition-colors">
                    {service.description}
                  </CardDescription>
                </CardContent>
                <div className="absolute -right-16 -bottom-16 h-48 w-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-500"></div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
