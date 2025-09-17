"use client"

import React, { useState, useCallback } from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface DropzoneProps {
  className?: string
  setFile?: (files?: File[]) => void
}

export function Dropzone({ className, setFile }: DropzoneProps) {
  // const [isDragOver, setIsDragOver] = useState(false)

  // const handleDragOver = useCallback((e: React.DragEvent) => {
  //   e.preventDefault()
  //   setIsDragOver(true)
  // }, [])

  // const handleDragLeave = useCallback((e: React.DragEvent) => {
  //   e.preventDefault()
  //   setIsDragOver(false)
  // }, [])

  // const handleDrop = useCallback(
  //   (e: React.DragEvent) => {
  //     e.preventDefault()
  //     setIsDragOver(false)

  //     const files = Array.from(e.dataTransfer.files)
  //     onFilesSelected?.(files)
  //   },
  //   [onFilesSelected],
  // )

  // const handleClick = useCallback(() => {
  //   const input = document.createElement("input")
  //   input.type = "file"
  //   input.multiple = true
  //   input.onchange = (e) => {
  //     const files = Array.from((e.target as HTMLInputElement).files || [])
  //     onFilesSelected?.(files)
  //   }
  //   input.click()
  // }, [onFilesSelected])

  return (
    <div
      className={cn(
        "relative w-full max-w-md mx-auto p-12 rounded-3xl cursor-pointer transition-all duration-200",
        "bg-gradient-to-br from-orange-400 via-red-400 to-pink-500 ",
        "hover:shadow-lg hover:scale-[1.02]",
        // isDragOver && "scale-[1.02] shadow-lg",
        className,
      )}
    // onDragOver={handleDragOver}
    // onDragLeave={handleDragLeave}
    // onDrop={handleDrop}
    // onClick={handleClick}
    >
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Try it out!</h2>
        <p className="text-white/90 text-lg">Drag and drop files here</p>
        <Input
          id="fileInput"
          type="file"
          multiple
          onChange={(e) => setFile?.(Array.from(e.target.files || []))}
          className="hidden"
        />

        <Label
          htmlFor="fileInput"
          className="flex items-center justify-center w-full h-40 border-2 border-dashed border-white bg-black/10 rounded-3xl cursor-pointer"
        >
          <span className="text-white">Click or drag files here</span>
        </Label>
      </div>

      {/* Subtle overlay for drag state */}
      {/* isDragOver &&  */}

    </div>
  )
}
