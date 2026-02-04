"use client"

import { useEffect, useState } from "react"
import { contentService } from "@/app/services/contentService"
import { Loader2 } from "lucide-react"

export default function PrivacyPage() {
    const [content, setContent] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        contentService.get("privacy-policy").then((data) => {
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
                <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
                <div className="prose prose-invert max-w-none text-muted-foreground">
                    {content?.title ? (
                        <>
                            <h1>{content.title}</h1>
                            <div dangerouslySetInnerHTML={{ __html: content.body || "" }} />
                        </>
                    ) : (
                        // Default static content for MVP
                        <div className="space-y-6">
                            <p>Last updated: January 1, 2026</p>

                            <section>
                                <h2 className="text-2xl font-semibold text-foreground mb-4">1. Information We Collect</h2>
                                <p>We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us for support.</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-foreground mb-4">2. How We Use Your Information</h2>
                                <p>We use the information we collect to operate, maintain, and improve our services, to enhance your user experience, and to communicate with you.</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-foreground mb-4">3. Data Security</h2>
                                <p>We implement reasonable security measures to help protect the security of your information both online and offline.</p>
                            </section>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
