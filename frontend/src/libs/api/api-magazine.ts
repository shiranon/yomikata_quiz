'use server'

import { setHeaderConfig } from 'libs/auth'
import client from './api-client'

// 雑誌一覧を取得
export const getMagazines = async () => {
  const config = await setHeaderConfig()
  return client.get('/magazines', config)
}

// 特定の雑誌を取得
export const getMagazine = async (id: string) => {
  const config = await setHeaderConfig()
  return client.get(`/magazines/${id}`, config)
}
