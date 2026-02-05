"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle, XCircle, AlertTriangle, ArrowRight } from "lucide-react"
import { authService } from "@/app/services/authService"

function VerifyEmailContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    const [status, setStatus] = useState<"loading" | "success" | "error" | "invalid">("loading")
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        if (!token) {
            setStatus("invalid")
            return
        }

        const verifyEmail = async () => {
            try {
                await authService.verifyEmail(token)
                setStatus("success")
            } catch (err: any) {
                setStatus("error")
                setErrorMessage(err?.detail || err?.message || "Verification failed. The link may be expired.")
            }
        }

        verifyEmail()
    }, [token])

    return (
        <div className="w-full min-h-screen lg:grid lg:grid-cols-2 bg-[#0A0A0A] text-foreground overflow-hidden">
            {/* --- LEFT SIDE: Visual --- */}
            <div className="hidden lg:flex relative flex-col justify-between p-12 bg-[#111111] border-r border-white/5">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-30" />
                    <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-green-600/10 rounded-full blur-[150px] opacity-30" />
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-auto opacity-40 rotate-[-12deg] hover:rotate-[-10deg] hover:scale-105 transition-all duration-1000 ease-in-out grayscale hover:grayscale-0">
                        <Image src="/modern-dashboard-dark-mode-ui.jpg" width={1200} height={800} alt="Preview" className="rounded-xl shadow-2xl border border-white/10" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/50 to-transparent" />
                </div>

                <Link href="/" className="relative z-10 flex items-center gap-3 group w-fit">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black font-bold text-lg shadow-[0_0_20px_-5px_rgba(255,255,255,0.5)] transition-transform group-hover:scale-105">D</div>
                    <span className="text-xl font-bold tracking-tight text-white">digado.in</span>
                </Link>

                <div className="relative z-10 max-w-md space-y-4">
                    <blockquote className="text-2xl font-medium leading-relaxed text-white">
                        "Verify your email to unlock the full potential of your account."
                    </blockquote>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <div className="h-px w-8 bg-white/20" />
                        <span>Email Verification</span>
                    </div>
                </div>
            </div>

            {/* --- RIGHT SIDE: Content --- */}
            <div className="flex items-center justify-center p-6 md:p-12 relative">
                <div className="w-full max-w-[400px] space-y-8 text-center">

                    {status === "loading" && (
                        <div className="space-y-6">
                            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto">
                                <Loader2 size={40} className="text-white animate-spin" />
                            </div>
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tight text-white">Verifying Email...</h1>
                                <p className="text-muted-foreground">Please wait while we verify your email address.</p>
                            </div>
                        </div>
                    )}

                    {status === "success" && (
                        <div className="space-y-6">
                            <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto">
                                <CheckCircle size={40} />
                            </div>
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tight text-white">Email Verified! 🎉</h1>
                                <p className="text-muted-foreground">Your email has been successfully verified. You can now login and access all features.</p>
                            </div>
                            <Link href="/login">
                                <Button className="w-full h-12 rounded-xl font-bold text-base bg-green-500 text-white hover:bg-green-600">
                                    Continue to Login <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    )}

                    {status === "error" && (
                        <div className="space-y-6">
                            <div className="w-20 h-20 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center mx-auto">
                                <XCircle size={40} />
                            </div>
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tight text-white">Verification Failed</h1>
                                <p className="text-muted-foreground">{errorMessage}</p>
                            </div>
                            <div className="space-y-3">
                                <Link href="/register">
                                    <Button className="w-full h-12 rounded-xl font-bold text-base bg-white text-black hover:bg-gray-200">
                                        Create New Account
                                    </Button>
                                </Link>
                                <Link href="/login">
                                    <Button variant="ghost" className="w-full h-12 rounded-xl font-bold text-base text-muted-foreground hover:text-white">
                                        Back to Login
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    )}

                    {status === "invalid" && (
                        <div className="space-y-6">
                            <div className="w-20 h-20 bg-orange-500/20 text-orange-400 rounded-full flex items-center justify-center mx-auto">
                                <AlertTriangle size={40} />
                            </div>
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tight text-white">Invalid Link</h1>
                                <p className="text-muted-foreground">This verification link is invalid or missing. Please check your email for the correct link.</p>
                            </div>
                            <div className="space-y-3">
                                <Link href="/register">
                                    <Button className="w-full h-12 rounded-xl font-bold text-base bg-white text-black hover:bg-gray-200">
                                        Create New Account
                                    </Button>
                                </Link>
                                <Link href="/login">
                                    <Button variant="ghost" className="w-full h-12 rounded-xl font-bold text-base text-muted-foreground hover:text-white">
                                        Back to Login
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={
            <div className="w-full min-h-screen flex items-center justify-center bg-[#0A0A0A]">
                <Loader2 className="w-8 h-8 animate-spin text-white" />
            </div>
        }>
            <VerifyEmailContent />
        </Suspense>
    )
}
