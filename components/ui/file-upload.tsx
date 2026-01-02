"use client"

import { useState, useCallback } from "react"
import { Upload, X, File, Image, FileText, Archive, Loader2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FileUploadProps {
    onFilesChange?: (files: File[]) => void
    maxFiles?: number
    maxSize?: number // in bytes
    acceptedTypes?: string[]
    className?: string
}

interface UploadedFile {
    file: File
    id: string
    progress: number
    status: "uploading" | "complete" | "error"
}

const fileIcons: Record<string, typeof File> = {
    image: Image,
    pdf: FileText,
    zip: Archive,
    default: File,
}

const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return fileIcons.image
    if (type === "application/pdf") return fileIcons.pdf
    if (type === "application/zip" || type === "application/x-zip-compressed") return fileIcons.zip
    return fileIcons.default
}

const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
}

export function FileUpload({
    onFilesChange,
    maxFiles = 5,
    maxSize = 10 * 1024 * 1024, // 10MB default
    acceptedTypes = [".png", ".jpg", ".jpeg", ".pdf", ".zip"],
    className,
}: FileUploadProps) {
    const [isDragging, setIsDragging] = useState(false)
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
    const [error, setError] = useState<string | null>(null)

    const simulateUpload = async (file: File, id: string) => {
        // Simulate upload progress
        for (let progress = 0; progress <= 100; progress += 10) {
            await new Promise((resolve) => setTimeout(resolve, 100))
            setUploadedFiles((prev) =>
                prev.map((f) => (f.id === id ? { ...f, progress } : f))
            )
        }
        setUploadedFiles((prev) =>
            prev.map((f) => (f.id === id ? { ...f, status: "complete" as const } : f))
        )
    }

    const handleFiles = useCallback(
        async (files: FileList | File[]) => {
            setError(null)
            const fileArray = Array.from(files)

            // Validate file count
            if (uploadedFiles.length + fileArray.length > maxFiles) {
                setError(`Maximum ${maxFiles} files allowed`)
                return
            }

            const newFiles: UploadedFile[] = []

            for (const file of fileArray) {
                // Validate file size
                if (file.size > maxSize) {
                    setError(`File "${file.name}" exceeds maximum size of ${formatFileSize(maxSize)}`)
                    continue
                }

                const id = Math.random().toString(36).substring(7)
                newFiles.push({
                    file,
                    id,
                    progress: 0,
                    status: "uploading",
                })
            }

            setUploadedFiles((prev) => [...prev, ...newFiles])

            // Simulate uploads
            for (const uploadFile of newFiles) {
                simulateUpload(uploadFile.file, uploadFile.id)
            }

            // Notify parent
            onFilesChange?.([...uploadedFiles.map((f) => f.file), ...newFiles.map((f) => f.file)])
        },
        [uploadedFiles, maxFiles, maxSize, onFilesChange]
    )

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }, [])

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
    }, [])

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault()
            setIsDragging(false)
            handleFiles(e.dataTransfer.files)
        },
        [handleFiles]
    )

    const removeFile = (id: string) => {
        setUploadedFiles((prev) => prev.filter((f) => f.id !== id))
        onFilesChange?.(uploadedFiles.filter((f) => f.id !== id).map((f) => f.file))
    }

    return (
        <div className={cn("space-y-4", className)}>
            {/* Drop Zone */}
            <label
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={cn(
                    "block cursor-pointer transition-all duration-200",
                    "border-2 border-dashed rounded-2xl p-8",
                    isDragging
                        ? "border-primary bg-primary/10"
                        : "border-white/10 hover:border-primary/50 hover:bg-primary/5"
                )}
            >
                <div className="text-center">
                    <div
                        className={cn(
                            "w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors",
                            isDragging ? "bg-primary/20 text-primary" : "bg-white/5 text-muted-foreground"
                        )}
                    >
                        <Upload className="w-7 h-7" />
                    </div>
                    <p className="text-sm text-white mb-1">
                        {isDragging ? "Drop files here" : "Drag and drop files here"}
                    </p>
                    <p className="text-xs text-muted-foreground mb-3">or click to browse</p>
                    <p className="text-[10px] text-muted-foreground/60">
                        {acceptedTypes.join(", ")} • Max {formatFileSize(maxSize)} per file
                    </p>
                </div>
                <input
                    type="file"
                    multiple
                    accept={acceptedTypes.join(",")}
                    onChange={(e) => e.target.files && handleFiles(e.target.files)}
                    className="hidden"
                />
            </label>

            {/* Error Message */}
            {error && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
                    <X size={16} />
                    {error}
                </div>
            )}

            {/* Uploaded Files */}
            {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                    {uploadedFiles.map((uploadFile) => {
                        const FileIcon = getFileIcon(uploadFile.file.type)

                        return (
                            <div
                                key={uploadFile.id}
                                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 group"
                            >
                                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                                    <FileIcon size={20} />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="text-sm font-medium text-white truncate">
                                            {uploadFile.file.name}
                                        </p>
                                        {uploadFile.status === "complete" && (
                                            <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <p className="text-xs text-muted-foreground">
                                            {formatFileSize(uploadFile.file.size)}
                                        </p>
                                        {uploadFile.status === "uploading" && (
                                            <>
                                                <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden max-w-[100px]">
                                                    <div
                                                        className="h-full bg-primary rounded-full transition-all duration-200"
                                                        style={{ width: `${uploadFile.progress}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs text-muted-foreground">
                                                    {uploadFile.progress}%
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeFile(uploadFile.id)}
                                    className="text-muted-foreground hover:text-red-400 hover:bg-red-500/10 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X size={16} />
                                </Button>
                            </div>
                        )
                    })}
                </div>
            )}

            {/* File Count */}
            {uploadedFiles.length > 0 && (
                <p className="text-xs text-muted-foreground text-center">
                    {uploadedFiles.length} of {maxFiles} files uploaded
                </p>
            )}
        </div>
    )
}
