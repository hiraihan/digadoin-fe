export function TechStack() {
  const techs = ["Next.js 15", "React", "TypeScript", "Tailwind CSS", "Supabase", "Stripe", "Vercel", "PostgreSQL"]

  return (
    <section className="py-16 border-y border-border/30 bg-card/10 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-10"></div>

      <div className="container px-6 md:px-16 max-w-[1600px] mx-auto relative z-10">
        <p className="text-center text-xs font-bold text-muted-foreground mb-10 tracking-[0.2em] uppercase">
          Powered by Modern Technologies
        </p>
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
          {techs.map((tech) => (
            <div
              key={tech}
              className="flex items-center gap-2.5 text-base md:text-lg font-bold text-foreground/70 hover:text-primary transition-all duration-300 group"
            >
              <div className="h-2.5 w-2.5 rounded-full bg-primary group-hover:scale-125 transition-transform"></div>
              {tech}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
