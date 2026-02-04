"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { PricingPlan, Template } from "@/app/types/product"

interface ProductDialogProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: any) => Promise<void>
    type: "plan" | "template"
    item?: PricingPlan | Template | null // If null, it's create mode
}

export function ProductDialog({
    isOpen,
    onClose,
    onSubmit,
    type,
    item
}: ProductDialogProps) {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState<any>({
        name: "",
        description: "",
        price: 0,
        duration_months: 1,
        is_active: true,
        thumbnail_url: "",
        preview_url: "",
        repo_url: "",
        category: ""
    })

    useEffect(() => {
        if (item) {
            setFormData({
                ...item,
                price: (item as PricingPlan).price || 0,
                duration_months: (item as PricingPlan).duration_months || 1,
                thumbnail_url: (item as Template).thumbnail_url || "",
                preview_url: (item as Template).preview_url || "",
                repo_url: (item as Template).repo_url || "",
                category: (item as Template).category || ""
            })
        } else {
            // Reset defaults
            setFormData({
                name: "",
                description: "",
                price: 0,
                duration_months: 1,
                is_active: true,
                thumbnail_url: "",
                preview_url: "",
                repo_url: "",
                category: ""
            })
        }
    }, [item, isOpen])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let val: any = e.target.value
        if (e.target.type === 'number') {
            const num = parseFloat(e.target.value)
            val = isNaN(num) ? 0 : num
            if (e.target.value === '') val = '' // Allow typing empty string to clear input temporarily
        }
        setFormData((prev: any) => ({ ...prev, [e.target.name]: val }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            await onSubmit(formData)
            onClose()
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] bg-[#111111] border-white/5 text-white">
                <DialogHeader>
                    <DialogTitle>{item ? "Edit" : "Create"} {type === 'plan' ? "Pricing Plan" : "Template"}</DialogTitle>
                    <DialogDescription>
                        {item ? "Make changes to the existing item here." : "Add a new item to your catalog."}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="col-span-3 bg-white/5 border-white/10"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Desc
                            </Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="col-span-3 bg-white/5 border-white/10"
                            />
                        </div>

                        {type === 'plan' && (
                            <>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="price" className="text-right">Price</Label>
                                    <Input
                                        id="price"
                                        name="price"
                                        type="number"
                                        value={formData.price}
                                        onChange={handleChange}
                                        className="col-span-3 bg-white/5 border-white/10"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="duration" className="text-right">Months</Label>
                                    <Input
                                        id="duration"
                                        name="duration_months"
                                        type="number"
                                        value={formData.duration_months}
                                        onChange={handleChange}
                                        className="col-span-3 bg-white/5 border-white/10"
                                        required
                                    />
                                </div>
                            </>
                        )}

                        {type === 'template' && (
                            <>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="category" className="text-right">Category</Label>
                                    <Input
                                        id="category"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="col-span-3 bg-white/5 border-white/10"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="thumbnail" className="text-right">Thumb URL</Label>
                                    <Input
                                        id="thumbnail"
                                        name="thumbnail_url"
                                        value={formData.thumbnail_url}
                                        onChange={handleChange}
                                        className="col-span-3 bg-white/5 border-white/10"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="repo_url" className="text-right">Repo URL</Label>
                                    <Input
                                        id="repo_url"
                                        name="repo_url"
                                        placeholder="https://github.com/username/repo"
                                        value={formData.repo_url}
                                        onChange={handleChange}
                                        className="col-span-3 bg-white/5 border-white/10"
                                    />
                                </div>
                            </>
                        )}

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="active" className="text-right">Active</Label>
                            <div className="col-span-3 flex items-center space-x-2">
                                <Switch
                                    id="active"
                                    checked={formData.is_active}
                                    onCheckedChange={(checked) => setFormData((prev: any) => ({ ...prev, is_active: checked }))}
                                />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Saving..." : "Save changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    )
}
