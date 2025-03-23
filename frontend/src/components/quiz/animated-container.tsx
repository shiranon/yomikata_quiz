'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode, useEffect, useState } from 'react'

interface AnimatedContainerProps {
  children: ReactNode
  isVisible: boolean
  id: string | number // キーとして使用するユニークな識別子
  onExitComplete?: () => void
}

// アニメーション設定
const variants = {
  enter: (direction: number) => ({
    y: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    y: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    y: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
}

// トランジション設定
const transition = {
  y: { type: 'spring', stiffness: 300, damping: 30 },
  opacity: { duration: 0.2 },
}

export function AnimatedContainer({
  children,
  isVisible,
  id,
  onExitComplete,
}: AnimatedContainerProps) {
  const [direction, setDirection] = useState(1)
  const [prevId, setPrevId] = useState<string | number | null>(null)

  // IDが変わった時に方向を設定
  useEffect(() => {
    if (prevId !== null) {
      // 数値の場合は大小比較、文字列の場合はそのまま比較
      if (typeof id === 'number' && typeof prevId === 'number') {
        setDirection(id > prevId ? 1 : -1)
      } else {
        setDirection(String(id) > String(prevId) ? 1 : -1)
      }
    }
    setPrevId(id)
  }, [id, prevId])

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={onExitComplete}
      >
        {isVisible && (
          <motion.div
            key={id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
            className="w-full"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// 画像用のアニメーションコンポーネント
export function AnimatedImage({
  src,
  alt,
  className,
}: {
  src: string
  alt: string
  className?: string
}) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
      <motion.img
        src={src}
        alt={alt}
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  )
}
