import { cn } from 'libs/utils'
import Image from 'next/image'
import { ChangeEvent, useState } from 'react'

interface ImageUploaderProps {
  className?: string
  previewSize?: 'sm' | 'md' | 'lg'
  imageUrl?: string
}

export const ImageUploader = ({
  className,
  previewSize = 'md',
  imageUrl,
}: ImageUploaderProps) => {
  const [preview, setPreview] = useState<string>('')

  const previewSizeClass = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32',
    lg: 'w-48 h-48',
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('画像ファイルを選択してください')
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const PreviewImage = ({
    preview,
    imageUrl,
  }: {
    preview: string
    imageUrl?: string
  }) => {
    if (imageUrl && !preview) {
      return (
        <Image
          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${imageUrl}`}
          alt="Preview"
          width={200}
          height={200}
          className="object-cover w-full h-full"
        />
      )
    }
    if (preview) {
      return (
        <Image
          src={preview}
          alt="Preview"
          width={200}
          height={200}
          className="object-cover w-full h-full"
        />
      )
    }
    return <span className="text-gray-400">No image</span>
  }

  return (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      <div
        className={cn(
          'relative border-2 border-dashed border-muted rounded-lg overflow-hidden flex items-center justify-center bg-gray-50',
          previewSizeClass[previewSize],
        )}
      >
        <PreviewImage preview={preview} imageUrl={imageUrl} />
      </div>

      <label className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md cursor-pointer hover:opacity-80">
        画像を選択
        <input
          type="file"
          className="hidden"
          onChange={handleImageChange}
          accept="image/*"
        />
      </label>
    </div>
  )
}
