"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Loader2, AlertCircle, Mail, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"

export default function ForgotPasswordPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (!email) {
            setError("Please enter your email address.")
            return
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address.")
            return
        }

        setIsLoading(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        setIsLoading(false)
        setIsSubmitted(true)
        toast.success("Reset link sent!", {
            description: "Check your inbox for the password reset link."
        })
    }

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-[#0A0A0A] text-foreground p-6 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] opacity-50" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px] opacity-50" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
            </div>

            <div className="w-full max-w-[420px] relative z-10">
                {/* Back to Login */}
                <Link href="/login" className="inline-flex items-center text-sm text-muted-foreground hover:text-white transition-colors mb-8 group">
                    <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Login
                </Link>

                {!isSubmitted ? (
                    /* Request Form */
                    <div className="p-8 md:p-10 rounded-3xl bg-[#111111]/80 border border-white/5 backdrop-blur-xl shadow-2xl">
                        <div className="space-y-2 mb-8">
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Forgot Password?</h1>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                No worries! Enter your email address and we'll send you a link to reset your password.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3 text-red-400 text-sm animate-in slide-in-from-top-2">
                                    <AlertCircle size={18} className="shrink-0 mt-0.5" />
                                    {error}
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email Address</Label>
                                <div className="relative group">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"><Mail size={18} /></div>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        className="pl-10 h-12 bg-white/5 border-white/10 focus:border-primary/50 focus:bg-white/10 rounded-xl transition-all"
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            <Button type="submit" disabled={isLoading} className="w-full h-12 rounded-xl font-bold text-base bg-white text-black hover:bg-gray-200 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-white/10">
                                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Send Reset Link"}
                            </Button>
                        </form>
                    </div>
                ) : (
                    /* Success State */
                    <div className="p-8 md:p-10 rounded-3xl bg-[#111111]/80 border border-white/5 backdrop-blur-xl shadow-2xl text-center">
                        <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-8 h-8 text-green-500" />
                        </div>

                        <h1 className="text-2xl font-bold text-white mb-2">Check Your Email</h1>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                            We've sent a password reset link to<br />
                            <span className="text-white font-medium">{email}</span>
                        </p>

                        <div className="space-y-4">
                            <Button
                                onClick={() => setIsSubmitted(false)}
                                variant="outline"
                                className="w-full h-12 rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
                            >
                                Didn't receive it? Resend
                            </Button>

                            <Link href="/login">
                                <Button className="w-full h-12 rounded-xl font-bold bg-white text-black hover:bg-gray-200">
                                    Back to Login
                                </Button>
                            </Link>
                        </div>

                        <p className="text-xs text-muted-foreground mt-6">
                            Check your spam folder if you don't see the email.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
