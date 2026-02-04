"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Loader2, AlertCircle, Lock, Mail } from "lucide-react"
import { toast } from "sonner"
import { authService } from "@/app/services/authService"

function LoginPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  // Get redirect params from URL
  const redirectUrl = searchParams.get("redirect")
  const planId = searchParams.get("planId")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      await authService.login({
        email,
        password
      })

      // Fetch user profile to get role
      const user = await authService.getMe();
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem("userRole", user.role);
        // Optional: Store other user info if needed
        localStorage.setItem("userName", user.name);
        localStorage.setItem("userEmail", user.email);
      }

      toast.success("Login Successful", { description: "Welcome back, " + user.name })

      // Handle redirect after login
      if (redirectUrl) {
        // If there's a redirect URL, go there (optionally with planId)
        const targetUrl = planId ? `${redirectUrl}?planId=${planId}` : redirectUrl
        router.push(targetUrl)
      } else {
        // Default redirect to dashboard
        router.push("/dashboard")
      }
    } catch (err: any) {
      setError(err.message || "Invalid credentials.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2 bg-[#0A0A0A] text-foreground overflow-hidden">
      {/* --- BAGIAN KIRI: Visual (Sama seperti sebelumnya) --- */}
      <div className="hidden lg:flex relative flex-col justify-between p-12 bg-[#111111] border-r border-white/5">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-30" />
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
            "Collaborate seamlessly. Track progress in real-time. Build the future together."
          </blockquote>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <div className="h-px w-8 bg-white/20" />
            <span>Portal Access v2.0</span>
          </div>
        </div>
      </div>

      {/* --- BAGIAN KANAN: Form --- */}
      <div className="flex items-center justify-center p-6 md:p-12 relative">
        <Link href="/" className="absolute top-6 left-6 lg:hidden inline-flex items-center text-sm text-muted-foreground hover:text-white transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Link>

        <div className="w-full max-w-[400px] space-y-8">
          <div className="space-y-2 text-center lg:text-left">
            <h1 className="text-3xl font-bold tracking-tight text-white">Access Portal</h1>
            <p className="text-muted-foreground">Login as Admin or Client to continue.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3 text-red-400 text-sm animate-in slide-in-from-top-2">
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                {error}
              </div>
            )}

            {/* Input Email & Password sama seperti sebelumnya */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</Label>
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"><Mail size={18} /></div>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@digado.in" className="pl-10 h-12 bg-white/5 border-white/10 focus:border-primary/50 focus:bg-white/10 rounded-xl transition-all" disabled={isLoading} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</Label>
                <Link href="#" className="text-xs text-primary hover:text-primary/80 hover:underline transition-colors">Forgot password?</Link>
              </div>
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"><Lock size={18} /></div>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="pl-10 h-12 bg-white/5 border-white/10 focus:border-primary/50 focus:bg-white/10 rounded-xl transition-all tracking-widest" disabled={isLoading} />
              </div>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full h-12 rounded-xl font-bold text-base bg-white text-black hover:bg-gray-200 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-white/10">
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href={redirectUrl || planId ? `/register?${new URLSearchParams({ ...(redirectUrl && { redirect: redirectUrl }), ...(planId && { planId }) }).toString()}` : "/register"}
              className="text-primary hover:underline font-medium"
            >
              Sign up
            </Link>
          </div>

          <div className="mt-4 text-xs text-center text-muted-foreground bg-white/5 p-3 rounded-lg border border-white/5">
            <p>Admin: <span className="text-white">admin@digado.in</span> / <span className="text-white">admin123</span></p>
            <p>Client: <span className="text-white">client@digado.in</span> / <span className="text-white">client123</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Loading fallback
function LoginLoading() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#0A0A0A]">
      <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
    </div>
  )
}

// Main page with Suspense wrapper
export default function LoginPage() {
  return (
    <Suspense fallback={<LoginLoading />}>
      <LoginPageContent />
    </Suspense>
  )
}