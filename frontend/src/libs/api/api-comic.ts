'use server'
import { headers } from 'next/headers'
import client from './api-client'

import axios from 'axios'
import { setHeaderConfig } from 'libs/auth'
import { ComicFormScheme } from 'libs/definitions'

export const getComics = async () => {
  const config = await setHeaderConfig()
  return client.get('/comics', config)
}

export const getComic = async (id: string) => {
  const config = await setHeaderConfig()
  return client.get(`/comics/${id}`, config)
}

export const updateComic = async (formData: FormData) => {
  const requestUrl = (await headers()).get('x-url')
  const id = requestUrl?.split('/').pop()

  // バリデーション用のオブジェクトを作成
  const validationData = {
    title: formData.get('comic[title]')?.toString() ?? '',
    description: formData.get('comic[description]')?.toString() ?? '',
    authorId: Number(formData.get('comic[authorId]')) ?? 0,
    magazineId: Number(formData.get('comic[magazineId]')) ?? 0,
    comicImage: formData.get('comic[comicImage]') as File | undefined,
  }

  // バリデーション実行
  try {
    const validatedFields = ComicFormScheme.parse(validationData)
    console.log('バリデーション成功:', validatedFields)
  } catch (error) {
    console.error('バリデーション失敗:', error)
    throw error
  }

  const config = await setHeaderConfig()
  return client.put(`/comics/${id}`, formData, config)
}

export const deleteComic = async (
  id: string,
): Promise<{ message: string; success: boolean }> => {
  try {
    const config = await setHeaderConfig()
    const response = await client.delete(`/comics/${id}`, config)
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

export const createComic = async (formData: FormData) => {
  const config = await setHeaderConfig()
  return client.post('/comics', formData, config)
}
