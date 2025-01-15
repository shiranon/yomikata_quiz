'use server'

import axios from 'axios'
import { signIn, signUp } from 'libs/api/api-auth'
import { SigninFormScheme, SignupFormScheme } from 'libs/definitions'
import { setSession } from 'libs/session'
import { redirect } from 'next/navigation'
import { z } from 'zod'

type SigninFormValues = z.infer<typeof SigninFormScheme>
type SignupFormValues = z.infer<typeof SignupFormScheme>
type ActionResponse = {
  success: boolean
  message: string
}

export async function handleSignUp(
  data: SignupFormValues,
): Promise<ActionResponse> {
  try {
    const formData = new FormData()
    formData.append('name', data.name.trim())
    formData.append('email', data.email.trim())
    formData.append('password', data.password.trim())
    formData.append('passwordConfirmation', data.passwordConfirmation.trim())

    await signUp(formData)
    return {
      success: true,
      message: '登録が完了しました',
    }
  } catch (error) {
    // Railsバリデーションエラー
    if (axios.isAxiosError(error) && error.response?.status === 422) {
      return {
        success: false,
        message: 'APIエラーが発生しました',
      }
    }

    // その他のエラー
    console.error('サインアップエラー:', error)
    return {
      success: false,
      message: '予期せぬエラーが発生しました',
    }
  }
}

export async function handleSignIn(data: SigninFormValues) {
  try {
    const formData = new FormData()
    formData.append('email', data.email.trim())
    formData.append('password', data.password.trim())

    await signIn(formData)
    // サインイン処理
    const response = await signIn(formData)
    await setSession(response)
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 422) {
      return {
        success: false,
        message: 'APIエラーが発生しました',
      }
    }

    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return {
        success: false,
        message: 'ログインに失敗しました',
      }
    }
    return {
      success: false,
      message: '予期せぬエラーが発生しました',
    }
  }
  return redirect('/admin/quiz')
}
