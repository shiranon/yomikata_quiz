'use server'

import axios from 'axios'
import { updatePublisher } from 'libs/api/api-publishers'
import { PublisherFormScheme } from 'libs/definitions'
import { z } from 'zod'

type FormValues = z.infer<typeof PublisherFormScheme>

type ActionResponse = {
  success: boolean
  message: string
}

export async function handleUpdateAdminPublisher(
  data: FormValues,
): Promise<ActionResponse> {
  try {
    const formData = new FormData()
    formData.append('publisher[name]', data.name.trim())
    formData.append('publisher[description]', data.description.trim())

    if (data.publisher_image instanceof File) {
      formData.append(
        'publisher[publisher_image]',
        data.publisher_image,
        data.publisher_image.name,
      )
    }

    await updatePublisher(formData)
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
