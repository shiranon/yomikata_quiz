'use server'

import axios from 'axios'
import { updateAuthor } from 'libs/api/api-author'
import { AuthorFormScheme } from 'libs/definitions'
import { z } from 'zod'

type FormValues = z.infer<typeof AuthorFormScheme>

type ActionResponse = {
  success: boolean
  message: string
}

export async function handleUpdateAdminAuthor(
  data: FormValues,
): Promise<ActionResponse> {
  try {
    const formData = new FormData()
    formData.append('author[name]', data.name.trim())
    formData.append('author[description]', data.description.trim())
    await updateAuthor(formData)
    return {
      success: true,
      message: '更新が完了しました',
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 422) {
      return {
        success: false,
        message: 'APIエラーが発生しました',
      }
    }
    console.error('出版社更新エラー:', error)
    return {
      success: false,
      message:
        error instanceof z.ZodError
          ? `${error.errors.map((e) => e.message).join(', ')}`
          : '更新中にエラーが発生しました',
    }
  }
}
