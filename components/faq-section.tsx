"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FAQSectionContent } from "@/app/types/content"

interface FAQSectionProps {
  data: FAQSectionContent
}

export function FAQSection({ data }: FAQSectionProps) {
  return (
    <section className="py-32 md:py-40 bg-card/20 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20"></div>
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-chart-5/10 rounded-full blur-[150px]"></div>

      <div className="container px-6 md:px-16 max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-gradient-primary">
            {data.title}
          </h2>
          <p className="text-muted-foreground text-xl md:text-2xl leading-relaxed font-light">
            {data.subtitle}
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {data.items.map((faq, index) => (
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
