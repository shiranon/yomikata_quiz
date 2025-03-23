'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'
import { handleUpdateUser } from 'libs/action/action-user'
import { deleteUser } from 'libs/api/api-users'
import { UserFormScheme } from 'libs/definitions'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { User } from 'type/auth'
import { FormUserValues } from 'type/form'

export function UserForm({ userData }: { userData: User }) {
  const [message, setMessage] = useState<string>('')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormUserValues>({
    resolver: zodResolver(UserFormScheme),
    defaultValues: {
      name: userData.name,
      email: userData.email,
      admin: userData.admin,
    },
  })

  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm('本当に削除してもよろしいですか？')) {
      return
    }

    try {
      const result = await deleteUser(Number(userData.id))
      if (result.success) {
        router.push('/admin/user')
      } else {
        setMessage(result.message)
      }
    } catch (err) {
      console.error('削除エラー:', err)
      setMessage('削除に失敗しました')
    }
  }

  const onSubmit = async (data: FormUserValues) => {
    const result = await handleUpdateUser(data)
    setMessage(result.message)
  }

  return (
    <div className="rounded-lg p-5 mx-auto">
      <h1 className="text-2xl font-bold">ユーザー編集</h1>
      <form
        className="flex flex-col font-semibold"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="w-full pt-5 flex items-center">
          <label className="w-24 text-right pr-2 text-xs" htmlFor="name">
            名前
          </label>
          <div className="flex flex-wrap">
            <Input
              className="w-64"
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
          <label className="w-24 text-right pr-2 text-xs" htmlFor="email">
            メールアドレス
          </label>
          <div className="flex flex-wrap">
            <Input
              className="w-64"
              type="email"
              id="email"
              {...register('email')}
            />
            {errors?.email && (
              <p className="text-red-400 text-xs pl-3">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>
        <div className="w-full py-5 flex items-center">
          <label className="w-32 text-right pr-2 text-xs" htmlFor="admin">
            管理者権限
          </label>
          <div className="flex flex-wrap">
            <Input
              type="checkbox"
              id="admin"
              value="true"
              {...register('admin')}
            />
            {errors?.admin && (
              <p className="text-red-400 text-xs pl-3">
                {errors.admin.message}
              </p>
            )}
          </div>
        </div>

        {message && (
          <p className="text-green-400 text-xs pl-3 pb-3">{message}</p>
        )}
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
