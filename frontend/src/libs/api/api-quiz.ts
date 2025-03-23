'use server'

import { setHeaderConfig } from 'libs/auth'
import client from './api-client'

// クイズを作成
export const createQuiz = async (formData: FormData) => {
  const config = await setHeaderConfig()
  return client.post('/quizzes', formData, {
    ...config,
    headers: {
      ...config.headers,
      'Content-Type': 'multipart/form-data',
    },
  })
}

// クイズを更新
export const updateQuiz = async (id: string, formData: FormData) => {
  const config = await setHeaderConfig()
  return client.patch(`/quizzes/${id}`, formData, {
    ...config,
    headers: {
      ...config.headers,
      'Content-Type': 'multipart/form-data',
    },
  })
}

// クイズを削除
export const deleteQuiz = async (id: string) => {
  const config = await setHeaderConfig()
  return client.delete(`/quizzes/${id}`, config)
}

// クイズ一覧を取得
export const getQuizzes = async () => {
  const config = await setHeaderConfig()
  return client.get('/quizzes', config)
}

// 特定のクイズを取得
export const getQuiz = async (id: string) => {
  const config = await setHeaderConfig()
  return client.get(`/quizzes/${id}`, config)
}
