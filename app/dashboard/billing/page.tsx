import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, CreditCard, Check, AlertCircle, Clock } from "lucide-react"

export default function BillingPage() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Billing & Invoices</h1>
        <p className="text-muted-foreground">Manage your payments and download invoice history.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Kolom Kiri: Kartu & Summary */}
        <div className="space-y-6">
          {/* Credit Card Visual */}
          <div className="relative h-56 w-full rounded-3xl bg-gradient-to-br from-blue-600 to-purple-700 p-6 flex flex-col justify-between shadow-2xl overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 mix-blend-overlay"></div>
            
            <div className="flex justify-between items-start relative z-10">
              <div className="text-white/80 font-mono text-sm tracking-widest">DIGADO SECURE</div>
              <CreditCard className="text-white/80 w-8 h-8" />
            </div>
            
            <div className="relative z-10 space-y-1">
              <div className="text-white/60 text-xs uppercase tracking-widest">Current Balance</div>
              <div className="text-white text-3xl font-bold tracking-tight">$1,500.00</div>
            </div>

            <div className="relative z-10 flex justify-between items-end">
              <div className="space-y-1">
                <div className="text-white/60 text-xs uppercase">Card Holder</div>
                <div className="text-white font-medium tracking-wide">PT. EDUTECH INDO</div>
              </div>
              <div className="text-white font-mono text-lg">•••• 4242</div>
            </div>
          </div>

          {/* Actions */}
          <div className="p-6 rounded-3xl bg-[#111111]/80 border border-white/5 backdrop-blur-xl space-y-4">
            <h3 className="font-semibold text-white">Quick Actions</h3>
            <Button className="w-full bg-white text-black hover:bg-gray-200 h-12 rounded-xl font-bold">
              Pay Outstanding Balance
            </Button>
            <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white/5 h-12 rounded-xl">
              Update Payment Method
            </Button>
          </div>
        </div>

        {/* Kolom Kanan: Invoice History */}
        <div className="lg:col-span-2 p-6 md:p-8 rounded-3xl bg-[#111111]/80 border border-white/5 backdrop-blur-xl">
          <h3 className="text-xl font-bold text-white mb-6">Invoice History</h3>
          <div className="space-y-4">
            {[
              { id: "INV-2024-001", date: "Oct 01, 2024", amount: "$1,500.00", status: "Pending", desc: "Milestone 2: Frontend Dev" },
              { id: "INV-2024-002", date: "Sep 01, 2024", amount: "$2,500.00", status: "Paid", desc: "Milestone 1: Design System" },
              { id: "INV-2024-003", date: "Aug 01, 2024", amount: "$1,000.00", status: "Paid", desc: "Project Down Payment" },
            ].map((inv, i) => (
              <div key={i} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl border border-white/5 hover:bg-white/[0.02] transition-colors group">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                    inv.status === 'Paid' ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500'
                  }`}>
                    {inv.status === 'Paid' ? <Check size={20} /> : <Clock size={20} />}
                  </div>
                  <div>
                    <h4 className="text-white font-bold">{inv.desc}</h4>
                    <p className="text-sm text-muted-foreground flex gap-2">
                      <span>{inv.id}</span> • <span>{inv.date}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto pl-[4rem] md:pl-0">
                  <span className="text-lg font-bold text-white">{inv.amount}</span>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
                    <Download size={18} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}