'use server'

import { setHeaderConfig } from 'libs/auth'
import client from './api-client'

// 出版社一覧を取得
export const getPublishers = async () => {
  const config = await setHeaderConfig()
  return client.get('/publishers', config)
}

// 特定の出版社を取得
export const getPublisher = async (id: string) => {
  const config = await setHeaderConfig()
  return client.get(`/publishers/${id}`, config)
}
