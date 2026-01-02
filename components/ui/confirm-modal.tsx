"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Trash2, X, Loader2, AlertCircle, Info } from "lucide-react"
import { LucideIcon } from "lucide-react"

type ModalVariant = "danger" | "warning" | "info"

interface ConfirmModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void | Promise<void>
    title: string
    description?: string
    confirmLabel?: string
    cancelLabel?: string
    variant?: ModalVariant
    icon?: LucideIcon
}

const variantConfig: Record<ModalVariant, { icon: LucideIcon; iconBg: string; iconColor: string; buttonClass: string }> = {
    danger: {
        icon: Trash2,
        iconBg: "bg-red-500/10 border-red-500/20",
        iconColor: "text-red-500",
        buttonClass: "bg-red-500 hover:bg-red-600 text-white",
    },
    warning: {
        icon: AlertTriangle,
        iconBg: "bg-yellow-500/10 border-yellow-500/20",
        iconColor: "text-yellow-500",
        buttonClass: "bg-yellow-500 hover:bg-yellow-600 text-black",
    },
    info: {
        icon: Info,
        iconBg: "bg-blue-500/10 border-blue-500/20",
        iconColor: "text-blue-500",
        buttonClass: "bg-blue-500 hover:bg-blue-600 text-white",
    },
}

export function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    variant = "danger",
    icon,
}: ConfirmModalProps) {
    const [isLoading, setIsLoading] = useState(false)
    const config = variantConfig[variant]
    const Icon = icon || config.icon

    const handleConfirm = async () => {
        setIsLoading(true)
        try {
            await onConfirm()
            onClose()
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-md mx-4 bg-[#111111] border border-white/10 rounded-3xl shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 p-6">
                {/* Close button */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="absolute top-4 right-4 text-muted-foreground hover:text-white hover:bg-white/5 rounded-xl"
                >
                    <X size={18} />
                </Button>

                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center mx-auto mb-6 ${config.iconBg}`}>
                    <Icon className={`w-7 h-7 ${config.iconColor}`} />
                </div>

                {/* Content */}
                <div className="text-center mb-6">
                    <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
                    {description && (
                        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
                    )}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        disabled={isLoading}
                        className="flex-1 h-12 border-white/10 bg-white/5 text-white hover:bg-white/10 rounded-xl"
                    >
                        {cancelLabel}
                    </Button>
                    <Button
                        onClick={handleConfirm}
                        disabled={isLoading}
                        className={`flex-1 h-12 rounded-xl font-bold ${config.buttonClass}`}
                    >
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : confirmLabel}
                    </Button>
                </div>
            </div>
        </div>
    )
}

// Pre-built confirmation modals
export function DeleteConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    itemName = "this item",
}: {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void | Promise<void>
    itemName?: string
}) {
    return (
        <ConfirmModal
            isOpen={isOpen}
            onClose={onClose}
            onConfirm={onConfirm}
            title="Delete Item?"
            description={`Are you sure you want to delete ${itemName}? This action cannot be undone.`}
            confirmLabel="Delete"
            variant="danger"
        />
    )
}

export function LogoutConfirmModal({
    isOpen,
    onClose,
    onConfirm,
}: {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void | Promise<void>
}) {
    return (
        <ConfirmModal
            isOpen={isOpen}
            onClose={onClose}
            onConfirm={onConfirm}
            title="Log Out?"
            description="Are you sure you want to log out of your account?"
            confirmLabel="Log Out"
            variant="warning"
        />
    )
}
