"use client"

import { MessageCircle, X } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export function FloatingContact() {
    const [isOpen, setIsOpen] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true)
        }, 2000) // Show after 2 seconds

        return () => clearTimeout(timer)
    }, [])

    const handleWhatsAppClick = () => {
        // Replace with actual phone number
        const phoneNumber = "6282333016806"
        const message = encodeURIComponent("Halo Digadoin, saya ingin konsultasi tentang pembuatan website/aplikasi.")
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank")
    }

    if (!isVisible) return null

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="bg-card/80 backdrop-blur-xl border border-primary/20 p-4 rounded-2xl shadow-2xl mb-2 w-72 glass-panel"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-lg text-primary">Butuh Bantuan?</h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                            Konsultasikan kebutuhan digital Anda dengan tim ahli kami sekarang.
                        </p>
                        <Button
                            onClick={handleWhatsAppClick}
                            className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold shadow-lg hover:shadow-[#25D366]/20 transition-all rounded-xl"
                        >
                            <MessageCircle className="mr-2 h-4 w-4" />
                            Chat via WhatsApp
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="relative group flex items-center justify-center w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-primary/40 transition-all duration-300"
            >
                <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping opacity-20 duration-1000"></div>
                {isOpen ? (
                    <X className="w-6 h-6 transition-transform duration-300 rotate-90" />
                ) : (
                    <MessageCircle className="w-6 h-6 transition-transform duration-300" />
                )}

                {!isOpen && (
                    <span className="absolute right-full mr-4 bg-background/80 backdrop-blur px-3 py-1 rounded-lg text-sm font-medium border border-border/50 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block">
                        Konsultasi Gratis
                    </span>
                )}
            </motion.button>
        </div>
    )
}
