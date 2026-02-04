import Link from "next/link"
import { Clock, MessageSquare, ShoppingBag, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface QuickActionsProps {
    pendingProjects: number
    unansweredTickets: number
    pendingOrders: number
}

export function QuickActionsWidget({ pendingProjects, unansweredTickets, pendingOrders }: QuickActionsProps) {
    return (
        <Card className="bg-[#111111]/80 border border-white/5 backdrop-blur-xl">
            <CardHeader className="pb-2">
                <CardTitle className="text-white text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-blue-500/10 border border-blue-500/10 group hover:border-blue-500/30 transition-all">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                            <Clock size={20} />
                        </div>
                        <div>
                            <p className="text-lg font-bold text-white">{pendingProjects}</p>
                            <p className="text-xs text-muted-foreground">Pending Projects</p>
                        </div>
                    </div>
                    <Link href="/dashboard/projects?stage=pending">
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20">
                            <ArrowRight size={16} />
                        </Button>
                    </Link>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-purple-500/10 border border-purple-500/10 group hover:border-purple-500/30 transition-all">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                            <MessageSquare size={20} />
                        </div>
                        <div>
                            <p className="text-lg font-bold text-white">{unansweredTickets}</p>
                            <p className="text-xs text-muted-foreground">Open Tickets</p>
                        </div>
                    </div>
                    <Link href="/dashboard/tickets?status=open">
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-purple-400 hover:text-purple-300 hover:bg-purple-500/20">
                            <ArrowRight size={16} />
                        </Button>
                    </Link>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-green-500/10 border border-green-500/10 group hover:border-green-500/30 transition-all">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-green-500/20 text-green-400">
                            <ShoppingBag size={20} />
                        </div>
                        <div>
                            <p className="text-lg font-bold text-white">{pendingOrders}</p>
                            <p className="text-xs text-muted-foreground">Pending Orders</p>
                        </div>
                    </div>
                    <Link href="/dashboard/order?status=pending">
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-green-400 hover:text-green-300 hover:bg-green-500/20">
                            <ArrowRight size={16} />
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}
