'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Publisher } from 'app/(admin)/_type/board'
import { Button } from 'components/ui/button'
import { ImageUploader } from 'components/ui/image-upload'
import { Input } from 'components/ui/input'
import { handleUpdatePublisher } from 'libs/action/action-publisher'
import { deletePublisher } from 'libs/api/api-publishers'
import { PublisherFormScheme } from 'libs/definitions'
import { redirect, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FormPublisherValues } from 'type/form'

export function PublisherForm({ publisherData }: { publisherData: Publisher }) {
  const [message, setMessage] = useState<string>('')
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormPublisherValues>({
    resolver: zodResolver(PublisherFormScheme),
    defaultValues: {
      name: publisherData.name,
      description: publisherData.description,
    },
  })

  const router = useRouter()
  const [error, setError] = useState<string>('')

  const handleDelete = async () => {
    if (!confirm('本当に削除してもよろしいですか？')) {
      return
    }

    try {
      const result = await deletePublisher(Number(publisherData.id))
      if (result.success) {
        router.push('/admin/publisher')
      } else {
        setError(result.message)
      }
    } catch (err) {
      console.error('削除エラー:', err)
      setError('削除に失敗しました')
    }
  }

  const onSubmit = async (data: FormPublisherValues) => {
    const result = await handleUpdatePublisher(data)
    if (result.success) {
      redirect('/admin/publisher')
    } else {
      setMessage(result.message)
    }
  }

  return (
    <div className="rounded-lg p-5 mx-auto">
      <h1 className="text-2xl font-bold">出版社編集</h1>
      <form
        className="flex flex-col font-semibold"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="w-full pt-5 flex items-center">
          <label className="text-right pr-2 text-xs" htmlFor="name">
            名前
          </label>
          <div className="flex flex-col">
            <Input
              className="w-96"
              type="text"
              id="name"
              {...register('name')}
            />
            {errors?.name && (
              <p className="text-red-400 text-xs pl-3">{errors.name.message}</p>
            )}
          </div>
        </div>
        <div className="w-full pt-5 flex items-center">
          <label className="text-right pr-2 text-xs" htmlFor="description">
            説明
          </label>
          <div className="flex flex-col">
            <textarea
              className="w-96 h-36 border-2 border-primary rounded-md p-2"
              id="description"
              {...register('description')}
            />
            {errors?.description && (
              <p className="text-red-400 text-xs pl-3">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>
        <div className="w-full py-5 flex items-center">
          <label
            className="text-right text-xs pr-2 w-[34px]"
            htmlFor="publisherImage"
          >
            画像
          </label>
          <div className="flex flex-col justify-center items-center w-full">
            <ImageUploader
              previewSize="lg"
              imageUrl={publisherData.publisherImageUrl}
              onChange={(file) => setValue('publisherImage', file)}
            />
            {errors?.publisherImage && (
              <p className="text-red-400 text-xs pl-3">
                {errors.publisherImage.message}
              </p>
            )}
          </div>
        </div>

        {message && (
          <p className="text-green-400 text-xs pl-3 pb-3">{message}</p>
        )}
        {error && <p className="text-red-400 text-xs pl-3 pb-3">{error}</p>}
        <div className="flex justify-center gap-5">
          <Button
            className="w-1/3"
            size={'sm'}
            variant={'default'}
            type="submit"
          >
            更新
          </Button>
          <Button
            className="w-1/3"
            size={'sm'}
            variant={'outline'}
            onClick={handleDelete}
            type="button"
          >
            削除
          </Button>
        </div>
      </form>
    </div>
  )
}
