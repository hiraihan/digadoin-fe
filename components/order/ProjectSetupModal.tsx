"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Globe, Loader2 } from "lucide-react"

interface ProjectSetupModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: (details: { name: string; subdomain: string; description: string }) => Promise<void>
    planName: string
}

export function ProjectSetupModal({ isOpen, onClose, onConfirm, planName }: ProjectSetupModalProps) {
    const [name, setName] = useState("")
    const [subdomain, setSubdomain] = useState("")
    const [description, setDescription] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (!name || !subdomain) {
            setError("Please fill in all required fields")
            return
        }

        if (!/^[a-z0-9-]+$/.test(subdomain)) {
            setError("Subdomain can only contain lowercase letters, numbers, and hyphens")
            return
        }

        setIsLoading(true)
        try {
            await onConfirm({ name, subdomain, description })
        } catch (err) {
            console.error(err)
            setError("Failed to process order. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value
        setName(newName)
        if (!subdomain) {
            setSubdomain(newName.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-"))
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !isLoading && !open && onClose()}>
            <DialogContent className="sm:max-w-[500px] bg-[#1a1a1a] border-white/10 text-white">
                <DialogHeader>
                    <DialogTitle className="text-xl">Setup Your Project</DialogTitle>
                    <DialogDescription className="text-gray-400">
                        Configure your new website details for the <strong>{planName}</strong>.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 py-4">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-white">Project Name <span className="text-red-500">*</span></Label>
                            <Input
                                id="name"
                                placeholder="e.g. My Awesome Store"
                                value={name}
                                onChange={handleNameChange}
                                disabled={isLoading}
                                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="subdomain" className="text-white">Subdomain <span className="text-red-500">*</span></Label>
                            <div className="flex rounded-md shadow-sm">
                                <Input
                                    id="subdomain"
                                    placeholder="my-store"
                                    value={subdomain}
                                    onChange={(e) => setSubdomain(e.target.value.toLowerCase())}
                                    disabled={isLoading}
                                    className="rounded-r-none bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                                />
                                <div className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-white/10 bg-white/10 text-gray-400 text-sm select-none">
                                    .digado.in
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                                <Globe className="w-3 h-3" />
                                Preview: https://{subdomain || "your-site"}.digado.in
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-white">Description <span className="text-xs text-gray-500">(Optional)</span></Label>
                            <Textarea
                                id="description"
                                placeholder="Briefly describe your website..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                disabled={isLoading}
                                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 min-h-[100px]"
                            />
                        </div>

                        {error && (
                            <div className="text-red-400 text-sm bg-red-400/10 p-3 rounded-md border border-red-400/20">
                                {error}
                            </div>
                        )}
                    </div>

                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={isLoading}
                            className="border-white/10 bg-transparent text-white hover:bg-white/5"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading || !name || !subdomain}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating Order...
                                </>
                            ) : (
                                "Continue to Payment"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
