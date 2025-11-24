import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone } from "lucide-react"

export function ContactSection() {
  return (
    <section id="contact" className="py-32 md:py-40 bg-background relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20"></div>
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-chart-2/10 rounded-full blur-[150px]" />

      <div className="container px-6 md:px-16 max-w-[1600px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient-primary leading-tight">
              Mulai Proyek Anda Hari Ini
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl mb-16 leading-relaxed font-light">
              Diskusikan ide Anda dengan tim kami. Kami siap membantu merealisasikan visi digital Anda menjadi
              kenyataan.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-5 p-5 rounded-2xl glass-panel hover:border-primary/30 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-primary group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground mb-1.5">Email Kami</h3>
                  <p className="text-muted-foreground text-base">hello@nexusdev.com</p>
                </div>
              </div>
              <div className="flex items-start gap-5 p-5 rounded-2xl glass-panel hover:border-primary/30 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-primary group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground mb-1.5">Telepon / WhatsApp</h3>
                  <p className="text-muted-foreground text-base">+62 812 3456 7890</p>
                </div>
              </div>
              <div className="flex items-start gap-5 p-5 rounded-2xl glass-panel hover:border-primary/30 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-primary group-hover:bg-primary/20 transition-colors">
                  <MapPin className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground mb-1.5">Kantor</h3>
                  <p className="text-muted-foreground text-base">
                    Jakarta Selatan, Indonesia
                    <br />
                    Tech Valley District
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 md:p-10 rounded-3xl backdrop-blur-xl">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2.5">
                  <label className="text-sm font-semibold text-foreground tracking-wide">Nama Lengkap</label>
                  <Input
                    placeholder="John Doe"
                    className="h-12 bg-background/50 border-border focus:border-primary text-foreground rounded-xl focus-ring"
                  />
                </div>
                <div className="space-y-2.5">
                  <label className="text-sm font-semibold text-foreground tracking-wide">Email</label>
                  <Input
                    type="email"
                    placeholder="john@company.com"
                    className="h-12 bg-background/50 border-border focus:border-primary text-foreground rounded-xl focus-ring"
                  />
                </div>
              </div>
              <div className="space-y-2.5">
                <label className="text-sm font-semibold text-foreground tracking-wide">Jenis Layanan</label>
                <select className="w-full h-12 px-4 rounded-xl bg-background/50 border border-border focus:border-primary text-foreground text-sm outline-none transition-colors focus-ring">
                  <option>Pilih Layanan</option>
                  <option>LMS (Learning Management System)</option>
                  <option>E-Commerce / Marketplace</option>
                  <option>Company Profile</option>
                  <option>Custom Web App</option>
                </select>
              </div>
              <div className="space-y-2.5">
                <label className="text-sm font-semibold text-foreground tracking-wide">Pesan</label>
                <Textarea
                  placeholder="Ceritakan detail kebutuhan proyek Anda..."
                  className="min-h-[140px] bg-background/50 border-border focus:border-primary text-foreground rounded-xl resize-none focus-ring"
                />
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-14 text-base font-semibold rounded-xl hover-glow transition-all duration-300">
                Kirim Pesan
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
