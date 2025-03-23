'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'
import { handleCreateMylist, handleUpdateMylist } from 'libs/action/action-mylist'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

// マイリストフォームのバリデーションスキーマ
const MylistFormSchema = z.object({
  title: z.string().min(2, { message: 'タイトルが短すぎます' }).trim(),
  description: z.string().min(2, { message: '説明が短すぎます' }).trim(),
  is_public: z.boolean().default(false),
})

type FormValues = z.infer<typeof MylistFormSchema>

interface MylistFormProps {
  initialData?: {
    id: string
    title: string
    description: string
    is_public: boolean
  }
  onSuccess?: () => void
}

export function MylistForm({ initialData, onSuccess }: MylistFormProps) {
  const [message, setMessage] = useState<string>('')
  const [error, setError] = useState<string>('')
  const router = useRouter()
  const isEditing = !!initialData

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(MylistFormSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      is_public: initialData?.is_public || false,
    },
  })

  const onSubmit = async (data: FormValues) => {
    try {
      let result

      if (isEditing && initialData) {
        result = await handleUpdateMylist(initialData.id, data)
      } else {
        result = await handleCreateMylist(data)
      }

      if (result.success) {
        setMessage(result.message)
        setError('')
        
        if (onSuccess) {
          onSuccess()
        } else {
          // 成功後にマイリスト一覧ページに遷移
          router.push('/user/mypage/mylists')
          router.refresh()
        }
      } else {
        setError(result.message)
        setMessage('')
      }
    } catch (err) {
      console.error('フォーム送信エラー:', err)
      setError('エラーが発生しました')
      setMessage('')
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        {isEditing ? 'マイリストを編集' : '新しいマイリストを作成'}
      </h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            タイトル
          </label>
          <Input
            id="title"
            {...register('title')}
            placeholder="マイリストのタイトル"
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            説明
          </label>
          <textarea
            id="description"
            {...register('description')}
            placeholder="マイリストの説明"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            rows={4}
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
          )}
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="is_public"
            {...register('is_public')}
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <label htmlFor="is_public" className="ml-2 block text-sm">
            公開する
          </label>
        </div>
        
        {message && (
          <p className="text-green-500 text-sm">{message}</p>
        )}
        
        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}
        
        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? '送信中...' : isEditing ? '更新する' : '作成する'}
        </Button>
      </form>
    </div>
  )
}