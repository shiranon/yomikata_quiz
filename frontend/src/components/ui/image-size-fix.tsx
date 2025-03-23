import Image from 'next/image'
import { useState } from 'react'

interface ImageHeightFixProps {
  imageUrl: string
  fixedHeight: number
}

export const ImageHeightFix = ({
  imageUrl,
  fixedHeight,
}: ImageHeightFixProps) => {
  const [imageSize, setImageSize] = useState({ width: 256, height: 256 })
  return (
    <div
      className="relative mb-6 mx-auto bg-gray-100 rounded-lg overflow-hidden"
      style={{
        height: `${imageSize.height}px`,
        width: `${imageSize.width}px`,
        maxWidth: '100%',
        maxHeight: `${fixedHeight}px`,
      }}
    >
      <Image
        src={imageUrl}
        alt="クイズ画像"
        fill
        className="object-contain"
        onLoadingComplete={(target) => {
          const aspectRatio = target.naturalWidth / target.naturalHeight

          // 高さは固定、幅はアスペクト比に基づいて計算
          const newHeight = fixedHeight
          const newWidth = Math.round(fixedHeight * aspectRatio)

          const maxWidth = 800
          const finalWidth = Math.min(newWidth, maxWidth)

          setImageSize({ width: finalWidth, height: newHeight })
        }}
      />
    </div>
  )
}
