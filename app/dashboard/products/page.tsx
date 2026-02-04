"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash, Github } from "lucide-react"
import { toast } from "sonner"
import { PricingPlan, Template } from "@/app/types/product"
import { productService } from "@/app/services/productService"
import { Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProductDialog } from "@/app/components/dashboard/products/ProductDialog"
import { DeleteConfirmModal } from "@/components/ui/confirm-modal"
import { formatCurrency } from "@/lib/formatters"

export default function ProductsPage() {
    const [plans, setPlans] = useState<PricingPlan[]>([])
    const [templates, setTemplates] = useState<Template[]>([])
    const [loading, setLoading] = useState(true)

    // Dialog State
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [dialogType, setDialogType] = useState<"plan" | "template">("plan")
    const [editingItem, setEditingItem] = useState<PricingPlan | Template | null>(null)

    // Delete State
    const [deleteItem, setDeleteItem] = useState<{ id: number, type: "plan" | "template" } | null>(null)

    const fetchData = async () => {
        setLoading(true)
        try {
            const [plansData, templatesData] = await Promise.all([
                productService.getPricingPlans(),
                productService.getTemplates()
            ])
            setPlans(plansData)
            setTemplates(templatesData)
        } catch (error) {
            toast.error("Failed to load products")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleCreate = (type: "plan" | "template") => {
        setDialogType(type)
        setEditingItem(null)
        setIsDialogOpen(true)
    }

    const handleEdit = (item: PricingPlan | Template, type: "plan" | "template") => {
        setDialogType(type)
        setEditingItem(item)
        setIsDialogOpen(true)
    }

    const handleDelete = (id: number, type: "plan" | "template") => {
        setDeleteItem({ id, type })
    }

    const confirmDelete = async () => {
        if (!deleteItem) return
        try {
            if (deleteItem.type === 'plan') {
                await productService.deletePricingPlan(deleteItem.id)
                setPlans(prev => prev.filter(p => p.id !== deleteItem.id))
            } else {
                await productService.deleteTemplate(deleteItem.id)
                setTemplates(prev => prev.filter(t => t.id !== deleteItem.id))
            }
            toast.success("Item deleted successfully")
        } catch (error) {
            toast.error("Failed to delete item")
        } finally {
            setDeleteItem(null)
        }
    }

    const handleSubmit = async (data: any) => {
        try {
            if (dialogType === 'plan') {
                if (editingItem) {
                    const res = await productService.updatePricingPlan(editingItem.id, data)
                    setPlans(prev => prev.map(p => p.id === editingItem.id ? res : p))
                    toast.success("Plan updated")
                } else {
                    const res = await productService.createPricingPlan(data)
                    setPlans(prev => [...prev, res])
                    toast.success("Plan created")
                }
            } else {
                if (editingItem) {
                    const res = await productService.updateTemplate(editingItem.id, data)
                    setTemplates(prev => prev.map(t => t.id === editingItem.id ? res : t))
                    toast.success("Template updated")
                } else {
                    const res = await productService.createTemplate(data)
                    setTemplates(prev => [...prev, res])
                    toast.success("Template created")
                }
            }
        } catch (e) {
            toast.error("Operation failed")
        }
    }

    return (
        <div className="space-y-8 pb-20">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Products Management</h1>
                    <p className="text-muted-foreground">Manage pricing plans and templates.</p>
                </div>
            </div>

            <Tabs defaultValue="plans" className="space-y-6" onValueChange={(val) => setDialogType(val as any)}>
                <div className="flex justify-between items-center">
                    <TabsList className="bg-white/5 border-white/5">
                        <TabsTrigger value="plans">Pricing Plans</TabsTrigger>
                        <TabsTrigger value="templates">Templates</TabsTrigger>
                    </TabsList>
                    <Button onClick={() => handleCreate(dialogType)}>
                        <Plus className="mr-2 h-4 w-4" /> Add New {dialogType === 'plan' ? 'Plan' : 'Template'}
                    </Button>
                </div>

                <TabsContent value="plans" className="space-y-6">
                    {loading ? (
                        <div className="flex justify-center p-8"><Loader2 className="animate-spin text-white" /></div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {plans.map(plan => (
                                <Card key={plan.id} className="bg-[#111111]/80 border-white/5 backdrop-blur-xl text-white">
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <CardTitle>{plan.name}</CardTitle>
                                            <Badge variant={plan.is_active ? "default" : "secondary"}>{plan.is_active ? "Active" : "Inactive"}</Badge>
                                        </div>
                                        <CardDescription>{plan.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold mb-4">
                                            {formatCurrency(plan.price, 'compact')} <span className="text-sm font-normal text-muted-foreground">/ {plan.duration_months} bulan</span>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-end gap-2">
                                        <Button variant="outline" size="sm" onClick={() => handleEdit(plan, 'plan')}><Edit className="w-4 h-4" /></Button>
                                        <Button variant="destructive" size="sm" onClick={() => handleDelete(plan.id, 'plan')}><Trash className="w-4 h-4" /></Button>
                                    </CardFooter>
                                </Card>
                            ))}
                            {plans.length === 0 && <div className="text-muted-foreground col-span-full text-center py-10">No pricing plans found.</div>}
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="templates" className="space-y-6">
                    {loading ? (
                        <div className="flex justify-center p-8"><Loader2 className="animate-spin text-white" /></div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {templates.map(template => (
                                <Card key={template.id} className="bg-[#111111]/80 border-white/5 backdrop-blur-xl text-white overflow-hidden">
                                    {template.thumbnail_url && (
                                        <div className="h-40 w-full bg-cover bg-center" style={{ backgroundImage: `url(${template.thumbnail_url})` }} />
                                    )}
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <CardTitle className="text-lg">{template.name}</CardTitle>
                                            <Badge variant={template.is_active ? "default" : "secondary"}>{template.is_active ? "Active" : "Inactive"}</Badge>
                                        </div>
                                        <CardDescription className="line-clamp-2">{template.description}</CardDescription>
                                        {template.repo_url && (
                                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                                                <Github className="w-3 h-3" />
                                                <span className="truncate max-w-[200px]">{template.repo_url}</span>
                                            </div>
                                        )}
                                    </CardHeader>
                                    <CardFooter className="flex justify-end gap-2">
                                        <Button variant="outline" size="sm" onClick={() => handleEdit(template, 'template')}><Edit className="w-4 h-4" /></Button>
                                        <Button variant="destructive" size="sm" onClick={() => handleDelete(template.id, 'template')}><Trash className="w-4 h-4" /></Button>
                                    </CardFooter>
                                </Card>
                            ))}
                            {templates.length === 0 && <div className="text-muted-foreground col-span-full text-center py-10">No templates found.</div>}
                        </div>
                    )}
                </TabsContent>
            </Tabs>

            <ProductDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onSubmit={handleSubmit}
                type={dialogType}
                item={editingItem}
            />

            <DeleteConfirmModal
                isOpen={!!deleteItem}
                onClose={() => setDeleteItem(null)}
                onConfirm={confirmDelete}
                itemName="this item"
            />
        </div>
    )
}
