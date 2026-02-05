"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const pathname = usePathname()

  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true) // Start loading by default

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    const verifyAuth = async () => {
      const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null

      // Strict check to avoid "null" or "undefined" strings
      if (!token || token === "null" || token === "undefined") {
        setIsLoggedIn(false)
        setIsLoading(false) // Stop loading immediately if no token
        return
      }

      try {
        const { authService } = await import("@/app/services/authService")
        // Use skipGlobalError to avoid redirecting/clearing token if check fails
        await authService.getMe({ skipGlobalError: true })
        setIsLoggedIn(true)
      } catch (e) {
        console.warn("Token validation failed (silent)", e)
        // Do NOT remove token here to prevent accidental logout on network glitches
        // localStorage.removeItem("token") 
        setIsLoggedIn(false)
      } finally {
        setIsLoading(false) // Stop loading after check completes
      }
    }

    verifyAuth()

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pathname])

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#") && pathname === "/") {
      e.preventDefault()
      const targetId = href.replace("/#", "")
      const element = document.getElementById(targetId)
      if (element) {
        const headerOffset = 80
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
      setIsOpen(false)
    }
  }

  const navLinks = [
    { name: "Services", href: "/#services" },
    { name: "Projects", href: "/#projects" },
    { name: "Process", href: "/#process" },
    { name: "Pricing", href: "/#pricing" },
    { name: "About", href: "/about" },
  ]

  if (pathname?.startsWith("/dashboard") || pathname?.startsWith("/payment") || pathname === "/login" || pathname === "/register" || pathname === "/terms" || pathname === "/privacy" || pathname === "/check-email" || pathname === "/verify-email" || pathname === "/forgot-password" || pathname === "/reset-password") {
    return null
  }

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500 ease-out border-b",
        scrolled
          ? "bg-background/80 backdrop-blur-2xl border-border/40 shadow-lg"
          : "bg-transparent border-transparent",
      )}
    >
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-[10px] bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white font-bold text-lg shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-all duration-300 group-hover:scale-105">
            D
          </div>
          <span className="text-lg md:text-xl font-semibold tracking-tight">digado.in</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className={cn(
                  "px-4 py-2 text-[15px] font-medium rounded-lg transition-all duration-200 ease-out relative",
                  isActive
                    ? "text-foreground bg-secondary/50"
                    : "text-foreground/70 hover:text-foreground hover:bg-secondary/30",
                )}
              >
                {link.name}
              </Link>
            )
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {isLoading ? (
            // Skeleton Loader
            <>
              <div className="w-20 h-9 rounded-lg bg-white/5 animate-pulse" />
              <div className="w-32 h-11 rounded-xl bg-primary/20 animate-pulse" />
            </>
          ) : isLoggedIn ? (
            <Link
              href="/dashboard"
              className="px-4 py-2 text-[15px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 text-[15px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Log in
            </Link>
          )}
          {!isLoading && (
            <Button
              asChild
              className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 hover:scale-[1.02] font-medium px-6"
            >
              <Link href="/start-project">Start Project</Link>
            </Button>
          )}
        </div>

        <button
          className="md:hidden p-2 text-foreground hover:bg-secondary/30 rounded-lg transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-2xl border-b border-border/40 shadow-xl animate-in slide-in-from-top-3 duration-300">
          <div className="p-4 flex flex-col gap-2 max-w-[1600px] mx-auto">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="text-base font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/30 py-3 px-4 rounded-lg transition-all duration-200"
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border/40">
              {isLoggedIn ? (
                <Link
                  href="/dashboard"
                  className="text-center py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/30 rounded-lg transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="text-center py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/30 rounded-lg transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Log in
                </Link>
              )}
              <Button
                asChild
                className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg font-medium"
              >
                <Link href="/start-project" onClick={() => setIsOpen(false)}>
                  Start Project
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}