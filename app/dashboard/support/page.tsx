import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, Send, HelpCircle, FileQuestion } from "lucide-react"

export default function SupportPage() {
  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-140px)] flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Support Center</h1>
        <p className="text-muted-foreground">Need help? Chat with us or browse the FAQs.</p>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
        {/* Kolom Kiri: FAQ & Info */}
        <div className="hidden lg:flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-2">
          <div className="p-6 rounded-3xl bg-primary/10 border border-primary/20">
            <h3 className="font-bold text-primary mb-2 flex items-center gap-2">
              <HelpCircle size={20}/> Premium Support
            </h3>
            <p className="text-sm text-primary/80 leading-relaxed">
              As a valued client, you have priority access to our engineering team. We typically respond within 2 hours during business days.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider px-2">Common Questions</h4>
            {[
              "How do I request a change order?",
              "Where can I find API documentation?",
              "How does the billing cycle work?",
              "Can I add more team members?"
            ].map((q, i) => (
              <button key={i} className="w-full text-left p-4 rounded-2xl bg-[#111111]/80 border border-white/5 hover:border-white/10 hover:bg-white/5 transition-all flex items-center justify-between group">
                <span className="text-sm text-muted-foreground group-hover:text-white transition-colors">{q}</span>
                <FileQuestion size={16} className="text-muted-foreground opacity-50 group-hover:opacity-100" />
              </button>
            ))}
          </div>
        </div>

        {/* Kolom Kanan: Chat Interface */}
        <div className="lg:col-span-2 flex flex-col rounded-3xl bg-[#111111]/80 border border-white/5 backdrop-blur-xl overflow-hidden shadow-2xl">
          {/* Chat Header */}
          <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">S</div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#111111]"></div>
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Support Team</h4>
                <p className="text-xs text-green-400">Online</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
              <MoreHorizontal size={20} />
            </Button>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 p-6 overflow-y-auto custom-scrollbar space-y-6 bg-[url('/grid.svg')] bg-fixed opacity-90">
            {/* Message: Support */}
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-white/10 flex-shrink-0 mt-1"></div>
              <div className="space-y-1 max-w-[80%]">
                <div className="p-4 rounded-2xl rounded-tl-none bg-white/10 text-white text-sm leading-relaxed">
                  Hi there! I noticed your project milestone is coming up. Do you need any assistance with the UAT preparation?
                </div>
                <span className="text-[10px] text-muted-foreground pl-1">10:30 AM</span>
              </div>
            </div>

            {/* Message: You */}
            <div className="flex gap-4 flex-row-reverse">
              <div className="w-8 h-8 rounded-full bg-primary flex-shrink-0 mt-1 flex items-center justify-center text-black font-bold text-xs">ME</div>
              <div className="space-y-1 max-w-[80%]">
                <div className="p-4 rounded-2xl rounded-tr-none bg-primary text-primary-foreground text-sm leading-relaxed">
                  Yes, actually. I was wondering if we could schedule a quick call tomorrow to go over the testing credentials?
                </div>
                <span className="text-[10px] text-muted-foreground text-right pr-1 block">10:35 AM</span>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 bg-[#0A0A0A] border-t border-white/5">
            <div className="relative flex items-end gap-2">
              <Textarea 
                placeholder="Type your message..." 
                className="min-h-[50px] max-h-[120px] bg-white/5 border-white/10 rounded-2xl focus:border-primary/50 resize-none py-3 pl-4 pr-12"
              />
              <Button size="icon" className="absolute right-2 bottom-2 h-8 w-8 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all">
                <Send size={16} />
              </Button>
            </div>
            <p className="text-[10px] text-center text-muted-foreground mt-2">
              Avg. response time: <span className="text-green-400 font-medium">5 mins</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper icon component
function MoreHorizontal({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  )
}