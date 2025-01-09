'use server'

import { FormUserState } from 'app/(admin)/_components/type/form'
import axios from 'axios'
import { updateUser } from 'libs/api/api-users'
import { UserFormScheme } from 'libs/definitions'

export async function handleUpdateAdminUser(
  prevState: FormUserState,
  formData: FormData,
): Promise<FormUserState> {
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
