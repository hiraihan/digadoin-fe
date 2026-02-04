"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Loader2, Mail, CheckCircle, ArrowRight } from "lucide-react"

export default function ForgotPasswordPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [issubmitted, setIsSubmitted] = useState(false)
    const [email, setEmail] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            setIsSubmitted(true)
        }, 1500)
    }

    return (
        <div className="w-full min-h-screen lg:grid lg:grid-cols-2 bg-[#0A0A0A] text-foreground overflow-hidden">
            {/* --- LEFT SIDE: Visual --- */}
            <div className="hidden lg:flex relative flex-col justify-between p-12 bg-[#111111] border-r border-white/5">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-30" />
                    <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] opacity-30" />
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-auto opacity-40 rotate-[12deg] hover:rotate-[10deg] hover:scale-105 transition-all duration-1000 ease-in-out grayscale hover:grayscale-0">
                        {/* Using the same image as login for consistency */}
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
                        "Security is our priority. Recover your access and get back to building amazing things."
                    </blockquote>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <div className="h-px w-8 bg-white/20" />
                        <span>Account Recovery</span>
                    </div>
                </div>
            </div>

            {/* --- RIGHT SIDE: Form --- */}
            <div className="flex items-center justify-center p-6 md:p-12 relative">
                <Link href="/login" className="absolute top-6 left-6 inline-flex items-center text-sm text-muted-foreground hover:text-white transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Login
                </Link>

                <div className="w-full max-w-[400px] space-y-8">
                    <div className="space-y-2 text-center lg:text-left">
                        <h1 className="text-3xl font-bold tracking-tight text-white">Forgot Password?</h1>
                        <p className="text-muted-foreground">Don't worry, we'll send you reset instructions.</p>
                    </div>

                    {!issubmitted ? (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email Address</Label>
                                <div className="relative group">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"><Mail size={18} /></div>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className="pl-10 h-12 bg-white/5 border-white/10 focus:border-primary/50 focus:bg-white/10 rounded-xl transition-all"
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            <Button type="submit" disabled={isLoading} className="w-full h-12 rounded-xl font-bold text-base bg-white text-black hover:bg-gray-200 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-white/10">
                                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Reset Password"}
                            </Button>
                        </form>
                    ) : (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="p-6 rounded-2xl bg-green-500/10 border border-green-500/20 text-center space-y-4">
                                <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle size={32} />
                                </div>
                                <h3 className="text-xl font-semibold text-white">Check your email</h3>
                                <p className="text-muted-foreground text-sm">
                                    We have sent password reset instructions to <span className="text-white font-medium">{email}</span>
                                </p>
                            </div>

                            <div className="space-y-3">
                                <p className="text-center text-xs text-muted-foreground">
                                    Did not receive the email? Check your spam filter or
                                </p>
                                <Button
                                    variant="outline"
                                    onClick={() => setIsSubmitted(false)}
                                    className="w-full h-12 rounded-xl border-white/10 hover:bg-white/5 text-muted-foreground hover:text-white"
                                >
                                    try another email address
                                </Button>
                            </div>

                            {/* Temporary link for demo ONLY since backend is not connected */}
                            <div className="pt-8 border-t border-white/5 text-center">
                                <p className="text-xs text-muted-foreground mb-3 uppercase tracking-widest opacity-50">Demo Only</p>
                                <Link href="/reset-password">
                                    <Button variant="ghost" className="text-xs text-primary hover:text-primary/80 group">
                                        Go to Reset Page <ArrowRight className="ml-1 w-3 h-3 transition-transform group-hover:translate-x-1" />
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
