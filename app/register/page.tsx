"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Loader2, AlertCircle, Lock, Mail, User, Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"
import { authService } from "@/app/services/authService"

function RegisterPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [error, setError] = useState("")

  // Get redirect params from URL (to preserve through registration)
  const redirectUrl = searchParams.get("redirect")
  const planId = searchParams.get("planId")

  // Build login URL with preserved params
  const getLoginUrl = () => {
    if (redirectUrl) {
      const params = new URLSearchParams()
      params.set("redirect", redirectUrl)
      if (planId) params.set("planId", planId)
      return `/login?${params.toString()}`
    }
    return "/login"
  }

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user" // Default role
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validation
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("All fields are required.")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.")
      return
    }

    if (!agreedToTerms) {
      setError("You must agree to the Terms & Conditions.")
      return
    }

    setIsLoading(true)

    try {
      await authService.register({
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role
      })

      toast.success("Registration Successful!", {
        description: "Please check your email to verify your account."
      })

      // Redirect to login with preserved params
      router.push(getLoginUrl())
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2 bg-[#0A0A0A] text-foreground overflow-hidden">
      {/* Visual Section - Left */}
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
            "Join thousands of businesses building their digital future with us."
          </blockquote>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <div className="h-px w-8 bg-white/20" />
            <span>Start Your Journey Today</span>
          </div>
        </div>
      </div>

      {/* Form Section - Right */}
      <div className="flex items-center justify-center p-6 md:p-12 relative">
        <Link href="/" className="absolute top-6 left-6 lg:hidden inline-flex items-center text-sm text-muted-foreground hover:text-white transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Link>

        <div className="w-full max-w-[420px] space-y-8">
          <div className="space-y-2 text-center lg:text-left">
            <h1 className="text-3xl font-bold tracking-tight text-white">Create Account</h1>
            <p className="text-muted-foreground">Start your 14-day free trial. No credit card required.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3 text-red-400 text-sm animate-in slide-in-from-top-2">
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                {error}
              </div>
            )}

            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Full Name</Label>
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"><User size={18} /></div>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="pl-10 h-12 bg-white/5 border-white/10 focus:border-primary/50 focus:bg-white/10 rounded-xl transition-all"
                  disabled={isLoading}
                />
              </div>

              {/* Role selection removed - Public registration is Client only */}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</Label>
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"><Mail size={18} /></div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="pl-10 h-12 bg-white/5 border-white/10 focus:border-primary/50 focus:bg-white/10 rounded-xl transition-all"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</Label>
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
              <p className="text-xs text-muted-foreground">Must be at least 8 characters</p>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Confirm Password</Label>
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
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start gap-3">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                className="mt-0.5 border-white/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                I agree to the <Link href="/terms" className="text-primary hover:underline" target="_blank">Terms of Service</Link> and <Link href="/privacy" className="text-primary hover:underline" target="_blank">Privacy Policy</Link>
              </label>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full h-12 rounded-xl font-bold text-base bg-white text-black hover:bg-gray-200 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-white/10">
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Account"}
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href={getLoginUrl()} className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// Loading fallback
function RegisterLoading() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#0A0A0A]">
      <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
    </div>
  )
}

// Main page with Suspense wrapper
export default function RegisterPage() {
  return (
    <Suspense fallback={<RegisterLoading />}>
      <RegisterPageContent />
    </Suspense>
  )
}
