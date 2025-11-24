"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2, Rocket, Monitor, ShoppingCart, GraduationCap, Layers } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function StartProjectPage() {
  const [step, setStep] = useState(1)
  const [projectType, setProjectType] = useState("")

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground page-transition">
      <Navbar />
      <main className="flex-1 container px-6 md:px-12 py-20 md:py-32 max-w-[1200px] mx-auto">
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Start Your Project</h1>
          <p className="text-muted-foreground text-lg md:text-xl font-light">
            Tell us about your vision, and we'll help you build it.
          </p>
        </div>

        <div className="flex items-center justify-center mb-16">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full border-2 font-semibold text-sm transition-all duration-300 ${
                  step >= i
                    ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                    : "border-border bg-card text-muted-foreground"
                }`}
              >
                {step > i ? <CheckCircle2 className="h-6 w-6" /> : i}
              </div>
              {i < 3 && (
                <div
                  className={`h-0.5 w-20 md:w-32 mx-3 rounded-full transition-all duration-500 ${
                    step > i ? "bg-primary" : "bg-border"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="glass-card rounded-2xl p-8 md:p-12 shadow-2xl">
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-8">What are you building?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: "lms", label: "LMS Platform", icon: GraduationCap, desc: "Online courses & education" },
                  { id: "marketplace", label: "Marketplace", icon: ShoppingCart, desc: "Multi-vendor e-commerce" },
                  { id: "company", label: "Company Profile", icon: Monitor, desc: "Professional business site" },
                  { id: "custom", label: "Custom Web App", icon: Layers, desc: "SaaS or specialized tool" },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setProjectType(type.id)}
                    className={`flex flex-col items-start p-6 rounded-xl border-2 transition-all duration-300 text-left hover:scale-[1.02] ${
                      projectType === type.id
                        ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                        : "border-border/50 bg-card/30 hover:border-primary/30 hover:bg-primary/5"
                    }`}
                  >
                    <type.icon
                      className={`h-9 w-9 mb-5 transition-colors ${projectType === type.id ? "text-primary" : "text-muted-foreground"}`}
                    />
                    <span className="font-semibold text-lg mb-1">{type.label}</span>
                    <span className="text-sm text-muted-foreground">{type.desc}</span>
                  </button>
                ))}
              </div>
              <div className="flex justify-end mt-10">
                <Button
                  onClick={nextStep}
                  disabled={!projectType}
                  size="lg"
                  className="w-full md:w-auto rounded-xl px-8 font-medium"
                >
                  Next Step
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-8">Project Details</h2>
              <div className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </Label>
                    <Input id="name" placeholder="John Doe" className="h-11 rounded-lg" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <Input id="email" type="email" placeholder="john@example.com" className="h-11 rounded-lg" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget" className="text-sm font-medium">
                    Estimated Budget
                  </Label>
                  <Select>
                    <SelectTrigger className="h-11 rounded-lg">
                      <SelectValue placeholder="Select a range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">IDR 5jt - 15jt</SelectItem>
                      <SelectItem value="medium">IDR 15jt - 30jt</SelectItem>
                      <SelectItem value="large">IDR 30jt - 50jt</SelectItem>
                      <SelectItem value="enterprise">IDR 50jt+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeline" className="text-sm font-medium">
                    Expected Timeline
                  </Label>
                  <Select>
                    <SelectTrigger className="h-11 rounded-lg">
                      <SelectValue placeholder="When do you need it?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="urgent">ASAP (Urgent)</SelectItem>
                      <SelectItem value="1month">1 Month</SelectItem>
                      <SelectItem value="3months">2-3 Months</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-between mt-10">
                <Button variant="outline" onClick={prevStep} className="rounded-xl px-6 bg-transparent">
                  Back
                </Button>
                <Button onClick={nextStep} className="rounded-xl px-8">
                  Next Step
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-8">Final Details</h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium">
                    Project Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your project features, goals, and any specific requirements..."
                    className="min-h-[160px] rounded-lg resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reference" className="text-sm font-medium">
                    Reference Websites (Optional)
                  </Label>
                  <Input id="reference" placeholder="e.g. airbnb.com, udemy.com" className="h-11 rounded-lg" />
                </div>
              </div>
              <div className="flex justify-between mt-10">
                <Button variant="outline" onClick={prevStep} className="rounded-xl px-6 bg-transparent">
                  Back
                </Button>
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 rounded-xl px-8 shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] transition-all duration-300"
                >
                  <Rocket className="mr-2 h-5 w-5" />
                  Submit Project
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
