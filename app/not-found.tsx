"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Home, AlertCircle } from "lucide-react"

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
            {/* Background Effects */}
            <div className="absolute inset-0 grid-pattern opacity-[0.05] pointer-events-none" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[128px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[128px] pointer-events-none" />

            <div className="relative max-w-lg w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
                <div className="relative mx-auto w-32 h-32 flex items-center justify-center">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
                    <AlertCircle className="w-20 h-20 text-primary relative z-10" />
                </div>

                <div className="space-y-4">
                    <h1 className="text-6xl font-bold tracking-tighter text-white">404</h1>
                    <h2 className="text-2xl font-semibold text-white/90">Page not found</h2>
                    <p className="text-muted-foreground text-lg max-w-sm mx-auto">
                        Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Button
                        asChild
                        variant="outline"
                        className="rounded-xl border-white/10 hover:bg-white/5 h-12 px-6"
                    >
                        <Link href="javascript:history.back()">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Go Back
                        </Link>
                    </Button>
                    <Button
                        asChild
                        className="rounded-xl bg-primary hover:bg-primary/90 h-12 px-6"
                    >
                        <Link href="/">
                            <Home className="w-4 h-4 mr-2" />
                            Return to Home
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
