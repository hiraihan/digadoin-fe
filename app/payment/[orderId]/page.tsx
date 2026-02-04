"use client"

import { useState, useEffect, Suspense } from "react"
import { useParams, useRouter } from "next/navigation"
import {
    CreditCard,
    Building2,
    Smartphone,
    QrCode,
    Check,
    X,
    Loader2,
    ArrowLeft,
    Shield,
    Clock,
    AlertCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { orderService, OrderPaymentDetails } from "@/app/services/orderService"
import { formatCurrency } from "@/lib/formatters"
import { toast } from "sonner"
import Link from "next/link"

const paymentMethods = [
    {
        id: "bank_transfer",
        name: "Transfer Bank",
        description: "BCA, Mandiri, BNI, BRI",
        icon: Building2,
        color: "bg-blue-500"
    },
    {
        id: "ewallet",
        name: "E-Wallet",
        description: "GoPay, OVO, DANA, ShopeePay",
        icon: Smartphone,
        color: "bg-green-500"
    },
    {
        id: "qris",
        name: "QRIS",
        description: "Scan & bayar dengan QRIS",
        icon: QrCode,
        color: "bg-purple-500"
    },
    {
        id: "credit_card",
        name: "Kartu Kredit",
        description: "Visa, Mastercard, JCB",
        icon: CreditCard,
        color: "bg-orange-500"
    }
]

function PaymentPageContent() {
    const params = useParams()
    const router = useRouter()
    const orderId = Number(params.orderId)

    const [order, setOrder] = useState<OrderPaymentDetails | null>(null)
    const [loading, setLoading] = useState(true)
    const [processing, setProcessing] = useState(false)
    const [selectedMethod, setSelectedMethod] = useState("bank_transfer")
    const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'cancelled' | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const data = await orderService.getOrderForPayment(orderId)
                setOrder(data)

                // Check if already paid
                if (data.status === 'paid') {
                    setPaymentStatus('success')
                    // Auto-redirect if accessed again after payment
                    setTimeout(() => {
                        router.replace("/dashboard?payment=success")
                    }, 2000)
                } else if (data.status === 'cancelled') {
                    setPaymentStatus('cancelled')
                }
            } catch (err: any) {
                setError(err.message || "Failed to load order")
                toast.error("Gagal memuat detail pesanan")
            } finally {
                setLoading(false)
            }
        }

        if (orderId) {
            fetchOrder()
        }
    }, [orderId])

    const handlePayment = async () => {
        setProcessing(true)
        try {
            const result = await orderService.simulatePayment(orderId, 'pay', selectedMethod)
            if (result.success) {
                setPaymentStatus('success')
                toast.success("Pembayaran berhasil!")

                // Redirect to dashboard after 2 seconds
                setTimeout(() => {
                    router.replace("/dashboard?payment=success")
                }, 2000)
            }
        } catch (err: any) {
            toast.error(err.message || "Pembayaran gagal")
        } finally {
            setProcessing(false)
        }
    }

    const handleCancel = async () => {
        setProcessing(true)
        try {
            const result = await orderService.simulatePayment(orderId, 'cancel')
            if (result.success) {
                setPaymentStatus('cancelled')
                toast.info("Pesanan dibatalkan")

                // Redirect after 2 seconds
                setTimeout(() => {
                    router.replace("/dashboard/order")
                }, 2000)
            }
        } catch (err: any) {
            toast.error(err.message || "Gagal membatalkan pesanan")
        } finally {
            setProcessing(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
                    <p className="text-muted-foreground">Memuat detail pembayaran...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
                <Card className="max-w-md w-full">
                    <CardContent className="pt-6 text-center">
                        <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
                        <h2 className="text-xl font-bold mb-2">Terjadi Kesalahan</h2>
                        <p className="text-muted-foreground mb-6">{error}</p>
                        <Link href="/dashboard">
                            <Button>Kembali ke Dashboard</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        )
    }

    // Success State
    if (paymentStatus === 'success') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-background via-background to-green-500/5 flex items-center justify-center p-4">
                <Card className="max-w-md w-full border-green-500/50">
                    <CardContent className="pt-8 pb-8 text-center">
                        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                            <Check className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-green-600 mb-2">Pembayaran Berhasil!</h2>
                        <p className="text-muted-foreground mb-6">
                            Terima kasih! Pesanan Anda sedang diproses.
                        </p>
                        <div className="bg-muted/50 rounded-lg p-4 mb-6 text-left">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-muted-foreground">Order ID</span>
                                <span className="font-medium">#{order?.id}</span>
                            </div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-muted-foreground">Paket</span>
                                <span className="font-medium">{order?.plan_name}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Total</span>
                                <span className="font-bold text-primary">{formatCurrency(order?.total_price || 0)}</span>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Mengalihkan ke dashboard...
                        </p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    // Cancelled State
    if (paymentStatus === 'cancelled') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-background via-background to-destructive/5 flex items-center justify-center p-4">
                <Card className="max-w-md w-full border-destructive/50">
                    <CardContent className="pt-8 pb-8 text-center">
                        <div className="w-20 h-20 bg-destructive rounded-full flex items-center justify-center mx-auto mb-6">
                            <X className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-destructive mb-2">Pesanan Dibatalkan</h2>
                        <p className="text-muted-foreground mb-6">
                            Pesanan Anda telah dibatalkan. Silakan buat pesanan baru jika diperlukan.
                        </p>
                        <Link href="/dashboard/order">
                            <Button>Buat Pesanan Baru</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        )
    }

    // Payment Form
    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/dashboard/order" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Kembali
                    </Link>
                    <h1 className="text-3xl font-bold">Pembayaran</h1>
                    <p className="text-muted-foreground">Selesaikan pembayaran untuk memulai project Anda</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Payment Methods */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Pilih Metode Pembayaran</CardTitle>
                                <CardDescription>Pilih metode pembayaran yang Anda inginkan</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {paymentMethods.map((method) => {
                                        const Icon = method.icon
                                        const isSelected = selectedMethod === method.id
                                        return (
                                            <div
                                                key={method.id}
                                                onClick={() => setSelectedMethod(method.id)}
                                                className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${isSelected
                                                    ? "border-primary bg-primary/5 shadow-md"
                                                    : "border-border hover:border-primary/50 hover:bg-muted/50"
                                                    }`}
                                            >
                                                {isSelected && (
                                                    <div className="absolute top-3 right-3 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                                                        <Check className="w-3 h-3 text-white" />
                                                    </div>
                                                )}
                                                <div className={`w-12 h-12 ${method.color} rounded-xl flex items-center justify-center mb-3`}>
                                                    <Icon className="w-6 h-6 text-white" />
                                                </div>
                                                <h3 className="font-semibold">{method.name}</h3>
                                                <p className="text-sm text-muted-foreground">{method.description}</p>
                                            </div>
                                        )
                                    })}
                                </div>

                                {/* Demo Notice */}
                                <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                                    <div className="flex items-start gap-3">
                                        <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5" />
                                        <div>
                                            <p className="font-medium text-amber-600">Mode Demo</p>
                                            <p className="text-sm text-muted-foreground">
                                                Ini adalah simulasi pembayaran. Tidak ada transaksi nyata yang akan diproses.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-6 flex gap-4">
                                    <Button
                                        className="flex-1 h-12"
                                        size="lg"
                                        onClick={handlePayment}
                                        disabled={processing}
                                    >
                                        {processing ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Memproses...
                                            </>
                                        ) : (
                                            <>
                                                <Check className="w-4 h-4 mr-2" />
                                                Bayar Sekarang
                                            </>
                                        )}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="h-12"
                                        onClick={handleCancel}
                                        disabled={processing}
                                    >
                                        <X className="w-4 h-4 mr-2" />
                                        Batalkan
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-8">
                            <CardHeader>
                                <CardTitle>Ringkasan Pesanan</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {/* Plan Info */}
                                <div className="mb-4">
                                    {order?.plan_category && (
                                        <span className="inline-block px-2 py-1 text-xs font-semibold uppercase tracking-wider rounded bg-primary/10 text-primary mb-2">
                                            {order.plan_category.replace(/_/g, ' ')}
                                        </span>
                                    )}
                                    <h3 className="text-lg font-bold">{order?.plan_name}</h3>
                                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                                        {order?.plan_description}
                                    </p>
                                </div>

                                <div className="border-t border-dashed pt-4 space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Order ID</span>
                                        <span className="font-medium">#{order?.id}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Durasi</span>
                                        <span className="font-medium">{order?.duration_months} bulan</span>
                                    </div>
                                </div>

                                <div className="border-t border-dashed pt-4 mt-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-muted-foreground">Total</span>
                                        <span className="text-2xl font-bold text-primary">
                                            {formatCurrency(order?.total_price || 0)}
                                        </span>
                                    </div>
                                </div>

                                {/* Trust Badges */}
                                <div className="mt-6 pt-4 border-t space-y-3">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Shield className="w-4 h-4 text-green-500" />
                                        <span>Pembayaran Aman & Terenkripsi</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Clock className="w-4 h-4 text-blue-500" />
                                        <span>Aktivasi Instan Setelah Bayar</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Loading fallback
function PaymentLoading() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
            <div className="text-center">
                <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Memuat halaman pembayaran...</p>
            </div>
        </div>
    )
}

export default function PaymentPage() {
    return (
        <Suspense fallback={<PaymentLoading />}>
            <PaymentPageContent />
        </Suspense>
    )
}
