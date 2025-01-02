'use client'

import { handleSignIn } from 'libs/action/auth'
import { useActionState, useState } from 'react'
import { FormSigninState, FormSigninValues } from 'type/form'

export function SigninForm() {
  const initialState: FormSigninState = {
    errors: {},
    message: '',
    values: {},
  }
  const [state, dispatch] = useActionState(handleSignIn, initialState)

  const [formValue, setFormValue] = useState<FormSigninValues>({
    email: '',
  })

  return (
    <form action={dispatch} noValidate>
      <div>
        <label htmlFor="email">メールアドレス</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formValue.email}
          onChange={(e) =>
            setFormValue({ ...formValue, email: e.target.value })
          }
        />
        {state.errors?.email && (
          <p className="text-red-500">{state.errors.email[0]}</p>
        )}
      </div>
      <div>
        <label htmlFor="password">パスワード</label>
        <input type="password" name="password" id="password" />
        {state.errors?.password &&
          state.errors.password.map((error: string, index: number) => (
            <p className="text-red-500" key={index}>
              {error}
            </p>
          ))}
      </div>
      <button type="submit">ログイン</button>
    </form>
  )
}
