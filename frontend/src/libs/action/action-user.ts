'use server'

import { updateUser } from 'libs/api/api-users'
import { UserFormScheme } from 'libs/definitions'
import { z } from 'zod'

type FormValues = z.infer<typeof UserFormScheme>

type ActionResponse = {
  success: boolean
  message: string
}

export async function handleUpdateAdminUser(
  data: FormValues,
): Promise<ActionResponse> {
  try {
    const formData = new FormData()
    formData.append('name', data.name.trim())
    formData.append('email', data.email.trim())
    formData.append('admin', String(data.admin))

    await updateUser(formData)
    return {
      success: true,
      message: '更新が完了しました',
    }
  } catch (error) {
    console.error('ユーザー更新エラー:', error)
    return {
      success: false,
      message: '更新中にエラーが発生しました',
    }
  }
}
