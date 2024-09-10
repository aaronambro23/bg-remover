'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UploadIcon, ImageIcon } from 'lucide-react'

export function ImageUploader() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const processImage = async () => {
    if (selectedImage) {
      // Simulating a backend process
      await new Promise(resolve => setTimeout(resolve, 2000))
      // In a real application, you would send the image to your backend here
      // and receive the processed image in response
      setProcessedImage(selectedImage)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="bg-primary text-primary-foreground p-4">
        <h1 className="text-2xl font-bold">Image Processor</h1>
      </nav>

      <main className="flex-grow flex p-4">
        <div className="w-1/2 pr-4">
          <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
          <Input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload} 
            className="mb-4"
          />
          {selectedImage && (
            <div className="mb-4">
              <img src={selectedImage} alt="Selected" className="max-w-full h-auto" />
            </div>
          )}
          <Button onClick={processImage} disabled={!selectedImage}>
            <UploadIcon className="mr-2 h-4 w-4" /> Process Image
          </Button>
        </div>

        <div className="w-1/2 pl-4 border-l">
          <h2 className="text-xl font-semibold mb-4">Processed Result</h2>
          {processedImage ? (
            <img src={processedImage} alt="Processed" className="max-w-full h-auto" />
          ) : (
            <div className="flex items-center justify-center h-64 bg-muted rounded-lg">
              <ImageIcon className="h-16 w-16 text-muted-foreground" />
            </div>
          )}
        </div>
      </main>

      <footer className="bg-muted text-muted-foreground p-4 text-center">
        © 2023 Image Processor. All rights reserved.
      </footer>
    </div>
  )
}