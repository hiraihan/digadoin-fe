"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { User, Building2, Mail, Phone, Globe, Bell, Lock, Save, Loader2 } from "lucide-react"
import { toast } from "sonner"

export default function ClientProfilePage() {
    const [isLoading, setIsLoading] = useState(false)
    const [emailNotif, setEmailNotif] = useState(true)
    const [projectNotif, setProjectNotif] = useState(true)
    const [billingNotif, setBillingNotif] = useState(true)

    const [formData, setFormData] = useState({
        fullName: "Client User",
        company: "EduTech Indonesia",
        email: "client@digado.in",
        phone: "+62 812 3456 7890",
        website: "https://edutech.id",
        bio: "Building innovative e-learning solutions for Indonesia's future.",
    })

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSaveProfile = async () => {
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setIsLoading(false)
        toast.success("Profile Updated", {
            description: "Your profile information has been saved successfully."
        })
    }

    const handleChangePassword = async () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error("Passwords don't match", {
                description: "Please make sure your new passwords match."
            })
            return
        }

        if (passwordData.newPassword.length < 8) {
            toast.error("Password too short", {
                description: "Password must be at least 8 characters."
            })
            return
        }

        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setIsLoading(false)
        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
        toast.success("Password Changed", {
            description: "Your password has been updated successfully."
        })
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-20 relative z-10">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Profile Settings</h1>
                <p className="text-muted-foreground">Manage your account information and preferences.</p>
            </div>

            {/* Profile Section */}
            <div className="p-6 md:p-8 rounded-3xl bg-[#111111]/80 border border-white/5 backdrop-blur-xl">
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-purple-600 p-1 shadow-2xl">
                        <div className="h-full w-full rounded-full bg-black flex items-center justify-center text-2xl font-bold text-white">
                            C
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">{formData.fullName}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{formData.email}</p>
                        <Button variant="outline" size="sm" className="h-8 text-xs border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-lg">
                            Change Avatar
                        </Button>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Full Name</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="pl-10 bg-white/5 border-white/10 text-white rounded-xl h-12"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Company</Label>
                            <div className="relative">
                                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    className="pl-10 bg-white/5 border-white/10 text-white rounded-xl h-12"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="pl-10 bg-white/5 border-white/10 text-white rounded-xl h-12"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Phone</Label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="pl-10 bg-white/5 border-white/10 text-white rounded-xl h-12"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-xs uppercase tracking-wider text-muted-foreground">Website</Label>
                        <div className="relative">
                            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                                className="pl-10 bg-white/5 border-white/10 text-white rounded-xl h-12"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-xs uppercase tracking-wider text-muted-foreground">Bio</Label>
                        <Textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            className="bg-white/5 border-white/10 text-white rounded-xl min-h-[100px] resize-none"
                        />
                    </div>

                    <div className="flex justify-end">
                        <Button
                            onClick={handleSaveProfile}
                            disabled={isLoading}
                            className="bg-primary hover:bg-primary/90 text-white rounded-xl px-8 h-12 shadow-lg shadow-primary/20"
                        >
                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                            Save Profile
                        </Button>
                    </div>
                </div>
            </div>

            {/* Notification Preferences */}
            <div className="p-6 md:p-8 rounded-3xl bg-[#111111]/80 border border-white/5 backdrop-blur-xl">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-primary" /> Notification Preferences
                </h3>
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-white">Email Notifications</p>
                            <p className="text-xs text-muted-foreground">Receive email updates about your account.</p>
                        </div>
                        <Switch checked={emailNotif} onCheckedChange={setEmailNotif} />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-white">Project Updates</p>
                            <p className="text-xs text-muted-foreground">Get notified when there's activity on your project.</p>
                        </div>
                        <Switch checked={projectNotif} onCheckedChange={setProjectNotif} />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-white">Billing Alerts</p>
                            <p className="text-xs text-muted-foreground">Receive notifications about invoices and payments.</p>
                        </div>
                        <Switch checked={billingNotif} onCheckedChange={setBillingNotif} />
                    </div>
                </div>
            </div>

            {/* Change Password */}
            <div className="p-6 md:p-8 rounded-3xl bg-[#111111]/80 border border-white/5 backdrop-blur-xl">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-primary" /> Change Password
                </h3>
                <div className="space-y-6 max-w-md">
                    <div className="space-y-2">
                        <Label className="text-xs uppercase tracking-wider text-muted-foreground">Current Password</Label>
                        <Input
                            name="currentPassword"
                            type="password"
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                            placeholder="••••••••"
                            className="bg-white/5 border-white/10 text-white rounded-xl h-12"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs uppercase tracking-wider text-muted-foreground">New Password</Label>
                        <Input
                            name="newPassword"
                            type="password"
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                            placeholder="••••••••"
                            className="bg-white/5 border-white/10 text-white rounded-xl h-12"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs uppercase tracking-wider text-muted-foreground">Confirm New Password</Label>
                        <Input
                            name="confirmPassword"
                            type="password"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                            placeholder="••••••••"
                            className="bg-white/5 border-white/10 text-white rounded-xl h-12"
                        />
                    </div>
                    <Button
                        onClick={handleChangePassword}
                        disabled={isLoading || !passwordData.currentPassword || !passwordData.newPassword}
                        variant="outline"
                        className="border-white/10 bg-white/5 text-white hover:bg-white/10 rounded-xl h-12"
                    >
                        Update Password
                    </Button>
                </div>
            </div>
        </div>
    )
}
