"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Loader2, Lock, AlertCircle, Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"

export default function ResetPasswordPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (password.length < 8) {
            setError("Password must be at least 8 characters.")
            return
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.")
            return
        }

        setIsLoading(true)

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            toast.success("Password Reset Successful", {
                description: "You can now login with your new password."
            })
            router.push("/login")
        }, 1500)
    }

    return (
        <div className="w-full min-h-screen lg:grid lg:grid-cols-2 bg-[#0A0A0A] text-foreground overflow-hidden">
            {/* --- LEFT SIDE: Visual --- */}
            <div className="hidden lg:flex relative flex-col justify-between p-12 bg-[#111111] border-r border-white/5">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-30" />
                    <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] opacity-30" />
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-auto opacity-40 rotate-[-12deg] hover:rotate-[-10deg] hover:scale-105 transition-all duration-1000 ease-in-out grayscale hover:grayscale-0">
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
                        "Secure your account with a strong password to keep your data safe."
                    </blockquote>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <div className="h-px w-8 bg-white/20" />
                        <span>Reset Password</span>
                    </div>
                </div>
            </div>

            {/* --- RIGHT SIDE: Form --- */}
            <div className="flex items-center justify-center p-6 md:p-12 relative">
                <div className="w-full max-w-[400px] space-y-8">
                    <div className="space-y-2 text-center lg:text-left">
                        <h1 className="text-3xl font-bold tracking-tight text-white">Set New Password</h1>
                        <p className="text-muted-foreground">Please create a new password for your account.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3 text-red-400 text-sm animate-in slide-in-from-top-2">
                                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">New Password</Label>
                            <div className="relative group">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"><Lock size={18} /></div>
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="•••••••"
                                    className="pl-10 pr-10 h-12 bg-white/5 border-white/10 focus:border-primary/50 focus:bg-white/10 rounded-xl transition-all"
                                    required
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Confirm Password</Label>
                            <div className="relative group">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"><Lock size={18} /></div>
                                <Input
                                    id="confirmPassword"
                                    type={showPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="•••••••"
                                    className="pl-10 h-12 bg-white/5 border-white/10 focus:border-primary/50 focus:bg-white/10 rounded-xl transition-all"
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        <Button type="submit" disabled={isLoading} className="w-full h-12 rounded-xl font-bold text-base bg-white text-black hover:bg-gray-200 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-white/10">
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Update Password"}
                        </Button>
                    </form>
                    <div className="text-center">
                        <Link href="/login" className="inline-flex items-center text-sm text-muted-foreground hover:text-white transition-colors">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Cancel
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
