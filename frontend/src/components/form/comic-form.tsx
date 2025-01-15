'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Author, Comic, Magazine } from 'app/(admin)/_type/board'
import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'
import { handleUpdateAdminComic } from 'libs/action/action-comic'
import { deleteComic } from 'libs/api/api-comic'
import { ComicFormScheme } from 'libs/definitions'
import { redirect, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FormAdminComicValues } from 'type/form'

export function ComicForm({
  comicData,
  magazines,
  authors,
}: {
  comicData: Comic
  magazines: Magazine[]
  authors: Author[]
}) {
  const [message, setMessage] = useState<string>('')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormAdminComicValues>({
    resolver: zodResolver(ComicFormScheme),
    defaultValues: {
      title: comicData.title,
      description: comicData.description,
      authorId: comicData.author.id,
      magazineId: comicData.magazine.id,
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
      const result = await deleteComic(comicData.id.toString())
      if (result.success) {
        router.push('/admin/comic')
      } else {
        setError(result.message)
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('削除に失敗しました')
      }
    }
  }

  const onSubmit = async (data: FormAdminComicValues) => {
    const result = await handleUpdateAdminComic(data)
    if (result.success) {
      redirect('/admin/comic')
    } else {
      setMessage(result.message)
    }
  }

  return (
    <div className="rounded-lg p-5 mx-auto">
      <h1 className="text-2xl font-bold">漫画編集</h1>
      <form
        className="flex flex-col font-semibold"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="w-full pt-5 flex items-center">
          <label className="text-right pr-2 text-xs w-16" htmlFor="title">
            タイトル
          </label>
          <div className="flex flex-col">
            <Input
              className="w-96"
              type="text"
              id="title"
              {...register('title')}
            />
            {errors?.title && (
              <p className="text-red-400 text-xs pl-3">
                {errors.title.message}
              </p>
            )}
          </div>
        </div>

        <div className="w-full pt-5 flex items-center">
          <label className="text-right pr-2 text-xs w-16" htmlFor="description">
            説明
          </label>
          <div className="flex flex-col">
            <Input
              className="w-96"
              type="text"
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
        <div className="w-full pt-5 flex items-center">
          <label className="text-right pr-2 text-xs w-16" htmlFor="authorId">
            著者
          </label>
          <div className="flex flex-col">
            <select
              className="w-96 border-2 border-primary rounded-md p-2 outline-none"
              id="authorId"
              {...register('authorId', {
                valueAsNumber: true,
              })}
            >
              <option value={0}>選択してください</option>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>
            {errors?.authorId && (
              <p className="text-red-400 text-xs pl-3">
                {errors.authorId.message}
              </p>
            )}
          </div>
        </div>
        <div className="w-full pt-5 flex items-center">
          <label className="text-right pr-2 text-xs w-16" htmlFor="magazineId">
            雑誌
          </label>
          <div className="flex flex-col">
            <select
              className="w-96 border-2 border-primary rounded-md p-2 outline-none"
              id="magazineId"
              {...register('magazineId', {
                valueAsNumber: true,
              })}
            >
              <option value={0}>選択してください</option>
              {magazines.map((magazine) => (
                <option key={magazine.id} value={magazine.id}>
                  {magazine.name}
                </option>
              ))}
            </select>
            {errors?.magazineId && (
              <p className="text-red-400 text-xs pl-3">
                {errors.magazineId.message}
              </p>
            )}
          </div>
        </div>

        {message && (
          <p className="text-green-400 text-xs pl-3 pb-3">{message}</p>
        )}
        {error && <p className="text-red-400 text-xs pl-3 pb-3">{error}</p>}
        <div className="flex justify-center gap-5 mt-5">
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
