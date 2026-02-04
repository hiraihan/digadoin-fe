"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { transactionService } from "@/app/services/transactionService"
import { authService } from "@/app/services/authService"
import { projectService } from "@/app/services/projectService"
import { Project } from "@/app/types/api"
import { Order } from "@/app/types/transaction"
import { Loader2, CreditCard, Download, ExternalLink, Receipt } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SkeletonTableRow } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatCurrency, formatDate } from "@/lib/formatters"

export default function BillingPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [processingPayment, setProcessingPayment] = useState<number | null>(null)

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await authService.getMe()
        const [ordersData, projectsData] = await Promise.all([
          transactionService.getMyOrders(user.id),
          projectService.getMyProjects()
        ])
        setOrders(ordersData)
        setProjects(projectsData)
      } catch (error) {
        console.error(error)
        toast.error("Failed to load billing history")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handlePay = async (orderId: number) => {
    // Navigate to payment page
    window.location.href = `/payment/${orderId}`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'default' // primary
      case 'pending': return 'secondary' // yellow/secondary
      case 'cancelled': return 'destructive'
      case 'failed': return 'destructive'
      default: return 'outline'
    }
  }

  const downloadBlob = (blob: Blob, orderId: number) => {
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Invoice-${orderId}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  }

  return (
    <div className="space-y-8 pb-20">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Billing & Invoices</h1>
        <p className="text-muted-foreground">Manage your subscription, orders, and download invoices.</p>
      </div>

      <Card className="bg-[#111111]/80 border-white/5 backdrop-blur-xl text-white">
        <CardHeader>
          <CardTitle>Order History</CardTitle>
          <CardDescription>View all your past orders and transactions.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <SkeletonTableRow key={i} />
              ))}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-white/5 hover:bg-white/5">
                  <TableHead className="text-muted-foreground">ID</TableHead>
                  <TableHead className="text-muted-foreground">Item</TableHead>
                  <TableHead className="text-muted-foreground">Amount</TableHead>
                  <TableHead className="text-muted-foreground">Date</TableHead>
                  <TableHead className="text-muted-foreground">Status</TableHead>
                  <TableHead className="text-right text-muted-foreground">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((order) => (
                  <TableRow key={order.id} className="border-white/5 hover:bg-white/5">
                    <TableCell className="font-medium">#{order.id}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-semibold text-white">
                          {projects.find(p => p.order_id === order.id)?.name || order.pricing_plan?.name || "Website Project"}
                        </span>
                        <div className="text-xs text-muted-foreground flex gap-1">
                          <span>{order.pricing_plan?.name || "Standard Plan"}</span>
                          <span>•</span>
                          <span>{order.template?.name || "Base Template"}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{formatCurrency(order.total_price || order.amount || 0)}</TableCell>
                    <TableCell>{formatDate(order.created_at)}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(order.status) as any}>
                        {order.status.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {order.status === 'pending' && (
                        <Button
                          size="sm"
                          variant="default"
                          onClick={() => handlePay(order.id)}
                          disabled={processingPayment === order.id}
                        >
                          {processingPayment === order.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <CreditCard className="w-4 h-4 mr-2" />}
                          Pay Now
                        </Button>
                      )}
                      {order.status === 'paid' && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-white/10 bg-white/5 hover:bg-white/10 text-white"
                          onClick={async () => {
                            try {
                              toast.loading("Downloading invoice...", { id: "invoice-download" })
                              const blob = await transactionService.downloadInvoice(order.id)
                              downloadBlob(blob, order.id)
                              toast.success("Invoice downloaded", { id: "invoice-download" })
                            } catch (e: any) {
                              console.error("Invoice error:", e)
                              if (e?.status === 404) {
                                try {
                                  toast.loading("Generating invoice...", { id: "invoice-download" })
                                  await transactionService.generateInvoice(order.id)
                                  const blob = await transactionService.downloadInvoice(order.id)
                                  downloadBlob(blob, order.id)
                                  toast.success("Invoice generated and downloaded", { id: "invoice-download" })
                                } catch (genError) {
                                  console.error(genError)
                                  toast.error("Failed to generate invoice", { id: "invoice-download" })
                                }
                              } else {
                                toast.error("Failed to download invoice", { id: "invoice-download" })
                              }
                            }
                          }}
                        >
                          <Download className="w-4 h-4 mr-2" /> Invoice
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {orders.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-16 text-muted-foreground">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center mb-2">
                          <Receipt className="w-6 h-6 text-muted-foreground/50" />
                        </div>
                        <p className="font-medium text-white">No orders found</p>
                        <p className="text-xs">You haven't placed any orders yet.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}

          {/* Pagination Controls */}
          {!loading && orders.length > itemsPerPage && (
            <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-4">
              <div className="text-sm text-muted-foreground">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, orders.length)} of {orders.length} orders
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="h-8 w-24"
                >
                  Previous
                </Button>
                <div className="flex items-center gap-1 mx-2">
                  {Array.from({ length: Math.ceil(orders.length / itemsPerPage) }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${currentPage === i + 1
                        ? "bg-primary text-white"
                        : "text-muted-foreground hover:bg-white/5 hover:text-white"
                        }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.min(Math.ceil(orders.length / itemsPerPage), p + 1))}
                  disabled={currentPage === Math.ceil(orders.length / itemsPerPage)}
                  className="h-8 w-24"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}