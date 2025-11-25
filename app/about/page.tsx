import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Target, Zap, Globe, Award, Code, Rocket } from "lucide-react"

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-40 pb-24 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 grid-pattern opacity-40"></div>
        <div className="absolute inset-0 -z-10 mesh-gradient"></div>
        <div className="container px-6 md:px-12 max-w-[1400px] mx-auto">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-sm font-medium text-primary backdrop-blur-sm">
              About NexusDev
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-balance">
              Building Digital
              <br />
              <span className="text-gradient-accent">Excellence</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
              A team of visionary developers and designers dedicated to transforming businesses through cutting-edge
              digital solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 md:py-24 border-y border-border/40 glass-panel">
        <div className="container px-6 md:px-12 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-16 md:gap-20">
            {[
              { label: "Projects Delivered", value: "150+", icon: Rocket },
              { label: "Happy Clients", value: "100+", icon: Users },
              { label: "Team Experts", value: "25+", icon: Award },
              { label: "Years Experience", value: "8+", icon: Code },
            ].map((stat, i) => (
              <div key={i} className="text-center space-y-4 group">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 mb-2">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-5xl md:text-6xl font-bold text-foreground tracking-tight tabular-nums">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-muted-foreground font-medium tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 md:py-32">
        <div className="container px-6 md:px-12 max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 lg:gap-24">
            {/* Left Column - Mission & Vision */}
            <div className="space-y-16">
              <div className="space-y-6">
                <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary backdrop-blur-sm">
                  <Target className="mr-2 h-4 w-4" />
                  Our Mission
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
                  Empowering Growth Through Innovation
                </h2>
                <p className="text-muted-foreground text-lg md:text-xl leading-relaxed font-light">
                  We democratize access to enterprise-grade digital tools. Whether you're a startup or an established
                  corporation, we provide the technical foundation you need to scale rapidly and compete globally.
                </p>
              </div>
              <div className="space-y-6">
                <div className="inline-flex items-center rounded-full border border-chart-2/30 bg-chart-2/10 px-5 py-2.5 text-sm font-medium text-chart-2 backdrop-blur-sm">
                  <Zap className="mr-2 h-4 w-4" />
                  Our Vision
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
                  The Future of Digital Commerce
                </h2>
                <p className="text-muted-foreground text-lg md:text-xl leading-relaxed font-light">
                  We envision a world where every business has the power to reach a global audience through seamless,
                  high-performance digital platforms that drive real results.
                </p>
              </div>
            </div>

            {/* Right Column - Values Cards */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-chart-2/20 to-chart-3/20 rounded-3xl blur-3xl opacity-30"></div>
              <div className="relative space-y-6">
                {[
                  {
                    icon: Users,
                    title: "Expert Team",
                    desc: "Senior developers, UX designers, and digital strategists with proven track records.",
                    color: "primary",
                  },
                  {
                    icon: Globe,
                    title: "Global Scale",
                    desc: "Enterprise-grade infrastructure that scales from 100 to 10 million users seamlessly.",
                    color: "chart-2",
                  },
                  {
                    icon: Zap,
                    title: "Rapid Delivery",
                    desc: "Agile methodology ensures your MVP launches in weeks, not months.",
                    color: "chart-3",
                  },
                  {
                    icon: Award,
                    title: "Quality First",
                    desc: "Every line of code is tested, optimized, and built to industry standards.",
                    color: "chart-4",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="glass-card rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group"
                  >
                    <div className="flex gap-6 items-start">
                      <div
                        className={`bg-${item.color}/10 p-4 rounded-xl group-hover:bg-${item.color}/20 transition-colors duration-300 shrink-0`}
                      >
                        <item.icon className={`h-7 w-7 text-${item.color}`} />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-semibold text-xl md:text-2xl">{item.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Philosophy Section */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-primary/5 to-transparent relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20"></div>
        <div className="container px-6 md:px-12 max-w-[1200px] mx-auto relative">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Why Choose <span className="text-gradient-accent">NexusDev</span>?
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed font-light">
              We're not just another development agency. We're your strategic partner in digital transformation,
              combining technical excellence with business acumen to deliver solutions that drive measurable growth.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 md:py-40 relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-40"></div>
        <div className="container px-6 md:px-12 max-w-[1200px] mx-auto text-center relative space-y-10">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-muted-foreground text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-light">
            Join hundreds of successful businesses that have transformed their digital presence with NexusDev.
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-xl px-10 h-14 text-lg font-medium shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] transition-all duration-300"
          >
            <Link href="/start-project">
              Start Your Project <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
      
      {/* Footer dihapus dari sini karena sudah ada di layout */}
    </>
  )
}