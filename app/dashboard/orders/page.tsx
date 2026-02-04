"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
    ShoppingBag,
    Clock,
    CheckCircle2,
    XCircle,
    Search,
    Filter,
    RefreshCw,
    Eye,
    TrendingUp,
    Users,
    DollarSign,
    Loader2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { adminOrderService, AdminOrder, AdminOrdersResponse } from "@/app/services/adminOrderService"
import { formatCurrency } from "@/lib/formatters"
import { toast } from "sonner"

// Status badge component
function StatusBadge({ status }: { status: string }) {
    const statusConfig: Record<string, { label: string; className: string; icon: any }> = {
        pending: {
            label: "Pending",
            className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
            icon: Clock
        },
        paid: {
            label: "Paid",
            className: "bg-green-500/10 text-green-500 border-green-500/20",
            icon: CheckCircle2
        },
        cancelled: {
            label: "Cancelled",
            className: "bg-red-500/10 text-red-500 border-red-500/20",
            icon: XCircle
        },
        expired: {
            label: "Expired",
            className: "bg-gray-500/10 text-gray-500 border-gray-500/20",
            icon: Clock
        }
    }

    const config = statusConfig[status] || statusConfig.pending
    const Icon = config.icon

    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config.className}`}>
            <Icon className="w-3 h-3" />
            {config.label}
        </span>
    )
}

// Stat card component
function StatCard({ title, value, icon: Icon, color, trend }: {
    title: string;
    value: number | string;
    icon: any;
    color: string;
    trend?: string;
}) {
    return (
        <Card className="bg-[#111111]/80 border-white/5">
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-muted-foreground mb-1">{title}</p>
                        <p className="text-2xl font-bold text-white">{value}</p>
                        {trend && (
                            <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" />
                                {trend}
                            </p>
                        )}
                    </div>
                    <div className={`p-3 rounded-xl ${color}`}>
                        <Icon className="w-5 h-5 text-white" />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default function AdminOrdersPage() {
    const router = useRouter()
    const [orders, setOrders] = useState<AdminOrder[]>([])
    const [loading, setLoading] = useState(true)
    const [stats, setStats] = useState({ total: 0, pending: 0, paid: 0, cancelled: 0 })
    const [statusFilter, setStatusFilter] = useState<string>("all")
    const [searchQuery, setSearchQuery] = useState("")

    // Pagination State
    const [page, setPage] = useState(1)
    const [totalItems, setTotalItems] = useState(0)
    const itemsPerPage = 10

    // 1. Fetch Global Stats (Separate from list to maintain consistency)
    const fetchStats = async () => {
        try {
            // Fetch with minimal limit, all statuses to get counts
            const data = await adminOrderService.getAllOrders({ limit: 1, status: 'all' })
            setStats({
                total: data.total,
                pending: data.pending_count,
                paid: data.paid_count,
                cancelled: data.cancelled_count
            })
        } catch (error) {
            console.error("Failed to fetch stats", error)
        }
    }

    // 2. Fetch Orders List (Filtered & Paginated)
    const fetchOrders = async () => {
        setLoading(true)
        try {
            const params: { status?: string, skip: number, limit: number } = {
                skip: (page - 1) * itemsPerPage,
                limit: itemsPerPage
            }

            if (statusFilter && statusFilter !== "all") {
                params.status = statusFilter
            }

            const data = await adminOrderService.getAllOrders(params)
            setOrders(data.items)

            // Note: If backend returns 'total' for the filtered set, use it.
            // Assuming data.total represents total matches for the current query
            setTotalItems(data.total)

        } catch (error: any) {
            toast.error(error.message || "Failed to load orders")
        } finally {
            setLoading(false)
        }
    }

    // Initial Load
    useEffect(() => {
        fetchStats()
    }, [])

    // Refresh List on Filter/Page Change
    useEffect(() => {
        fetchOrders()
    }, [statusFilter, page])

    // Reset page when filter changes
    useEffect(() => {
        setPage(1)
    }, [statusFilter])

    const handleRefresh = () => {
        fetchStats()
        fetchOrders()
        toast.success("Orders refreshed")
    }

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr)
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    // Note: Search relies on frontend filtering for now if backend search isn't ready.
    // However, with pagination, frontend search only searches current page.
    // Ideally user "Search" should be a backend param.
    // For now, I will keep frontend filtering logic but applied to the fetched PAGE.
    // Warning: This means searching might miss items on other pages.
    // User requested "max data 10", implying backend pagination.
    // I should ideally add search param to backend. But adminOrderService doesn't seem to have search param logic visible yet.
    // I will stick to existing frontend "filteredOrders" logic but applied to the subset, 
    // OR communicate that search is limited. 
    // Given the prompt "Pagination ... max data 10", checking file content:
    // filteredOrders was using 'orders' state.

    // Let's refine: The prompt implies proper pagination.
    // If I paginate on backend, I can't filtering by name on frontend effectively across pages.
    // But for this task, I'll follow the pattern: Backend Pagination > Frontend Display.

    const displayedOrders = orders.filter(order => {
        if (!searchQuery) return true
        const query = searchQuery.toLowerCase()
        return (
            order.user_name.toLowerCase().includes(query) ||
            order.user_email.toLowerCase().includes(query) ||
            order.plan_name.toLowerCase().includes(query) ||
            String(order.id).includes(query)
        )
    })

    // Calculate revenue from STATS (Global) to ensure consistency
    // Note: data.items only has current page. We can't reduce revenue from them.
    // adminOrderService doesn't expose total_revenue. 
    // We might need to estimate or hide it, or trust the stats logic.
    // Let's keep existing reduction but acknowledge it's only for visible rows, OR remove it if misleading.
    // "Total Revenue" card needs a value.
    // The previous code calculated it from 'orders' (which was ALL orders).
    // Now 'orders' is paginated.
    // Compromise: Provide a placeholder or use stats.paid * average? No.
    // Best: Ask backend for revenue. 
    // For now, I will keep the card but maybe hide value or show "N/A" if cannot calc, 
    // OR revert to fetching ALL orders for revenue calculation? No, that defeats pagination.
    // I'll leave the revenue calculation on the *fetched* items for now, which is technically "Revenue (Current Page)".
    // Better: Remove the calculation from client and use a static value or fetch if possible.
    // Wait, the previous code fetched ALL orders (no limit).
    // Now I introduce limit.
    // I will comment out Revenue calculation for full dataset and maybe show "Rp -" for now 
    // or just calculate based on visible to avoid crashing, but label it properly?
    // Let's rely on the fact that I can't easily get total revenue without backend change.
    // I'll calculate revenue on *this page* or just hide the specific number logic if it's broken.
    // Actually, I'll just sum the current page and maybe label "Revenue (Page)" or similar?
    // Or just accept the limitation.

    // Handle Accept & Start Project
    const handleAcceptProject = async (projectId: number) => {
        try {
            await adminOrderService.updateProjectStage(projectId, 'development')
            toast.success("Project accepted and started!")
            fetchOrders()
            fetchStats()
        } catch (error) {
            toast.error("Failed to start project")
        }
    }

    const totalPages = Math.ceil(totalItems / itemsPerPage)

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Order Management</h1>
                    <p className="text-muted-foreground mt-1">
                        Monitor and manage all customer orders
                    </p>
                </div>
                <Button onClick={handleRefresh} variant="outline" className="gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Refresh
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Total Orders"
                    value={stats.total}
                    icon={ShoppingBag}
                    color="bg-primary"
                />
                <StatCard
                    title="Pending Orders"
                    value={stats.pending}
                    icon={Clock}
                    color="bg-yellow-500"
                    trend={stats.pending > 0 ? "Needs attention" : undefined}
                />
                <StatCard
                    title="Paid Orders"
                    value={stats.paid}
                    icon={CheckCircle2}
                    color="bg-green-500"
                />
                <StatCard
                    title="Cancelled Orders"
                    value={stats.cancelled}
                    icon={XCircle}
                    color="bg-red-500"
                />
            </div>

            {/* Filters & Search */}
            <Card className="bg-[#111111]/80 border-white/5">
                <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search by name, email (current page)..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 bg-white/5 border-white/10"
                            />
                        </div>
                        <div className="flex gap-2">
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-[150px] bg-white/5 border-white/10">
                                    <Filter className="w-4 h-4 mr-2" />
                                    <SelectValue placeholder="Filter status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="paid">Paid</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Orders Table */}
            <Card className="bg-[#111111]/80 border-white/5">
                <CardHeader>
                    <CardTitle className="text-white">Recent Orders</CardTitle>
                    <CardDescription>
                        Showing {displayedOrders.length} of {totalItems} orders
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        </div>
                    ) : displayedOrders.length === 0 ? (
                        <div className="text-center py-12">
                            <ShoppingBag className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                            <p className="text-muted-foreground">No orders found</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-white/5 hover:bg-transparent">
                                        <TableHead className="text-muted-foreground">Order ID</TableHead>
                                        <TableHead className="text-muted-foreground">Customer</TableHead>
                                        <TableHead className="text-muted-foreground">Plan</TableHead>
                                        <TableHead className="text-muted-foreground">Amount</TableHead>
                                        <TableHead className="text-muted-foreground">Status</TableHead>
                                        <TableHead className="text-muted-foreground">Project</TableHead>
                                        <TableHead className="text-muted-foreground">Date</TableHead>
                                        <TableHead className="text-muted-foreground text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {displayedOrders.map((order) => (
                                        <TableRow key={order.id} className="border-white/5 hover:bg-white/5">
                                            <TableCell className="font-medium text-white">
                                                #{order.id}
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <p className="font-medium text-white">{order.user_name}</p>
                                                    <p className="text-xs text-muted-foreground">{order.user_email}</p>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <p className="text-white">{order.plan_name}</p>
                                                    {order.plan_category && (
                                                        <span className="text-xs text-muted-foreground capitalize">
                                                            {order.plan_category.replace(/_/g, ' ')}
                                                        </span>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-medium text-primary">
                                                {formatCurrency(order.total_price)}
                                            </TableCell>
                                            <TableCell>
                                                <StatusBadge status={order.status} />
                                            </TableCell>
                                            <TableCell>
                                                {order.project_id ? (
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-xs text-muted-foreground">
                                                            ID: {order.project_id}
                                                        </span>
                                                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full w-fit ${order.project_stage === 'live' ? 'bg-green-500/10 text-green-500' :
                                                            order.project_stage === 'pending' ? 'bg-yellow-500/10 text-yellow-500' :
                                                                'bg-blue-500/10 text-blue-500'
                                                            }`}>
                                                            {order.project_stage?.toUpperCase()}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span className="text-xs text-muted-foreground">-</span>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-muted-foreground text-sm">
                                                {formatDate(order.created_at)}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    {/* If Paid and Project Pending -> Accept & Start */}
                                                    {order.status === 'paid' && order.project_id && order.project_stage === 'pending' && (
                                                        <Button
                                                            size="sm"
                                                            className="bg-primary hover:bg-primary/90 text-white h-8"
                                                            onClick={() => handleAcceptProject(order.project_id!)}
                                                        >
                                                            Accept & Start
                                                        </Button>
                                                    )}

                                                    {/* View Project Button */}
                                                    {order.project_id && (
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="h-8 border-white/10 hover:bg-white/10 text-muted-foreground hover:text-white"
                                                            onClick={() => router.push(`/dashboard/projects/${order.project_id}`)}
                                                        >
                                                            View Project
                                                        </Button>
                                                    )}

                                                    {/* Fallback View Order */}
                                                    {!order.project_id && (
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-8 w-8 p-0 text-muted-foreground hover:text-white"
                                                            onClick={() => router.push(`/dashboard/orders/${order.id}`)}
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                        </Button>
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}

                    {/* Pagination Controls */}
                    {!loading && totalItems > 0 && (
                        <div className="flex items-center justify-between mt-4">
                            <p className="text-sm text-muted-foreground">
                                Showing <span className="font-medium text-white">{(page - 1) * itemsPerPage + 1}</span>-
                                <span className="font-medium text-white">{Math.min(page * itemsPerPage, totalItems)}</span> of{' '}
                                <span className="font-medium text-white">{totalItems}</span> orders
                            </p>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1 || loading}
                                    className="bg-transparent border-white/10"
                                >
                                    Previous
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setPage(p => p + 1)}
                                    disabled={page >= totalPages || loading}
                                    className="bg-transparent border-white/10"
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
