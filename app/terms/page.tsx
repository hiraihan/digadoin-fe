"use client"

import { useEffect, useState } from "react"
import { contentService } from "@/app/services/contentService"
import { LandingPageContent } from "@/app/types/content"
import { Loader2 } from "lucide-react"

export default function TermsPage() {
    // We are reusing the LandingPageContent type for now, but in reality 
    // the CMS might return a simple object like { title: string, body: string } 
    // or we parse a specific structure. 
    // For this MVP, let's assume the 'hero' part of the content holds the title and 'services' or a new field holds the text.
    // OR we just use a generic state and handle whatever the API returns.
    // Given the current 'contentService' logic, it expects a full LandingPageContent structure.
    // We might need to adjust the service or just mock the data for now if the API doesn't support 'terms' slug yet.

    // However, the plan said "Use contentService.get('terms-of-service')".
    // I will implement a basic UI that displays a loading state and then the content.
    // Since the type is strict, I will cast or handle it flexibly.

    const [content, setContent] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        contentService.get("terms-of-service").then((data) => {
            setContent(data)
            setLoading(false)
        }).catch(() => {
            setLoading(false)
        })
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background pt-24 pb-12 px-6 md:px-12">
            <div className="max-w-4xl mx-auto space-y-8">
                <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
                <div className="prose prose-invert max-w-none text-muted-foreground">
                    {/* Fallback content if API returns empty/default 'home' structure for unknown slug */}
                    {content?.title ? (
                        <>
                            <h1>{content.title}</h1>
                            <div dangerouslySetInnerHTML={{ __html: content.body || "" }} />
                        </>
                    ) : (
                        // Default static content for MVP if API is not ready
                        <div className="space-y-6">
                            <p>Last updated: January 1, 2026</p>

                            <section>
                                <h2 className="text-2xl font-semibold text-foreground mb-4">1. Agreement to Terms</h2>
                                <p>By accessing our website and using our services, you agree to be bound by these Terms of Service.</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-foreground mb-4">2. Use of License</h2>
                                <p>Permission is granted to temporarily download one copy of the materials (information or software) on Digado.in's website for personal, non-commercial transitory viewing only.</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-foreground mb-4">3. Disclaimer</h2>
                                <p>The materials on Digado.in's website are provided on an 'as is' basis. Digado.in makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
                            </section>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
