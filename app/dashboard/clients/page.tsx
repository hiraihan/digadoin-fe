"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, UserPlus, Loader2, MoreVertical, Eye, Edit, Trash } from "lucide-react"
import { ClientFormModal } from "@/components/dashboard/client-form-modal"
import { userService } from "@/app/services/userService"
import { User } from "@/app/types/api"
import { toast } from "sonner"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ConfirmModal } from "@/components/ui/confirm-modal"

import { ClientProfileModal } from "@/components/dashboard/client-profile-modal"

import { projectService } from "@/app/services/projectService"

export default function ClientsPage() {
  const [showClientModal, setShowClientModal] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [clients, setClients] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<string>("all")

  const [selectedClient, setSelectedClient] = useState<User | undefined>(undefined)
  const [profileData, setProfileData] = useState<any>(null)
  const [modalMode, setModalMode] = useState<"create" | "edit">("create")
  const [clientToDelete, setClientToDelete] = useState<User | null>(null)

  const fetchClients = async () => {
    setLoading(true)
    try {
      const data = await userService.getAllUsers({ search })
      const nonAdminUsers = data.filter(u => u.role !== 'admin')
      setClients(nonAdminUsers)
    } catch (error) {
      toast.error("Failed to load clients")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClients()
  }, [search])

  const handleCreate = () => {
    setSelectedClient(undefined)
    setModalMode("create")
    setShowClientModal(true)
  }

  const handleEdit = (client: User) => {
    setSelectedClient(client)
    setModalMode("edit")
    setShowClientModal(true)
  }

  const handleViewProfile = async (client: User) => {
    const profile = {
      name: client.full_name || client.name || "Unnamed",
      email: client.email,
      phone: client.phone || "",
      company: client.company || "",
      role: client.role,
      status: client.is_active ? "active" : "inactive",
      joinedDate: client.created_at,
      website: client.website,
      bio: client.bio,
      stats: {
        totalProjects: 0,
        activeProjects: 0,
        totalSpent: "-"
      }
    }
    setProfileData(profile)

    setTimeout(() => {
      setShowProfileModal(true)
    }, 100)
    try {
      const allProjects = await projectService.getAllProjects()
      const clientProjects = allProjects.filter(p => p.user_id === client.id)

      const activeCount = clientProjects.filter(p => {
        const s = (p.stage || p.status || '').toLowerCase()
        return ['active', 'development', 'live', 'review'].includes(s)
      }).length

      setProfileData((prev: any) => ({
        ...prev,
        stats: {
          totalProjects: clientProjects.length,
          activeProjects: activeCount,
          totalSpent: "-"
        }
      }))
    } catch (error) {
      console.error("Failed to load project stats for client", error)
    }
  }

  const handleSaveClient = async (formData: any) => {
    try {
      if (modalMode === 'edit' && selectedClient) {
        await userService.updateUser(selectedClient.id, {
          full_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          is_active: formData.status === 'active'
        })
        toast.success("Client updated successfully")
        fetchClients()
        fetchClients()
      } else {
        await userService.createUser({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          company: formData.company,
          role: "user",
          is_active: formData.status === 'active'
        })
        toast.success("Client created successfully")
        fetchClients()
      }
    } catch (error) {
      console.error("Save client error:", error)
      toast.error("Failed to save client")
    }
  }

  const handleDeleteClick = (client: User) => {
    setClientToDelete(client)
  }

  const confirmDelete = async () => {
    if (!clientToDelete) return

    try {
      await userService.deleteUser(clientToDelete.id)
      toast.success(`Client ${clientToDelete.full_name || clientToDelete.name || clientToDelete.email} deleted successfully`)
      setClients(prev => prev.filter(c => c.id !== clientToDelete.id))
    } catch (error) {
      toast.error("Failed to delete client")
    } finally {
      setClientToDelete(null)
    }
  }

  const getInitials = (client: User) => {
    const name = client.full_name || client.name || client.email || "U"
    return name.charAt(0).toUpperCase()
  }

  const getDisplayName = (client: User) => {
    return client.full_name || client.name || "Unnamed"
  }

  const filteredClients = clients.filter(client => {
    if (filter === 'all') return true
    if (filter === 'active') return client.is_active
    if (filter === 'inactive') return !client.is_active
    if (['user', 'editor'].includes(filter)) return client.role === filter
    return true
  })

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const totalPages = Math.ceil(filteredClients.length / itemsPerPage)
  useEffect(() => {
    setCurrentPage(1)
  }, [search, filter, clients])

  const paginatedClients = filteredClients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1)
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Client Management</h1>
          <p className="text-muted-foreground">Directory of all your active and past clients.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search clients..."
              className="pl-10 bg-white/5 border-white/10 rounded-xl w-64 focus:w-80 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-white/10 bg-white/5 text-white hover:bg-white/10 rounded-xl">
                <Filter className="mr-2 w-4 h-4" />
                {filter === 'all' ? 'Filter' : filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-[#111111] border-white/10 text-white">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem className="cursor-pointer" onClick={() => setFilter('all')}>
                All Clients
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={() => setFilter('active')}>
                Active Only
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={() => setFilter('inactive')}>
                Inactive Only
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuLabel>Filter by Role</DropdownMenuLabel>
              <DropdownMenuItem className="cursor-pointer" onClick={() => setFilter('user')}>
                Users
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            onClick={handleCreate}
            className="bg-primary hover:bg-primary/90 text-white rounded-xl px-6"
          >
            <UserPlus className="mr-2 w-4 h-4" /> Add Client
          </Button>
        </div>
      </div>

      <ClientFormModal
        isOpen={showClientModal}
        onClose={() => setShowClientModal(false)}
        mode={modalMode}
        clientData={selectedClient ? {
          name: selectedClient.full_name || selectedClient.name || "",
          company: selectedClient.company || "",
          email: selectedClient.email,
          phone: selectedClient.phone || "",
          status: selectedClient.is_active ? "active" : "inactive"
        } : undefined}
        onSubmit={handleSaveClient}
      />

      <ClientProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        client={profileData}
      />

      <ConfirmModal
        isOpen={!!clientToDelete}
        onClose={() => setClientToDelete(null)}
        onConfirm={confirmDelete}
        title="Delete Client?"
        description={`Are you sure you want to delete ${clientToDelete ? getDisplayName(clientToDelete) : 'this client'}? This action might also delete all associated projects and data. This cannot be undone.`}
        confirmLabel="Delete Client"
        variant="danger"
      />

      <div className="rounded-3xl border border-white/5 bg-[#111111]/50 backdrop-blur-xl overflow-hidden">
        <Table>
          <TableHeader className="bg-white/5 border-b border-white/5">
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider pl-6 py-4">Client Details</TableHead>
              <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Role</TableHead>
              <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</TableHead>
              <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Joined</TableHead>
              <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider text-right pr-6">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  <div className="flex justify-center items-center">
                    <Loader2 className="animate-spin text-white mr-2" />
                    <span className="text-muted-foreground">Loading clients...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredClients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  No clients found.
                </TableCell>
              </TableRow>
            ) : (
              paginatedClients.map((client) => (
                <TableRow key={client.id} className="border-white/5 hover:bg-white/[0.02] transition-colors group">
                  <TableCell className="pl-6 py-4">
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <Avatar className="h-10 w-10 border border-white/10">
                        {/* Assuming no avatar URL yet, using fallback */}
                        <AvatarFallback className="bg-gradient-to-br from-primary/20 to-blue-500/20 text-white font-bold">
                          {getInitials(client)}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <h4 className="text-sm font-bold text-white group-hover:text-primary transition-colors">
                          {getDisplayName(client)}
                        </h4>
                        <p className="text-xs text-muted-foreground">{client.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-white capitalize">{client.role}</span>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${client.is_active ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
                      {client.is_active ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date().toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-white hover:bg-white/10 rounded-lg">
                          <MoreVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 bg-[#111111] border-white/10 text-white">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-white/10" />
                        <DropdownMenuItem className="focus:bg-white/10 focus:text-white cursor-pointer" onClick={() => handleEdit(client)}>
                          <Edit className="mr-2 h-4 w-4" /> Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-white/10 focus:text-white cursor-pointer" onClick={() => handleViewProfile(client)}>
                          <Eye className="mr-2 h-4 w-4" /> View Profile
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-white/10" />
                        <DropdownMenuItem className="text-red-500 focus:bg-red-500/10 focus:text-red-500 cursor-pointer" onClick={() => handleDeleteClick(client)}>
                          <Trash className="mr-2 h-4 w-4" /> Delete Client
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {filteredClients.length > 0 && (
        <div className="flex items-center justify-between px-2">
          <p className="text-sm text-muted-foreground">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredClients.length)} of {filteredClients.length} clients
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
