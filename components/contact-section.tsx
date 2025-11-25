import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone, ChevronDown, Send } from "lucide-react"

export function ContactSection() {
  return (
    <section id="contact" className="py-32 md:py-40 bg-black/90 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-[0.03]"></div>
      
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container px-6 md:px-16 max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24 items-center">
          
          <div className="lg:col-span-2 space-y-8">
            <div>
              <p className="text-sm font-bold text-primary tracking-[0.3em] uppercase mb-4">
                Get in Touch
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                Let’s Build Something <span className="text-gradient-primary">Extraordinary</span>
              </h2>
              <p className="text-white/60 text-lg leading-relaxed font-light">
                Siap mengubah ide menjadi realitas digital? Hubungi kami untuk konsultasi awal mengenai proyek Anda.
              </p>
            </div>

            <div className="space-y-6 pt-4">
              <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-primary group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300 border border-white/10">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wider font-semibold mb-1">Email</p>
                  <p className="text-white text-lg font-medium">hello@digado.in</p>
                </div>
              </div>
              
              <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-primary group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300 border border-white/10">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wider font-semibold mb-1">Phone</p>
                  <p className="text-white text-lg font-medium">+62 812 3456 7890</p>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-primary group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300 border border-white/10">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                   <p className="text-xs text-white/40 uppercase tracking-wider font-semibold mb-1">Studio</p>
                  <p className="text-white text-lg font-medium leading-snug">
                    Jakarta Selatan, Indonesia<br /> Tech Valley District
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="p-8 md:p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-2xl shadow-[0_0_40px_-10px_rgba(0,0,0,0.3)] relative overflow-hidden group/form hover:border-white/20 transition-all duration-500">
               <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.03] to-white/0 opacity-0 group-hover/form:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

              <form className="space-y-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3 group">
                    <label className="text-xs font-bold text-white/60 tracking-[0.2em] uppercase ml-1 group-focus-within:text-primary transition-colors">Nama Lengkap</label>
                    <Input
                      placeholder="ex: John Doe"
                      className="h-14 bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl focus:border-primary/50 focus:bg-white/10 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-3 group">
                    <label className="text-xs font-bold text-white/60 tracking-[0.2em] uppercase ml-1 group-focus-within:text-primary transition-colors">Email Address</label>
                    <Input
                      type="email"
                      placeholder="ex: john@company.com"
                      className="h-14 bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl focus:border-primary/50 focus:bg-white/10 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="space-y-3 group">
                  <label className="text-xs font-bold text-white/60 tracking-[0.2em] uppercase ml-1 group-focus-within:text-primary transition-colors">Project Interest</label>
                  <div className="relative">
                    <select className="w-full h-14 px-5 rounded-xl bg-white/5 border border-white/10 text-white text-base outline-none transition-all duration-300 focus:border-primary/50 focus:bg-white/10 focus:ring-1 focus:ring-primary/20 appearance-none cursor-pointer">
                      <option className="bg-zinc-900 text-white/50">Pilih Layanan...</option>
                      <option className="bg-zinc-900">LMS (Learning Management System)</option>
                      <option className="bg-zinc-900">E-Commerce / Marketplace</option>
                      <option className="bg-zinc-900">Company Profile & Branding</option>
                      <option className="bg-zinc-900">Custom Web Application</option>
                    </select>
                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none group-focus-within:text-primary transition-colors" />
                  </div>
                </div>

                <div className="space-y-3 group">
                  <label className="text-xs font-bold text-white/60 tracking-[0.2em] uppercase ml-1 group-focus-within:text-primary transition-colors">Project Details</label>
                  <Textarea
                    placeholder="Ceritakan sedikit tentang ide atau kebutuhan proyek Anda..."
                    className="min-h-[160px] bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl focus:border-primary/50 focus:bg-white/10 focus:ring-1 focus:ring-primary/20 resize-none p-5 transition-all duration-300"
                  />
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-14 text-base font-bold rounded-xl hover-glow transition-all duration-300 group relative overflow-hidden">
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    Kirim Pesan <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 h-full w-full scale-0 rounded-xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/10"></div>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}