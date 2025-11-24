import { CheckCircle2, Code2, Rocket, Search } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Discovery",
    description: "Kami menganalisis kebutuhan bisnis Anda dan merancang solusi teknis yang tepat.",
  },
  {
    icon: Code2,
    title: "Development",
    description: "Tim expert kami membangun sistem Anda menggunakan teknologi modern dan scalable.",
  },
  {
    icon: CheckCircle2,
    title: "Testing",
    description: "Pengujian ketat untuk memastikan keamanan, performa, dan pengalaman pengguna terbaik.",
  },
  {
    icon: Rocket,
    title: "Launch",
    description: "Deployment ke production server dan dukungan teknis pasca-peluncuran.",
  },
]

export function Process() {
  return (
    <section id="process" className="py-32 md:py-40 bg-card/20 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-chart-2/10 rounded-full blur-[150px]" />

      <div className="container px-6 md:px-16 max-w-[1600px] mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-24">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-gradient-primary">
            Bagaimana Kami Bekerja
          </h2>
          <p className="text-muted-foreground text-xl md:text-2xl leading-relaxed font-light">
            Proses terstruktur untuk mengubah ide kompleks menjadi produk digital berkualitas tinggi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 relative">
          <div className="hidden lg:block absolute top-16 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-28 h-28 rounded-3xl glass-card flex items-center justify-center relative z-10 group-hover:border-primary/60 hover-glow transition-all duration-300 group-hover:scale-105">
                  <step.icon className="w-12 h-12 text-primary" />
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-base md:text-lg group-hover:text-foreground/80 transition-colors">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
