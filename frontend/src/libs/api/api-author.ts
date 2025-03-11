'use server'

import { setHeaderConfig } from 'libs/auth'
import client from './api-client'

// 作者一覧を取得
export const getAuthors = async () => {
  const config = await setHeaderConfig()
  return client.get('/authors', config)
}

// 特定の作者を取得
export const getAuthor = async (id: string) => {
  const config = await setHeaderConfig()
  return client.get(`/authors/${id}`, config)
}

// 作者を更新
export const updateAuthor = async (formData: FormData) => {
  const config = await setHeaderConfig()
  return client.put('/authors', formData, config)
}
