"use client"

import React, { useState, useCallback } from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, FileImage } from 'lucide-react'

interface DropzoneProps {
  className?: string
  setFile?: (files?: File[]) => void
}

export function Dropzone({ className, setFile }: DropzoneProps) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)

      const files = Array.from(e.dataTransfer.files)
      setFile?.(files)
    },
    [setFile],
  )

  return (
    // <CHANGE> Complete redesign with better proportions, spacing, and responsive behavior
    <div
      className={cn(
        "relative w-full max-w-lg mx-auto transition-all duration-300 ease-out",
        "transform hover:scale-[1.02] active:scale-[0.98]",
        isDragOver && "scale-[1.02]",
        className,
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Main dropzone container */}
      <div className={cn(
        "relative overflow-hidden rounded-2xl sm:rounded-3xl",
        "bg-gradient-to-br from-orange-400 via-red-400 to-pink-500",
        "shadow-lg hover:shadow-xl transition-shadow duration-300",
        "p-6 sm:p-8 lg:p-12"
      )}>
        
        {/* Content wrapper */}
        <div className="relative z-10 text-center space-y-6 sm:space-y-8">
          
          {/* Header section */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex justify-center">
              <div className="p-3 sm:p-4 bg-white/20 rounded-full backdrop-blur-sm">
                <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white text-balance">
                Try it out!
              </h2>
              <p className="text-white/90 text-sm sm:text-base lg:text-lg font-medium">
                Drag and drop files here
              </p>
            </div>
          </div>

          {/* File input and drop area */}
          <div className="space-y-4">
            <Input
              id="fileInput"
              type="file"
              multiple
              onChange={(e) => setFile?.(Array.from(e.target.files || []))}
              className="hidden"
              accept="image/*"
            />

            <Label
              htmlFor="fileInput"
              className={cn(
                "group flex flex-col items-center justify-center",
                "w-full h-32 sm:h-40 lg:h-48",
                "border-2 border-dashed border-white/60 hover:border-white",
                "bg-black/10 hover:bg-black/20",
                "rounded-xl sm:rounded-2xl cursor-pointer",
                "transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
                isDragOver && "border-white bg-black/20 scale-[1.02]"
              )}
            >
              <div className="flex flex-col items-center justify-center space-y-2 sm:space-y-3 text-center px-4">
                <FileImage className="w-6 h-6 sm:w-8 sm:h-8 text-white/80 group-hover:text-white transition-colors" />
                <div className="space-y-1">
                  <span className="text-white font-medium text-sm sm:text-base">
                    Click or drag files here
                  </span>
                  <p className="text-white/70 text-xs sm:text-sm">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </Label>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
        
        {/* Drag overlay */}
        {isDragOver && (
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl flex items-center justify-center">
            <div className="text-white text-center space-y-2">
              <Upload className="w-8 h-8 sm:w-12 sm:h-12 mx-auto animate-bounce" />
              <p className="font-semibold text-sm sm:text-base">Drop files here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
