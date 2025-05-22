"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
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
    <div className={className}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={type === "image" ? "image/*" : "video/*"}
        className="hidden"
      />

      {!preview ? (
        <div
          className={`flex flex-col items-center justify-center p-8 text-center cursor-pointer min-h-[200px] border-2 border-dashed rounded-lg transition-colors ${
            isDragging ? "border-violet-500 bg-violet-50" : "border-gray-300 bg-white hover:bg-gray-50"
          }`}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <Upload className="h-8 w-8 text-violet-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {type === "image" ? "Importer une image" : "Importer une vidéo"}
          </h3>
          <p className="text-sm text-gray-500 mb-4">Glissez-déposez ou cliquez pour sélectionner un fichier</p>
          <Button
            variant="outline"
            className="bg-white hover:bg-gray-50 border-violet-300 text-violet-600"
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
        <div className="relative border border-gray-200 rounded-lg overflow-hidden bg-white">
          {type === "image" ? (
            <div className="relative h-[200px] w-full">
              <Image src={preview || "/placeholder.svg"} alt="Aperçu" fill className="object-cover" />
            </div>
          ) : (
            <video src={preview} controls className="w-full h-[200px] object-cover" />
          )}
          <div className="p-4 flex justify-between items-center bg-gray-50 border-t">
            <p className="text-sm text-gray-700 truncate max-w-[70%]">
              {type === "image" ? "Image sélectionnée" : "Vidéo sélectionnée"}
            </p>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 rounded-full border-red-300 text-red-600 hover:bg-red-50"
              onClick={clearFile}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
