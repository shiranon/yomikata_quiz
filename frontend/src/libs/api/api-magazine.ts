'use server'
import { headers } from 'next/headers'
import client from './api-client'

import axios from 'axios'
import { setHeaderConfig } from 'libs/auth'
import { MagazineFormScheme } from 'libs/definitions'

export const getMagazines = async () => {
  const config = await setHeaderConfig()
  return client.get('/magazines', config)
}

export const getMagazine = async (id: string) => {
  const config = await setHeaderConfig()
  return client.get(`/magazines/${id}`, config)
}

export const updateMagazine = async (formData: FormData) => {
  const requestUrl = (await headers()).get('x-url')
  const id = requestUrl?.split('/').pop()

  const validationData = {
    name: formData.get('magazine[name]')?.toString() ?? '',
    description: formData.get('magazine[description]')?.toString() ?? '',
    publisherId: Number(formData.get('magazine[publisherId]')) ?? 0,
    magazineImage: formData.get('magazine[magazineImage]') as File | undefined,
  }

  try {
    const validatedFields = MagazineFormScheme.parse(validationData)
    console.log('バリデーション成功:', validatedFields)
  } catch (error) {
    console.error('バリデーション失敗:', error)
    throw error
  }

  const config = await setHeaderConfig()
  return client.put(`/magazines/${id}`, formData, config)
}

export const deleteMagazine = async (
  id: string,
): Promise<{ message: string; success: boolean }> => {
  const config = await setHeaderConfig()
  try {
    const response = await client.delete(`/magazines/${id}`, config)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      return {
        message: error.response.data.message || '削除に失敗しました',
        success: false,
      }
    }
    return {
      message: '削除に失敗しました',
      success: false,
    }
  }
}

export const createMagazine = async (formData: FormData) => {
  const config = await setHeaderConfig()
  return client.post('/magazines', formData, config)
}
