'use server'

import { setHeaderConfig } from 'libs/auth'
import { QuizFormScheme } from 'libs/definitions'
import { headers } from 'next/headers'
import client from './api-client'

export const getQuizzes = async () => {
  const config = await setHeaderConfig()
  return client.get('/quizzes', config)
}

export const getQuiz = async (id: string) => {
  const config = await setHeaderConfig()
  return client.get(`/quizzes/${id}`, config)
}

export const updateQuiz = async (formData: FormData) => {
  const requestUrl = (await headers()).get('x-url')
  const id = requestUrl?.split('/').pop()

  // バリデーション用のオブジェクトを作成
  const validationData = {
    quizImage: formData.get('quiz[quizImage]') as File | undefined,
    question: formData.get('quiz[question]')?.toString() ?? '',
    description: formData.get('quiz[description]')?.toString() ?? '',
    answer: formData.get('quiz[answer]')?.toString() ?? '',
    comicId: Number(formData.get('quiz[comicId]')) ?? 0,
  }

  // バリデーション実行
  try {
    const validatedFields = QuizFormScheme.parse(validationData)
    console.log('バリデーション成功:', validatedFields)
  } catch (error) {
    console.error('バリデーション失敗:', error)
    throw error
  }

  const config = await setHeaderConfig()
  config.headers = {
    ...config.headers,
    'Content-Type': 'multipart/form-data',
  }

  return client.patch(`/quizzes/${id}`, formData, config)
}

export const deleteQuiz = async (
  id: string,
): Promise<{ message: string; success: boolean }> => {
  const config = await setHeaderConfig()
  return client.delete(`/quizzes/${id}`, config)
}

export const createQuiz = async (formData: FormData) => {
  const validatedFields = QuizFormScheme.parse(Object.fromEntries(formData))
  const config = await setHeaderConfig()
  return client.post('/quizzes', { quiz: validatedFields }, config)
}
