'use server'

import { setHeaderConfig } from 'libs/auth'
import client from './api-client'

// マイリスト一覧を取得
export const getMylists = async () => {
  const config = await setHeaderConfig()
  return client.get('/mylists', config)
}

// 特定のマイリストを取得
export const getMylist = async (id: string) => {
  const config = await setHeaderConfig()
  return client.get(`/mylists/${id}`, config)
}

// マイリストを作成
export const createMylist = async (data: {
  title: string
  description: string
  is_public: boolean
  user_id?: number
}) => {
  const config = await setHeaderConfig()
  return client.post('/mylists', { mylist: data }, config)
}

// マイリストを更新
export const updateMylist = async (
  id: string,
  data: {
    title: string
    description: string
    is_public: boolean
  },
) => {
  const config = await setHeaderConfig()
  return client.patch(`/mylists/${id}`, { mylist: data }, config)
}

// マイリストを削除
export const deleteMylist = async (id: string) => {
  const config = await setHeaderConfig()
  return client.delete(`/mylists/${id}`, config)
}

// クイズをマイリストに追加
export const addQuizToMylist = async (mylistId: string, quizId: string) => {
  const config = await setHeaderConfig()
  return client.post(
    `/mylists/${mylistId}/add_quiz`,
    { quiz_id: quizId },
    config,
  )
}

// クイズをマイリストから削除
export const removeQuizFromMylist = async (
  mylistId: string,
  quizId: string,
) => {
  const config = await setHeaderConfig()
  return client.delete(`/mylists/${mylistId}/remove_quiz`, {
    ...config,
    data: { quiz_id: quizId },
  })
}

// ユーザーのマイリスト一覧を取得
export const getUserMylists = async () => {
  const config = await setHeaderConfig()
  return client.get('/user/mylists', config)
}
