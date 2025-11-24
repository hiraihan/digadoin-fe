import Image from "next/image"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "Sistem LMS yang dibangun sangat membantu operasional kursus kami. UI-nya intuitif dan performanya sangat cepat.",
    author: "Budi Santoso",
    role: "CEO, EduTech Indonesia",
    image: "/diverse-group-avatars.png",
  },
  {
    quote:
      "Marketplace kami berjalan lancar dengan ribuan transaksi per hari. Tim support sangat responsif menangani kendala.",
    author: "Sarah Wijaya",
    role: "Founder, LocalMarket",
    image: "/diverse-group-avatars.png",
  },
  {
    quote:
      "Website company profile baru kami meningkatkan konversi klien hingga 200%. Desainnya benar-benar world-class.",
    author: "Michael Chen",
    role: "Director, Creative Agency",
    image: "/diverse-group-avatars.png",
  },
]

export function Testimonials() {
  return (
    <section className="py-32 md:py-40 bg-card/20 border-y border-border/30 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20"></div>
      <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-chart-4/10 rounded-full blur-[150px]"></div>

      <div className="container px-6 md:px-16 max-w-[1600px] mx-auto relative z-10">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-20 text-gradient-primary">
          Dipercaya oleh Industri
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="glass-card p-8 md:p-10 rounded-3xl relative hover-lift transition-all duration-300 group"
            >
              <div className="mb-6">
                <Quote className="w-10 h-10 text-primary/30 group-hover:text-primary/50 transition-colors" />
              </div>
              <p className="text-foreground/90 text-lg md:text-xl leading-relaxed mb-8 relative z-10">{item.quote}</p>
              <div className="flex items-center gap-4 pt-6 border-t border-border/30">
                <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-primary/20">
                  <Image src={item.image || "/placeholder.svg"} alt={item.author} fill className="object-cover" />
                </div>
                <div>
                  <div className="font-bold text-lg text-foreground">{item.author}</div>
                  <div className="text-sm text-muted-foreground">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
