import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const plans = [
  {
    name: "Company Profile",
    price: "Start from 5jt",
    description: "Website profesional untuk membangun kredibilitas bisnis Anda.",
    features: [
      "Custom Design UI/UX",
      "CMS Integration",
      "SEO Optimization",
      "Mobile Responsive",
      "Free Domain & Hosting (1 Tahun)",
    ],
    highlight: false,
  },
  {
    name: "E-Commerce / Marketplace",
    price: "Start from 15jt",
    description: "Platform jual beli lengkap dengan sistem pembayaran dan manajemen produk.",
    features: [
      "Semua fitur Company Profile",
      "Payment Gateway Integration",
      "Product Management System",
      "User Dashboard",
      "Admin Panel Analytics",
      "Notification System",
    ],
    highlight: true,
  },
  {
    name: "Learning System (LMS)",
    price: "Start from 25jt",
    description: "Sistem pembelajaran online komprehensif untuk sekolah atau kursus.",
    features: [
      "Semua fitur Marketplace",
      "Course Management",
      "Student Progress Tracking",
      "Quiz & Assignment System",
      "Certificate Generation",
      "Live Class Integration",
    ],
    highlight: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-32 md:py-40 bg-background relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20"></div>
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-chart-3/10 rounded-full blur-[150px]"></div>

      <div className="container px-6 md:px-16 max-w-[1600px] mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-gradient-primary">
            Investasi Terbaik untuk Bisnis Anda
          </h2>
          <p className="text-muted-foreground text-xl md:text-2xl leading-relaxed font-light">
            Pilih paket yang sesuai dengan skala dan kebutuhan transformasi digital Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-3xl p-8 md:p-10 border ${
                plan.highlight
                  ? "glass-card border-primary/50 hover-glow scale-105 z-10"
                  : "glass-panel border-border/50 hover:border-border transition-all duration-300"
              } flex flex-col hover-lift`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-chart-1 to-chart-2 text-white px-6 py-1.5 rounded-full text-sm font-bold tracking-wide">
                  Most Popular
                </div>
              )}
              <div className="mb-10">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{plan.name}</h3>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-4 tracking-tight">{plan.price}</div>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">{plan.description}</p>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-base text-foreground/90">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                size="lg"
                className={`w-full h-14 text-base font-semibold rounded-full ${
                  plan.highlight ? "bg-primary hover:bg-primary/90 hover-glow" : "bg-secondary hover:bg-secondary/80"
                } transition-all duration-300`}
              >
                <Link href="/start-project">Konsultasi Sekarang</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
