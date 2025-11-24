import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "Berapa lama waktu pengerjaan website?",
    answer:
      "Waktu pengerjaan bervariasi tergantung kompleksitas proyek. Untuk Company Profile biasanya 1-2 minggu, sedangkan untuk LMS atau Marketplace bisa memakan waktu 4-8 minggu.",
  },
  {
    question: "Apakah saya mendapatkan akses ke CMS/Admin Panel?",
    answer:
      "Ya, semua website yang kami buat dilengkapi dengan CMS (Content Management System) atau Admin Panel yang user-friendly, sehingga Anda bisa mengelola konten sendiri tanpa perlu coding.",
  },
  {
    question: "Apakah ada garansi atau maintenance?",
    answer:
      "Kami memberikan garansi bug fix selama 3 bulan setelah launch. Kami juga menyediakan paket maintenance bulanan untuk update keamanan dan backup data.",
  },
  {
    question: "Apakah website sudah termasuk domain dan hosting?",
    answer:
      "Paket kami sudah termasuk domain (.com/.id) dan hosting cloud server gratis untuk tahun pertama. Untuk tahun berikutnya, Anda hanya perlu membayar biaya perpanjangan.",
  },
  {
    question: "Bisakah saya request fitur custom?",
    answer:
      "Tentu saja! Kami spesialis dalam pengembangan custom software. Tim kami akan menganalisis kebutuhan bisnis Anda dan membangun solusi yang tepat.",
  },
]

export function FAQSection() {
  return (
    <section className="py-32 md:py-40 bg-card/20 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20"></div>
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-chart-5/10 rounded-full blur-[150px]"></div>

      <div className="container px-6 md:px-16 max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-gradient-primary">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-xl md:text-2xl leading-relaxed font-light">
            Jawaban untuk pertanyaan yang sering diajukan oleh klien kami.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-border/50 glass-panel rounded-2xl px-8 hover:border-primary/30 transition-all duration-300"
            >
              <AccordionTrigger className="text-foreground hover:text-primary hover:no-underline py-7 text-left text-lg md:text-xl font-semibold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-7 text-base md:text-lg leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
