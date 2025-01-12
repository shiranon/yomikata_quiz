'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'
import { handleSignIn } from 'libs/action/action-auth'
import { SigninFormScheme } from 'libs/definitions'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FormSigninValues } from 'type/form'

export function SigninForm() {
  const [message, setMessage] = useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSigninValues>({
    resolver: zodResolver(SigninFormScheme),
  })

  const onSubmit = async (data: FormSigninValues) => {
    const result = await handleSignIn(data)
    setMessage(result.message)
  }

  return (
    <div className="border-2 border-border rounded-lg p-5 mx-auto">
      <form
        className="flex flex-col font-semibold"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="w-[320px] pt-5 flex items-center">
          <label className="w-24 text-right pr-2 text-xs" htmlFor="email">
            メールアドレス
          </label>
          <div className="flex flex-wrap w-52">
            <Input type="email" id="email" {...register('email')} />
            {errors?.email && (
              <p className="text-red-400 text-xs pl-3">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>
        <div className="w-[320px] pt-3 pb-4 flex items-center">
          <label className="w-24 text-right pr-2 text-xs" htmlFor="password">
            パスワード
          </label>
          <div className="flex flex-wrap w-52">
            <Input type="password" id="password" {...register('password')} />
            {errors?.password && (
              <p className="text-red-400 text-xs pl-3">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>
        {message && <p className="text-red-400 text-xs pl-3 pb-3">{message}</p>}
        <div className="flex justify-center">
          <Button
            className="w-1/2"
            size={'sm'}
            variant={'default'}
            type="submit"
          >
            ログイン
          </Button>
        </div>
      </form>
    </div>
  )
}
