"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Loader2, AlertCircle, Lock, Eye, EyeOff, CheckCircle2, ShieldCheck } from "lucide-react"
import { toast } from "sonner"

export default function ResetPasswordPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState("")

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    // Password strength calculation
    const getPasswordStrength = (password: string) => {
        let strength = 0
        if (password.length >= 8) strength++
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
        if (/\d/.test(password)) strength++
        if (/[^a-zA-Z0-9]/.test(password)) strength++
        return strength
    }

    const passwordStrength = getPasswordStrength(formData.password)
    const strengthLabels = ["Weak", "Fair", "Good", "Strong"]
    const strengthColors = ["bg-red-500", "bg-yellow-500", "bg-blue-500", "bg-green-500"]

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (!formData.password || !formData.confirmPassword) {
            setError("All fields are required.")
            return
        }

        if (formData.password.length < 8) {
            setError("Password must be at least 8 characters.")
            return
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.")
            return
        }

        setIsLoading(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        setIsLoading(false)
        setIsSuccess(true)
        toast.success("Password Reset!", {
            description: "Your password has been successfully updated."
        })
    }

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-[#0A0A0A] text-foreground p-6 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px] opacity-50" />
                <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] opacity-50" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
            </div>

            <div className="w-full max-w-[420px] relative z-10">
                {/* Back to Login */}
                <Link href="/login" className="inline-flex items-center text-sm text-muted-foreground hover:text-white transition-colors mb-8 group">
                    <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Login
                </Link>

                {!isSuccess ? (
                    /* Reset Form */
                    <div className="p-8 md:p-10 rounded-3xl bg-[#111111]/80 border border-white/5 backdrop-blur-xl shadow-2xl">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                            <ShieldCheck className="w-7 h-7 text-primary" />
                        </div>

                        <div className="space-y-2 mb-8">
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Reset Password</h1>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Create a new password for your account. Make sure it's strong and unique.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3 text-red-400 text-sm animate-in slide-in-from-top-2">
                                    <AlertCircle size={18} className="shrink-0 mt-0.5" />
                                    {error}
                                </div>
                            )}

                            {/* New Password */}
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">New Password</Label>
                                <div className="relative group">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"><Lock size={18} /></div>
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="pl-10 pr-10 h-12 bg-white/5 border-white/10 focus:border-primary/50 focus:bg-white/10 rounded-xl transition-all"
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

                                {/* Password Strength Indicator */}
                                {formData.password && (
                                    <div className="space-y-2 animate-in slide-in-from-top-2">
                                        <div className="flex gap-1">
                                            {[0, 1, 2, 3].map((index) => (
                                                <div
                                                    key={index}
                                                    className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${index < passwordStrength ? strengthColors[passwordStrength - 1] : "bg-white/10"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <p className={`text-xs ${passwordStrength >= 3 ? "text-green-400" : passwordStrength >= 2 ? "text-blue-400" : "text-muted-foreground"}`}>
                                            Password strength: {strengthLabels[passwordStrength - 1] || "Too weak"}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Confirm New Password</Label>
                                <div className="relative group">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"><Lock size={18} /></div>
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="pl-10 pr-10 h-12 bg-white/5 border-white/10 focus:border-primary/50 focus:bg-white/10 rounded-xl transition-all"
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors"
                                    >
                                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                                    <p className="text-xs text-green-400 flex items-center gap-1 animate-in slide-in-from-top-2">
                                        <CheckCircle2 size={12} /> Passwords match
                                    </p>
                                )}
                            </div>

                            <Button type="submit" disabled={isLoading} className="w-full h-12 rounded-xl font-bold text-base bg-white text-black hover:bg-gray-200 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-white/10">
                                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Reset Password"}
                            </Button>
                        </form>
                    </div>
                ) : (
                    /* Success State */
                    <div className="p-8 md:p-10 rounded-3xl bg-[#111111]/80 border border-white/5 backdrop-blur-xl shadow-2xl text-center">
                        <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-8 h-8 text-green-500" />
                        </div>

                        <h1 className="text-2xl font-bold text-white mb-2">Password Updated!</h1>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                            Your password has been successfully reset. You can now login with your new password.
                        </p>

                        <Link href="/login">
                            <Button className="w-full h-12 rounded-xl font-bold bg-white text-black hover:bg-gray-200">
                                Continue to Login
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
