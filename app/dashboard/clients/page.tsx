import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Mail, Phone, MoreVertical, UserPlus } from "lucide-react"

const clients = [
  { name: "Sarah Connor", company: "Skynet Systems", email: "sarah@skynet.com", status: "Active", spent: "$12,500", lastActive: "2 hours ago" },
  { name: "John Wick", company: "Continental Hotel", email: "j.wick@continental.com", status: "Active", spent: "$45,000", lastActive: "1 day ago" },
  { name: "Tony Stark", company: "Stark Industries", email: "tony@stark.com", status: "Inactive", spent: "$980,000", lastActive: "1 month ago" },
  { name: "Bruce Wayne", company: "Wayne Enterprises", email: "bruce@wayne.com", status: "Active", spent: "$560,000", lastActive: "3 days ago" },
  { name: "Peter Parker", company: "Daily Bugle", email: "peter@bugle.com", status: "Pending", spent: "$1,200", lastActive: "5 hours ago" },
]

export default function ClientsPage() {
  return (
    <div className="space-y-8">
      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Client Management</h1>
          <p className="text-muted-foreground">Directory of all your active and past clients.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Search clients..." className="pl-10 bg-white/5 border-white/10 rounded-xl w-64 focus:w-80 transition-all" />
          </div>
          <Button variant="outline" className="border-white/10 bg-white/5 text-white hover:bg-white/10 rounded-xl">
            <Filter className="mr-2 w-4 h-4" /> Filter
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl px-6">
            <UserPlus className="mr-2 w-4 h-4" /> Add Client
          </Button>
        </div>
      </div>

      {/* Clients List Table (Styled as rows) */}
      <div className="rounded-3xl border border-white/5 bg-[#111111]/50 backdrop-blur-xl overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          <div className="col-span-4 pl-4">Client Details</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Total Spent</div>
          <div className="col-span-3">Last Active</div>
          <div className="col-span-1 text-right pr-4">Action</div>
        </div>

        <div className="divide-y divide-white/5">
          {clients.map((client, i) => (
            <div key={i} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-white/[0.02] transition-colors group">
              {/* Name & Info */}
              <div className="col-span-4 pl-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-blue-500/20 border border-white/10 flex items-center justify-center text-white font-bold">
                  {client.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-primary transition-colors">{client.name}</h4>
                  <p className="text-xs text-muted-foreground">{client.company}</p>
                </div>
              </div>

              {/* Status */}
              <div className="col-span-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                  client.status === 'Active' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                  client.status === 'Inactive' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                  'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                }`}>
                  {client.status}
                </span>
              </div>

              {/* Spent */}
              <div className="col-span-2 text-sm text-white font-medium tabular-nums">
                {client.spent}
              </div>

              {/* Last Active */}
              <div className="col-span-3 text-sm text-muted-foreground">
                {client.lastActive}
              </div>

              {/* Actions */}
              <div className="col-span-1 text-right pr-4 flex justify-end gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-white hover:bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <Mail size={16} />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-white hover:bg-white/10 rounded-lg">
                  <MoreVertical size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}