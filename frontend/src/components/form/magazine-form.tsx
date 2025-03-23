'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Magazine, Publisher } from 'app/(admin)/_type/board'
import { Button } from 'components/ui/button'
import { ImageUploader } from 'components/ui/image-upload'
import { Input } from 'components/ui/input'
import { handleUpdateMagazine } from 'libs/action/action-magazine'
import { deleteMagazine } from 'libs/api/api-magazine'
import { MagazineFormScheme } from 'libs/definitions'
import { redirect, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FormMagazineValues } from 'type/form'

export function MagazineForm({
  magazineData,
  publishers,
}: {
  magazineData: Magazine
  publishers: Publisher[]
}) {
  const [message, setMessage] = useState<string>('')
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormMagazineValues>({
    resolver: zodResolver(MagazineFormScheme),
    defaultValues: {
      name: magazineData.name,
      description: magazineData.description,
      publisherId: magazineData.publisher.id ?? 0,
    },
  })

  const router = useRouter()
  const [error, setError] = useState<string>('')

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!confirm('本当に削除してもよろしいですか？')) {
      return
    }

    try {
      const result = await deleteMagazine(magazineData.id.toString())
      if (result.data && result.data.success) {
        router.push('/admin/magazine')
      } else {
        setError(result.data?.message || '削除に失敗しました')
      }
    } catch (err) {
      console.error('削除エラー:', err)
      setError('削除に失敗しました')
    }
  }

  const onSubmit = async (data: FormMagazineValues) => {
    const result = await handleUpdateMagazine(data)
    if (result.success) {
      redirect('/admin/magazine')
    } else {
      setMessage(result.message)
    }
  }

  return (
    <div className="rounded-lg p-5 mx-auto">
      <h1 className="text-2xl font-bold">雑誌編集</h1>
      <form
        className="flex flex-col font-semibold"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="w-full pt-5 flex items-center">
          <label className="text-right pr-2 text-xs w-12" htmlFor="name">
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
          <label className="text-right pr-2 text-xs w-12" htmlFor="publisher">
            出版社
          </label>
          <div className="flex flex-col">
            <select
              className="w-96 border-2 border-primary rounded-md p-2 outline-none"
              id="publisherId"
              {...register('publisherId', {
                valueAsNumber: true,
              })}
            >
              <option value={0}>選択してください</option>
              {publishers.map((publisher) => (
                <option key={publisher.id} value={publisher.id}>
                  {publisher.name}
                </option>
              ))}
            </select>
            {errors?.publisherId && (
              <p className="text-red-400 text-xs pl-3">
                {errors.publisherId.message}
              </p>
            )}
          </div>
        </div>
        <div className="w-full pt-5 flex items-center">
          <label className="text-right pr-2 text-xs w-12" htmlFor="description">
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
            className="inline-block text-right text-xs w-12"
            htmlFor="magazineImage"
          >
            画像
          </label>
          <div className="flex flex-col justify-center items-center w-full">
            <ImageUploader
              previewSize="lg"
              imageUrl={magazineData.magazineImageUrl}
              onChange={(file) => setValue('magazineImage', file)}
            />
            {errors?.magazineImage && (
              <p className="text-red-400 text-xs pl-3">
                {errors.magazineImage.message}
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
            onClick={(e) => handleDelete(e)}
            type="button"
          >
            削除
          </Button>
        </div>
      </form>
    </div>
  )
}
