'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Author } from 'app/(admin)/_type/board'
import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'
import { handleUpdateAuthor } from 'libs/action/action-author'
import { deleteAuthor } from 'libs/api/api-author'
import { AuthorFormScheme } from 'libs/definitions'
import { redirect, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FormAuthorValues } from 'type/form'

export function AuthorForm({ authorData }: { authorData: Author }) {
  const [message, setMessage] = useState<string>('')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormAuthorValues>({
    resolver: zodResolver(AuthorFormScheme),
    defaultValues: {
      name: authorData.name,
      description: authorData.description,
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
      const result = await deleteAuthor(authorData.id.toString())
      if (result.data && result.data.success) {
        router.push('/admin/magazine')
      } else {
        setError(result.data?.message || '削除に失敗しました')
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('削除に失敗しました')
      }
    }
  }

  const onSubmit = async (data: FormAuthorValues) => {
    const result = await handleUpdateAuthor(data)
    if (result.success) {
      redirect('/admin/author')
    } else {
      setMessage(result.message)
    }
  }

  return (
    <div className="rounded-lg p-5 mx-auto">
      <h1 className="text-2xl font-bold">著者編集</h1>
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
          <label className="text-right pr-2 text-xs w-12" htmlFor="name">
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
