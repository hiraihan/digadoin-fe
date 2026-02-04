"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { productService } from "@/app/services/productService"
import { PricingPlan } from "@/app/types/product"
import { formatCurrency } from "@/lib/formatters"

// Check if user is authenticated by looking for token
// Check if user is authenticated by looking for token
const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false
  const token = localStorage.getItem("token")
  return !!token && token !== "undefined" && token !== "null"
}

// Fallback static plans (used if API fails or no data)
const fallbackPlans = [
  {
    id: 0,
    name: "Company Profile",
    category: "company_profile",
    price: 5000000,
    description: "Website profil perusahaan profesional untuk membangun kredibilitas bisnis Anda. Cocok untuk UMKM, startup, dan perusahaan.",
    features: [
      "Custom Design UI/UX",
      "CMS Integration",
      "SEO Optimization",
      "Mobile Responsive",
      "Free Domain & Hosting (1 Tahun)",
    ],
    is_popular: false,
  },
  {
    id: 1,
    name: "E-Commerce / Marketplace",
    category: "ecommerce",
    price: 15000000,
    description: "Platform jual beli online lengkap dengan sistem pembayaran dan manajemen produk. Ideal untuk toko online.",
    features: [
      "Semua fitur Company Profile",
      "Payment Gateway Integration",
      "Product Management System",
      "User Dashboard",
      "Admin Panel Analytics",
      "Notification System",
    ],
    is_popular: true,
  },
  {
    id: 2,
    name: "Learning System (LMS)",
    category: "lms",
    price: 25000000,
    description: "Sistem pembelajaran online komprehensif untuk sekolah, universitas, atau platform kursus.",
    features: [
      "Semua fitur E-Commerce",
      "Course Management",
      "Student Progress Tracking",
      "Quiz & Assignment System",
      "Certificate Generation",
      "Live Class Integration",
    ],
    is_popular: false,
  },
]

// Helper to format price - using global formatCurrency
const formatPrice = (price: number): string => {
  return formatCurrency(price, 'short')
}

export function Pricing() {
  const router = useRouter()
  const [plans, setPlans] = useState<any[]>(fallbackPlans)
  const [loading, setLoading] = useState(true)
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  // Handle order button click - check auth and redirect accordingly
  const handleOrderClick = (planId: number) => {
    if (isAuthenticated()) {
      // User is logged in, go directly to order page with planId
      router.push(`/dashboard/order?planId=${planId}`)
    } else {
      // User not logged in, redirect to login with return URL
      const redirectUrl = encodeURIComponent('/dashboard/order')
      router.push(`/login?redirect=${redirectUrl}&planId=${planId}`)
    }
  }

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await productService.getPricingPlans({ active_only: true })
        if (data.length > 0) {
          // Map API data to component format and limit to 3
          const mapped = data
            .slice(0, 3) // Limit to 3 plans
            .map((plan: PricingPlan, idx: number) => ({
              id: plan.id,
              name: plan.name,
              category: plan.category || "",
              price: plan.price,
              description: plan.description || "",
              features: plan.features || [],
              is_popular: idx === 1, // Mark second plan as popular
            }))
          setPlans(mapped)
        }
      } catch (error) {
        console.warn("Using fallback pricing plans", error)
      } finally {
        setLoading(false)
      }
    }
    fetchPlans()
  }, [])

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



        {/* Billing Toggle */}
        <div className="flex justify-center mb-16">
          <div className="flex items-center gap-4 bg-secondary/50 p-1.5 rounded-full border border-border/50">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${billingCycle === "monthly"
                ? "bg-primary text-primary-foreground shadow-lg"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${billingCycle === "yearly"
                ? "bg-primary text-primary-foreground shadow-lg"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              Yearly
              <span className="bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-full">Save 20%</span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {plans.map((plan, index) => (
              <div
                key={plan.id || index}
                className={`relative rounded-3xl p-8 md:p-10 border ${plan.is_popular
                  ? "glass-card border-primary/50 hover-glow scale-105 z-10"
                  : "glass-panel border-border/50 hover:border-border transition-all duration-300"
                  } flex flex-col hover-lift`}
              >
                {plan.is_popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-chart-1 to-chart-2 text-white px-6 py-1.5 rounded-full text-sm font-bold tracking-wide">
                    Most Popular
                  </div>
                )}
                <div className="mb-10">
                  {plan.category && (
                    <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold uppercase tracking-wider rounded-full bg-primary/10 text-primary border border-primary/20">
                      {plan.category.replace(/_/g, ' ')}
                    </span>
                  )}
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <div className={`text-4xl md:text-5xl font-bold text-primary tracking-tight transition-all duration-300 ${billingCycle === "yearly" ? "animate-in slide-in-from-bottom-2 fade-in" : ""}`}>
                      {formatPrice(billingCycle === "yearly" ? plan.price * 12 * 0.8 : plan.price)}
                    </div>
                    <span className="text-muted-foreground text-lg ml-1">/ {billingCycle === "yearly" ? "year" : "mo"}</span>
                  </div>
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed">{plan.description}</p>
                </div>
                <ul className="space-y-4 mb-10 flex-1">
                  {plan.features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-base text-foreground/90">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  size="lg"
                  onClick={() => handleOrderClick(plan.id)}
                  className={`w-full h-14 text-base font-semibold rounded-full ${plan.is_popular ? "bg-primary hover:bg-primary/90 hover-glow" : "bg-secondary hover:bg-secondary/80"
                    } transition-all duration-300`}
                >
                  Pilih Paket
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section >
  )
}
