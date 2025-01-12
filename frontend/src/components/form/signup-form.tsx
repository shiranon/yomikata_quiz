'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { handleSignUp } from 'libs/action/action-auth'
import { SignupFormScheme } from 'libs/definitions'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FormSignupValues } from 'type/form'

export function SignupForm() {
  const [message, setMessage] = useState<string>('')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSignupValues>({
    resolver: zodResolver(SignupFormScheme),
  })

  const onSubmit = async (data: FormSignupValues) => {
    const result = await handleSignUp(data)
    setMessage(result.message)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">ニックネーム</label>
        <input type="text" id="name" {...register('name')} />
        {errors?.name && (
          <p className="text-red-500">{errors.name.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="email">メールアドレス</label>
        <input
          type="email"
          id="email"
          {...register('email')}
        />
        {errors?.email && (
          <p className="text-red-500">{errors.email.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="password">パスワード</label>
        <input type="password" name="password" id="password" />
        {errors?.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="passwordConfirmation">パスワード確認</label>
        <input
          type="password"
          id="passwordConfirmation"
          {...register('passwordConfirmation')}
        />
        {errors?.passwordConfirmation && (
          <p className="text-red-500">{errors.passwordConfirmation.message}</p>
        )}
      </div>
      <button type="submit">登録</button>
      {message && <p className="text-green-500">{message}</p>}
    </form>
  )
}
