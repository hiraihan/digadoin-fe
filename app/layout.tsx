import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider" // 1. Import ThemeProvider
import { Navbar } from "@/components/navbar" // 2. Import Navbar
import { Footer } from "@/components/footer" // 3. Import Footer
import { Toaster } from "sonner" // 4. Import Toaster (pastikan import sesuai lokasi komponen UI sonner Anda jika ada custom wrapper)
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: "NexusDev - Premium Digital Solutions",
  description:
    "We build scalable digital empires. Specialized in high-performance LMS, Marketplaces, and Custom Web Applications.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning> {/* Tambahkan suppressHydrationWarning untuk next-themes */}
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-foreground selection:bg-primary/20 selection:text-primary`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark" // Default tema
          enableSystem
          disableTransitionOnChange
        >
          {/* Layout Global: Navbar selalu di atas */}
          <div className="flex min-h-screen flex-col">
            <Navbar /> 
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          
          <Toaster position="top-center" /> {/* Area notifikasi global */}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}