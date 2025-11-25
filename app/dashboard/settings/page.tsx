"use client" // Ubah jadi Client Component agar Switch bisa interaktif

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { User, Bell, Lock, Globe, Save } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export default function SettingsPage() {
  const [emailNotif, setEmailNotif] = useState(true)
  const [pushNotif, setPushNotif] = useState(false)

  const handleSave = () => {
    toast.success("Settings Saved", {
      description: "Your preferences have been updated successfully.",
    })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Account Settings</h1>
        <p className="text-muted-foreground">Manage your profile preferences and account security.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Sidebar Navigation Settings */}
        <div className="md:col-span-3 space-y-1">
          <button className="w-full text-left px-4 py-2.5 rounded-xl bg-primary/10 text-primary font-medium text-sm transition-colors">
            General Profile
          </button>
          <button className="w-full text-left px-4 py-2.5 rounded-xl text-muted-foreground hover:text-white hover:bg-white/5 font-medium text-sm transition-colors">
            Notifications
          </button>
          <button className="w-full text-left px-4 py-2.5 rounded-xl text-muted-foreground hover:text-white hover:bg-white/5 font-medium text-sm transition-colors">
            Security
          </button>
          <button className="w-full text-left px-4 py-2.5 rounded-xl text-muted-foreground hover:text-white hover:bg-white/5 font-medium text-sm transition-colors">
            Billing
          </button>
        </div>

        {/* Main Content Form */}
        <div className="md:col-span-9 space-y-6">
          {/* Profile Section */}
          <div className="p-6 md:p-8 rounded-3xl bg-[#111111]/80 border border-white/5 backdrop-blur-xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-purple-600 p-1 shadow-2xl">
                <div className="h-full w-full rounded-full bg-black flex items-center justify-center text-2xl font-bold text-white">
                  D
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Admin User</h3>
                <p className="text-sm text-muted-foreground mb-2">admin@digado.in</p>
                <Button variant="outline" size="sm" className="h-8 text-xs border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-lg">
                  Change Avatar
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground">Full Name</Label>
                  <Input defaultValue="Admin User" className="bg-white/5 border-white/10 text-white rounded-xl h-12" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground">Username</Label>
                  <Input defaultValue="digado_admin" className="bg-white/5 border-white/10 text-white rounded-xl h-12" />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Bio</Label>
                <Textarea 
                  className="bg-white/5 border-white/10 text-white rounded-xl min-h-[120px] resize-none" 
                  defaultValue="Managing the digital empire at digado.in. Building cool stuff for the web."
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Website</Label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input defaultValue="https://digado.in" className="pl-10 bg-white/5 border-white/10 text-white rounded-xl h-12" />
                </div>
              </div>
            </div>
          </div>

          {/* Notification Preferences (INTERACTIVE) */}
          <div className="p-6 md:p-8 rounded-3xl bg-[#111111]/80 border border-white/5 backdrop-blur-xl">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" /> Notification Preferences
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">Email Notifications</p>
                  <p className="text-xs text-muted-foreground">Receive emails about new project updates.</p>
                </div>
                <Switch checked={emailNotif} onCheckedChange={setEmailNotif} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">Push Notifications</p>
                  <p className="text-xs text-muted-foreground">Receive push notifications on your mobile device.</p>
                </div>
                <Switch checked={pushNotif} onCheckedChange={setPushNotif} />
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex justify-end pt-4">
            <Button onClick={handleSave} size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-xl px-8 h-12 shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-105 transition-all">
              <Save className="mr-2 w-4 h-4" /> Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}