'use client'

import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'
import { handleUpdateAdminUser } from 'libs/action/action-user'
import { deleteUser } from 'libs/api/api-users'
import { useRouter } from 'next/navigation'
import { useActionState, useState } from 'react'
import { User } from 'type/auth'
import { FormUserState, FormUserValues } from '../type/form'

export function UserForm({ userData }: { userData: User }) {
  const initialState: FormUserState = {
    errors: {},
    message: '',
    values: {
      name: userData.name,
      email: userData.email,
      admin: userData.admin,
    },
  }

  const [state, dispatch] = useActionState(handleUpdateAdminUser, initialState)

  const [formValue, setFormValue] = useState<FormUserValues>({
    name: userData.name,
    email: userData.email,
    admin: userData.admin,
  })

  const router = useRouter()
  const [error, setError] = useState<string>('')

  const handleDelete = async () => {
    if (!confirm('本当に削除してもよろしいですか？')) {
      return
    }

    try {
      const result = await deleteUser(Number(userData.id))
      if (result.success) {
        router.push('/admin/user')
      } else {
        setError(result.message)
      }
    } catch (err) {
      console.error('削除エラー:', err)
      setError('削除に失敗しました')
    }
  }

  return (
    <div className="rounded-lg p-5 mx-auto">
      <h1 className="text-2xl font-bold">ユーザー編集</h1>
      <form
        className="flex flex-col font-semibold"
        action={dispatch}
        noValidate
      >
        <div className="w-full pt-5 flex items-center">
          <label className="w-32 text-right pr-2 text-xs" htmlFor="name">
            名前
          </label>
          <div className="flex flex-wrap">
            <Input
              className="w-64"
              type="text"
              name="name"
              id="name"
              value={formValue.name}
              onChange={(e) =>
                setFormValue({ ...formValue, name: e.target.value })
              }
            />
            {state.errors?.name && (
              <p className="text-red-400 text-xs pl-3">
                {state.errors.name[0]}
              </p>
            )}
          </div>
        </div>
        <div className="w-full pt-5 flex items-center">
          <label className="w-32 text-right pr-2 text-xs" htmlFor="email">
            メールアドレス
          </label>
          <div className="flex flex-wrap w-64">
            <Input
              className="w-64"
              type="email"
              name="email"
              id="email"
              value={formValue.email}
              onChange={(e) =>
                setFormValue({ ...formValue, email: e.target.value })
              }
            />
            {state.errors?.email && (
              <p className="text-red-400 text-xs pl-3">
                {state.errors.email[0]}
              </p>
            )}
          </div>
        </div>
        <div className="w-full py-5 flex items-center">
          <label className="w-32 text-right pr-2 text-xs" htmlFor="admin">
            管理者権限
          </label>
          <div className="flex flex-wrap w-64">
            <Input
              type="checkbox"
              name="admin"
              id="admin"
              checked={formValue.admin}
              onChange={(e) =>
                setFormValue({ ...formValue, admin: e.target.checked })
              }
            />
            {state.errors?.admin && (
              <p className="text-red-400 text-xs pl-3">
                {state.errors.admin[0]}
              </p>
            )}
          </div>
        </div>

        {state.message && (
          <p className="text-green-400 text-xs pl-3 pb-3">{state.message}</p>
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
