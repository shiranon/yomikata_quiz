'use server'

import axios from 'axios'
import { updateMagazine } from 'libs/api/api-magazine'
import { MagazineFormScheme } from 'libs/definitions'
import { z } from 'zod'

type FormValues = z.infer<typeof MagazineFormScheme>

type ActionResponse = {
  success: boolean
  message: string
}

export async function handleUpdateMagazine(
  data: FormValues,
): Promise<ActionResponse> {
  try {
    const formData = new FormData()
    formData.append('magazine[name]', data.name.trim())
    formData.append('magazine[description]', data.description.trim())
    formData.append('magazine[publisherId]', data.publisherId.toString())

    if (data.magazineImage instanceof File) {
      formData.append(
        'magazine[magazineImage]',
        data.magazineImage,
        data.magazineImage.name,
      )
    }

    await updateMagazine(formData)
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
    console.error('雑誌更新エラー:', error)
    return {
      success: false,
      message:
        error instanceof z.ZodError
          ? `${error.errors.map((e) => e.message).join(', ')}`
          : '更新中にエラーが発生しました',
    }
  }
}
