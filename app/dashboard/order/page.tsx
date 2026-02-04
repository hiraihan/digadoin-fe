"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Check, Loader2, ArrowLeft, Sparkles } from "lucide-react"
import { toast } from "sonner"
import { productService } from "@/app/services/productService"
import { orderService } from "@/app/services/orderService"
import { formatCurrency } from "@/lib/formatters"
import { PricingPlan } from "@/app/types/product"

import { ProjectSetupModal } from "@/components/order/ProjectSetupModal"

// Inner component that uses useSearchParams (must be wrapped in Suspense)
function OrderPageContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [plans, setPlans] = useState<PricingPlan[]>([])
    const [loading, setLoading] = useState(true)
    const [ordering, setOrdering] = useState<number | null>(null)

    // Modal State
    const [configPlanId, setConfigPlanId] = useState<number | null>(null)
    const [configPlanName, setConfigPlanName] = useState("")

    // Get planId from URL query params
    const preSelectedPlanId = searchParams.get("planId")
    const [selectedPlanId, setSelectedPlanId] = useState<number | null>(
        preSelectedPlanId ? parseInt(preSelectedPlanId, 10) : null
    )

    // Ref for scrolling to selected plan
    const selectedCardRef = useRef<HTMLDivElement>(null)

    // Check Auth on Mount
    useEffect(() => {
        const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null
        if (!token || token === "undefined" || token === "null") {
            const redirectUrl = encodeURIComponent('/dashboard/order')
            const planParam = selectedPlanId ? `&planId=${selectedPlanId}` : ''
            router.push(`/login?redirect=${redirectUrl}${planParam}`)
        }
    }, [router, selectedPlanId])

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const data = await productService.getPricingPlans({ active_only: true })
                setPlans(data)
            } catch (error) {
                toast.error("Failed to load pricing plans")
            } finally {
                setLoading(false)
            }
        }
        fetchPlans()
    }, [])

    // Auto-scroll to selected plan after plans load
    useEffect(() => {
        if (!loading && selectedPlanId && selectedCardRef.current) {
            setTimeout(() => {
                selectedCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }, 300)
        }
    }, [loading, selectedPlanId])

    const onSelectPlan = (plan: PricingPlan) => {
        setConfigPlanId(plan.id)
        setConfigPlanName(plan.name)
    }

    const handleConfirmOrder = async (details: { name: string; subdomain: string; description: string }) => {
        if (!configPlanId) return

        try {
            // Create order with the selected plan and project details
            const result = await orderService.createOrder(configPlanId, undefined, details)

            if (result.order_id) {
                toast.success("Order created! Redirecting to payment...")
                // Redirect to our payment simulation page
                router.replace(`/payment/${result.order_id}`)
            } else {
                toast.error("Failed to create order")
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to create order")
        }
    }

    return (
        <div className="flex flex-col space-y-8 p-8 max-w-[1200px] mx-auto animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => router.back()}
                    className="rounded-xl"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">Order New Website</h1>
                    <p className="text-muted-foreground mt-1">
                        Choose a plan that fits your needs
                    </p>
                </div>
            </div>

            {/* Pricing Plans */}
            {loading ? (
                <div className="grid gap-6 md:grid-cols-3">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-[400px] rounded-2xl bg-white/5 animate-pulse" />
                    ))}
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-3">
                    {plans.map((plan, index) => {
                        const isPopular = index === 1
                        const isPreSelected = selectedPlanId === plan.id
                        return (
                            <Card
                                key={plan.id}
                                ref={isPreSelected ? selectedCardRef : null}
                                className={`relative overflow-hidden transition-all duration-300 hover:scale-[1.02] ${isPreSelected
                                    ? "border-green-500 bg-gradient-to-b from-green-500/20 to-transparent ring-2 ring-green-500/50 shadow-lg shadow-green-500/20"
                                    : isPopular
                                        ? "border-blue-500 bg-gradient-to-b from-blue-500/10 to-transparent"
                                        : "border-white/10 bg-white/5"
                                    }`}
                            >
                                {isPreSelected && (
                                    <div className="absolute top-4 left-4">
                                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500 text-white text-xs font-medium animate-pulse">
                                            <Check className="w-3 h-3" />
                                            Rekomendasi untuk Anda
                                        </span>
                                    </div>
                                )}
                                {isPopular && !isPreSelected && (
                                    <div className="absolute top-4 right-4">
                                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-500 text-white text-xs font-medium">
                                            <Sparkles className="w-3 h-3" />
                                            Popular
                                        </span>
                                    </div>
                                )}

                                <CardHeader className="pb-4">
                                    <CardTitle className="text-xl text-white">{plan.name}</CardTitle>
                                    <CardDescription className="text-muted-foreground">
                                        {plan.description || "Perfect for your business"}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="space-y-6">
                                    <div>
                                        <span className="text-4xl font-bold text-white">
                                            {formatCurrency(plan.price, 'compact')}
                                        </span>
                                        <span className="text-muted-foreground ml-2">
                                            / {plan.duration_months} bulan
                                        </span>
                                    </div>

                                    <ul className="space-y-3">
                                        {(Array.isArray(plan.features) ? plan.features : []).map((feature: string, i: number) => (
                                            <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>

                                <CardFooter>
                                    <Button
                                        className={`w-full h-12 rounded-xl font-semibold ${isPreSelected
                                            ? "bg-green-600 hover:bg-green-700"
                                            : isPopular
                                                ? "bg-blue-600 hover:bg-blue-700"
                                                : "bg-white/10 hover:bg-white/20"
                                            }`}
                                        onClick={() => onSelectPlan(plan)}
                                        disabled={ordering !== null}
                                    >
                                        {ordering === plan.id ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : isPreSelected ? (
                                            "Lanjutkan Pembayaran"
                                        ) : (
                                            "Order Now"
                                        )}
                                    </Button>
                                </CardFooter>
                            </Card>
                        )
                    })}
                </div>
            )}

            {/* Project Setup Modal */}
            <ProjectSetupModal
                isOpen={!!configPlanId}
                onClose={() => setConfigPlanId(null)}
                onConfirm={handleConfirmOrder}
                planName={configPlanName}
            />

            {/* Info */}
            <div className="text-center text-muted-foreground text-sm">
                <p>After payment, your website project will be created automatically.</p>
                <p>Our team will start working on it within 24 hours.</p>
            </div>
        </div>
    )
}

// Loading fallback for Suspense
function OrderPageLoading() {
    return (
        <div className="flex flex-col space-y-8 p-8 max-w-[1200px] mx-auto animate-in fade-in duration-500">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 animate-pulse" />
                <div className="space-y-2">
                    <div className="w-48 h-8 rounded bg-white/5 animate-pulse" />
                    <div className="w-64 h-4 rounded bg-white/5 animate-pulse" />
                </div>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-[400px] rounded-2xl bg-white/5 animate-pulse" />
                ))}
            </div>
        </div>
    )
}

// Main page component with Suspense wrapper
export default function OrderPage() {
    return (
        <Suspense fallback={<OrderPageLoading />}>
            <OrderPageContent />
        </Suspense>
    )
}
