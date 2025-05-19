"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X, ImageIcon, FileVideo } from "lucide-react"
import Image from "next/image"

interface FileUploadProps {
  onFileSelect: (file: File) => void
  type: "image" | "video"
  value?: string
  className?: string
}

export function FileUpload({ onFileSelect, type, value, className }: FileUploadProps) {
  const [preview, setPreview] = useState<string | null>(value || null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Vérifier le type de fichier
    if (type === "image" && !file.type.startsWith("image/")) {
      alert("Veuillez sélectionner une image")
      return
    }

    if (type === "video" && !file.type.startsWith("video/")) {
      alert("Veuillez sélectionner une vidéo")
      return
    }

    // Créer un URL pour la prévisualisation
    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)
    onFileSelect(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files?.[0]
    if (!file) return

    // Vérifier le type de fichier
    if (type === "image" && !file.type.startsWith("image/")) {
      alert("Veuillez sélectionner une image")
      return
    }

    if (type === "video" && !file.type.startsWith("video/")) {
      alert("Veuillez sélectionner une vidéo")
      return
    }

    // Créer un URL pour la prévisualisation
    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)
    onFileSelect(file)
  }

  const clearFile = () => {
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <Card
      className={`${className} ${
        isDragging ? "border-cyan-500 bg-cyan-500/10" : "border-white/20 bg-white/5"
      } transition-colors`}
    >
      <CardContent className="p-0">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={type === "image" ? "image/*" : "video/*"}
          className="hidden"
        />

        {!preview ? (
          <div
            className="flex flex-col items-center justify-center p-8 text-center cursor-pointer min-h-[200px]"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="w-16 h-16 mb-4 rounded-full bg-white/10 flex items-center justify-center">
              <Upload className="h-8 w-8 text-cyan-400" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">
              {type === "image" ? "Importer une image" : "Importer une vidéo"}
            </h3>
            <p className="text-sm text-white/70 mb-4">Glissez-déposez ou cliquez pour sélectionner un fichier</p>
            <Button
              variant="outline"
              className="bg-white/10 hover:bg-white/20 border-white/20 text-white"
              onClick={(e) => {
                e.stopPropagation()
                fileInputRef.current?.click()
              }}
            >
              {type === "image" ? (
                <>
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Sélectionner une image
                </>
              ) : (
                <>
                  <FileVideo className="mr-2 h-4 w-4" />
                  Sélectionner une vidéo
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="relative">
            {type === "image" ? (
              <div className="relative h-[200px] w-full">
                <Image src={preview || "/placeholder.svg"} alt="Aperçu" fill className="object-cover rounded-t-lg" />
              </div>
            ) : (
              <video src={preview} controls className="w-full h-[200px] object-cover rounded-t-lg" />
            )}
            <div className="p-4 flex justify-between items-center bg-black/50 backdrop-blur-sm">
              <p className="text-sm text-white truncate max-w-[70%]">
                {type === "image" ? "Image sélectionnée" : "Vidéo sélectionnée"}
              </p>
              <Button variant="destructive" size="sm" className="h-8 w-8 p-0 rounded-full" onClick={clearFile}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
