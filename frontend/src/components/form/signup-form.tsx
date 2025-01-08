'use client'

import { handleSignUp } from 'libs/action/action-auth'
import { useActionState, useState } from 'react'
import { FormSignupState, FormSignupValues } from 'type/form'

export function SignupForm() {
  const initialState: FormSignupState = {
    errors: {},
    message: '',
    values: {},
  }
  const [state, dispatch] = useActionState(handleSignUp, initialState)
  const [formValue, setFormValue] = useState<FormSignupValues>({
    name: '',
    email: '',
  })
  return (
    <form action={dispatch}>
      <div>
        <label htmlFor="name">ニックネーム</label>
        <input type="text" name="name" id="name" value={state.values.name} />
        {state.errors?.name && (
          <p className="text-red-500">{state.errors.name[0]}</p>
        )}
      </div>
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
      <div>
        <label htmlFor="passwordConfirmation">パスワード確認</label>
        <input
          type="password"
          name="passwordConfirmation"
          id="passwordConfirmation"
        />
        {state.errors?.passwordConfirmation && (
          <p className="text-red-500">{state.errors.passwordConfirmation[0]}</p>
        )}
      </div>
      <button type="submit">登録</button>
    </form>
  )
}
