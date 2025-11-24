import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-6 relative overflow-hidden page-transition">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 grid-pattern opacity-30"></div>
      <div className="absolute inset-0 -z-10 mesh-gradient"></div>

      <div className="w-full max-w-md space-y-8 relative z-10">
        <div className="flex flex-col items-center text-center">
          <Link href="/" className="flex items-center gap-2.5 font-semibold text-2xl tracking-tight mb-10 group">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white font-bold text-lg shadow-lg shadow-primary/30 group-hover:shadow-primary/50 group-hover:scale-105 transition-all duration-300">
              N
            </div>
            <span>NexusDev</span>
          </Link>
          <h1 className="text-4xl font-bold tracking-tight mb-3">Welcome back</h1>
          <p className="text-muted-foreground text-lg font-light">Enter your credentials to access your dashboard</p>
        </div>

        <div className="glass-card rounded-2xl p-8 md:p-10 shadow-2xl">
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input id="email" type="email" placeholder="name@example.com" className="h-11 rounded-lg" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <Link href="#" className="text-sm text-primary hover:underline font-medium">
                  Forgot password?
                </Link>
              </div>
              <Input id="password" type="password" className="h-11 rounded-lg" placeholder="••••••••" />
            </div>
            <Button
              className="w-full h-11 rounded-xl font-medium shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.01] transition-all duration-300"
              size="lg"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/start-project" className="text-primary hover:underline font-medium">
              Start a Project
            </Link>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground font-medium transition-colors group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
