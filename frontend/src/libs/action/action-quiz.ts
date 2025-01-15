'use server'

import axios from 'axios'
import { updateQuiz } from 'libs/api/api-quiz'
import { QuizFormScheme } from 'libs/definitions'
import { z } from 'zod'

type FormValues = z.infer<typeof QuizFormScheme>

type ActionResponse = {
  success: boolean
  message: string
}

export async function handleUpdateAdminQuiz(
  data: FormValues,
): Promise<ActionResponse> {
  try {
    const formData = new FormData()
    formData.append('quiz[question]', data.question.trim())
    formData.append('quiz[answer]', data.answer.trim())
    formData.append('quiz[description]', data.description.trim())
    formData.append('quiz[comicId]', data.comicId.toString())

    if (data.quizImage instanceof File) {
      formData.append('quiz[quizImage]', data.quizImage, data.quizImage.name)
    }

    await updateQuiz(formData)
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
    console.error('クイズ更新エラー:', error)
    return {
      success: false,
      message:
        error instanceof z.ZodError
          ? `${error.errors.map((e) => e.message).join(', ')}`
          : '更新中にエラーが発生しました',
    }
  }
}
