import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ProjectStatus } from "@/app/types"
import { Search } from "lucide-react"

interface ProjectFiltersProps {
    search: string
    status: string
    onSearchChange: (value: string) => void
    onStatusChange: (value: string) => void
}

export function ProjectFilters({
    search,
    status,
    onSearchChange,
    onStatusChange,
}: ProjectFiltersProps) {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 md:max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search projects..."
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-8"
                />
            </div>
            <Select value={status} onValueChange={onStatusChange}>
                <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="ALL">All Status</SelectItem>
                    {Object.values(ProjectStatus).map((s) => (
                        <SelectItem key={s} value={s}>
                            {s.replace("_", " ")}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}
