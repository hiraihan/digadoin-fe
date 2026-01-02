import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] opacity-50" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] opacity-50" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
            </div>

            <div className="relative z-10 text-center max-w-lg mx-auto">
                {/* 404 Number */}
                <div className="relative mb-8">
                    <h1 className="text-[150px] md:text-[200px] font-bold text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5 leading-none select-none">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
                            <div className="w-16 h-16 rounded-full bg-primary/30 flex items-center justify-center">
                                <div className="w-8 h-8 rounded-full bg-primary" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Message */}
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Page Not Found
                </h2>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                    Oops! The page you're looking for doesn't exist or has been moved.
                    Let's get you back on track.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/">
                        <Button className="w-full sm:w-auto bg-white text-black hover:bg-gray-200 rounded-xl h-12 px-6 font-bold shadow-lg shadow-white/10">
                            <Home className="w-4 h-4 mr-2" />
                            Go Home
                        </Button>
                    </Link>
                    <Button
                        variant="outline"
                        onClick={() => window.history.back()}
                        className="w-full sm:w-auto border-white/10 bg-white/5 text-white hover:bg-white/10 rounded-xl h-12 px-6"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Go Back
                    </Button>
                </div>

                {/* Additional Help */}
                <p className="text-sm text-muted-foreground mt-12">
                    Need help?{" "}
                    <Link href="/dashboard/support" className="text-primary hover:underline">
                        Contact Support
                    </Link>
                </p>
            </div>
        </div>
    )
}
