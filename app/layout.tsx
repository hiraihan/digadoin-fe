import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
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
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-foreground selection:bg-primary/20 selection:text-primary`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
