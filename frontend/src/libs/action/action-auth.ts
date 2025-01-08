'use server'

import axios from 'axios'
import { signIn, signUp } from 'libs/api/api-auth'
import { SigninFormScheme, SignupFormScheme } from 'libs/definitions'
import { setSession } from 'libs/session'
import { redirect } from 'next/navigation'
import { FormSigninState, FormSignupState } from 'type/form'

export async function handleSignUp(
  prevState: FormSignupState,
  formData: FormData,
): Promise<FormSignupState> {
  try {
    const validatedFields = SignupFormScheme.safeParse(
      Object.fromEntries(formData),
    )

    if (!validatedFields.success) {
      return {
        ...prevState,
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'バリデーションエラーが発生しました',
      }
    }

    // サインアップ処理
    await signUp(formData)
    return {
      ...prevState,
      errors: {},
      message: '登録が完了しました',
    }
  } catch (error) {
    // Railsバリデーションエラー
    if (axios.isAxiosError(error) && error.response?.status === 422) {
      return {
        ...prevState,
        errors: error.response.data.errors,
        message: 'APIエラーが発生しました',
      }
    }

    // その他のエラー
    console.error('サインアップエラー:', error)
    return {
      ...prevState,
      errors: {},
      message: '予期せぬエラーが発生しました',
    }
  }
}

export async function handleSignIn(
  prevState: FormSigninState,
  formData: FormData,
): Promise<FormSigninState> {
  try {
    const validatedFields = SigninFormScheme.safeParse(
      Object.fromEntries(formData),
    )
    if (!validatedFields.success) {
      return {
        ...prevState,
        values: {
          email: formData.get('email') as string,
        },
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'バリデーションエラーが発生しました',
      }
    }

    // サインイン処理
    const response = await signIn(formData)
    await setSession(response)
    return redirect('/admin/index')
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 422) {
      return {
        ...prevState,
        errors: error.response.data.errors,
        message: 'APIエラーが発生しました',
      }
    }

    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return {
        ...prevState,
        errors: {
          login: ['メールアドレスまたはパスワードが間違っています'],
        },
        message: 'ログインに失敗しました',
      }
    }
    return {
      ...prevState,
      errors: {},
      message: '予期せぬエラーが発生しました',
    }
  }
}
