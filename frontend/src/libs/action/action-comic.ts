'use server'

import axios from 'axios'
import { updateComic } from 'libs/api/api-comic'
import { ComicFormScheme } from 'libs/definitions'
import { z } from 'zod'

type FormValues = z.infer<typeof ComicFormScheme>

type ActionResponse = {
  success: boolean
  message: string
}

export async function handleUpdateAdminComic(
  data: FormValues,
): Promise<ActionResponse> {
  try {
    const formData = new FormData()
    formData.append('comic[title]', data.title.trim())
    formData.append('comic[description]', data.description.trim())
    formData.append('comic[authorId]', data.authorId.toString())
    formData.append('comic[magazineId]', data.magazineId.toString())

    if (data.comicImage instanceof File) {
      formData.append(
        'comic[comicImage]',
        data.comicImage,
        data.comicImage.name,
      )
    }

    await updateComic(formData)
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
