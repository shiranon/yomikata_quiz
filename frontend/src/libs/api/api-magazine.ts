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

// 雑誌を更新
export const updateMagazine = async (formData: FormData) => {
  const config = await setHeaderConfig()
  return client.put('/magazines', formData, config)
}

// 雑誌を削除
export const deleteMagazine = async (id: string) => {
  const config = await setHeaderConfig()
  return client.delete(`/magazines/${id}`, config)
}
