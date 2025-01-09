'use client'

import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'
import { handleSignIn } from 'libs/action/action-auth'
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
    <div className="border-2 border-border rounded-lg p-5 mx-auto">
      <form
        className="flex flex-col font-semibold"
        action={dispatch}
        noValidate
      >
        <div className="w-[320px] pt-5 flex items-center">
          <label className="w-24 text-right pr-2 text-xs" htmlFor="email">
            メールアドレス
          </label>
          <div className="flex flex-wrap w-52">
            <Input
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
        <div className="w-[320px] pt-3 pb-4 flex items-center">
          <label className="w-24 text-right pr-2 text-xs" htmlFor="password">
            パスワード
          </label>
          <div className="flex flex-wrap w-52">
            <Input type="password" name="password" id="password" />
            {state.errors?.password &&
              state.errors.password.map((error: string, index: number) => (
                <p className="text-red-400 text-xs pl-3" key={index}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        {state.errors?.login &&
          state.errors.login.map((error: string, index: number) => (
            <p className="text-red-400 text-xs pl-3 pb-3" key={index}>
              {error}
            </p>
          ))}
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
