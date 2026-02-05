"use client"

import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Loader2, Mail, RefreshCw } from "lucide-react"
import { useState } from "react"
import { authService } from "@/app/services/authService"
import { toast } from "sonner"

function CheckEmailContent() {
    const searchParams = useSearchParams()
    const email = searchParams.get("email") || ""
    const [isResending, setIsResending] = useState(false)

    const handleResend = async () => {
        if (!email) return
        setIsResending(true)
        try {
            await authService.resendVerification(email)
            toast.success("Email sent!", {
                description: "Please check your inbox for the verification link."
            })
        } catch (err) {
            toast.error("Failed to resend email. Please try again.")
        } finally {
            setIsResending(false)
        }
    }

    return (
        <div className="w-full min-h-screen lg:grid lg:grid-cols-2 bg-[#0A0A0A] text-foreground overflow-hidden">
            {/* --- LEFT SIDE: Visual --- */}
            <div className="hidden lg:flex relative flex-col justify-between p-12 bg-[#111111] border-r border-white/5">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-green-500/20 rounded-full blur-[120px] opacity-30" />
                    <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] opacity-30" />
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
                        "You're almost there! Just one more step to unlock your account."
                    </blockquote>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <div className="h-px w-8 bg-white/20" />
                        <span>Email Verification</span>
                    </div>
                </div>
            </div>

            {/* --- RIGHT SIDE: Content --- */}
            <div className="flex items-center justify-center p-6 md:p-12 relative">
                <div className="w-full max-w-[420px] space-y-8 text-center">

                    {/* Email Icon */}
                    <div className="w-24 h-24 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto animate-pulse">
                        <Mail size={48} />
                    </div>

                    {/* Text */}
                    <div className="space-y-3">
                        <h1 className="text-3xl font-bold tracking-tight text-white">Check Your Email</h1>
                        <p className="text-muted-foreground">
                            We've sent a verification link to
                            {email && <span className="block text-white font-medium mt-1">{email}</span>}
                        </p>
                        <p className="text-muted-foreground text-sm">
                            Click the link in the email to verify your account and get started.
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="space-y-4 pt-4">
                        <Button
                            onClick={handleResend}
                            disabled={isResending || !email}
                            variant="outline"
                            className="w-full h-12 rounded-xl font-medium border-white/10 hover:bg-white/5"
                        >
                            {isResending ? (
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            ) : (
                                <RefreshCw className="w-4 h-4 mr-2" />
                            )}
                            Resend Verification Email
                        </Button>

                        <div className="text-sm text-muted-foreground">
                            Already verified?{" "}
                            <Link href="/login" className="text-primary hover:underline font-medium">
                                Sign in
                            </Link>
                        </div>
                    </div>

                    {/* Tips */}
                    <div className="pt-6 border-t border-white/5">
                        <p className="text-xs text-muted-foreground">
                            Didn't receive the email? Check your spam folder or try resending.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default function CheckEmailPage() {
    return (
        <Suspense fallback={
            <div className="w-full min-h-screen flex items-center justify-center bg-[#0A0A0A]">
                <Loader2 className="w-8 h-8 animate-spin text-white" />
            </div>
        }>
            <CheckEmailContent />
        </Suspense>
    )
}
