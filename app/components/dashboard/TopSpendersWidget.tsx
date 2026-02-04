import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/formatters"
import { Users, TrendingUp } from "lucide-react"

interface Spender {
    name: string
    email: string
    totalSpent: number
    ordersCount: number
}

interface TopSpendersProps {
    spenders: Spender[]
}

export function TopSpendersWidget({ spenders }: TopSpendersProps) {
    const sortedSpenders = [...spenders].sort((a, b) => b.totalSpent - a.totalSpent).slice(0, 5)

    return (
        <Card className="bg-[#111111]/80 border border-white/5 backdrop-blur-xl h-full">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-white text-lg flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    Top Spenders
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {sortedSpenders.length > 0 ? (
                        sortedSpenders.map((client, index) => (
                            <div key={client.email} className="flex items-center justify-between group">
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 text-xs font-bold text-white border border-white/10 group-hover:border-primary/50 group-hover:bg-primary/10 transition-colors">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white">{client.name || 'Unknown Client'}</p>
                                        <p className="text-xs text-muted-foreground">{client.email}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-green-400">{formatCurrency(client.totalSpent)}</p>
                                    <p className="text-xs text-muted-foreground">{client.ordersCount} orders</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8 text-muted-foreground">
                            No data available
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
