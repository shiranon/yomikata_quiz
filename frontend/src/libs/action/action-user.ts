'use server'

import axios from 'axios'
import { updateUser } from 'libs/api/api-users'
import { UserFormScheme } from 'libs/definitions'
import { FormAdminUserState } from 'type/form'

export async function handleUpdateAdminUser(
  prevState: FormAdminUserState,
  formData: FormData,
): Promise<FormAdminUserState> {
  try {
    const validatedFields = UserFormScheme.safeParse(
      Object.fromEntries(formData),
    )
    if (!validatedFields.success) {
      return {
        ...prevState,
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'バリデーションエラーが発生しました',
      }
    }
    await updateUser(formData)
    return {
      ...prevState,
      errors: {},
      message: '更新が完了しました',
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 422) {
      return {
        ...prevState,
        errors: error.response.data.errors,
        message: 'APIエラーが発生しました',
      }
    }
    console.error('ユーザー更新エラー:', error)
    return {
      ...prevState,
      errors: {},
      message: '予期せぬエラーが発生しました',
    }
  }
}
