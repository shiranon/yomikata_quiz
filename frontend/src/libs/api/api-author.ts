'use server'
import { headers } from 'next/headers'
import client from './api-client'

import axios from 'axios'
import { setHeaderConfig } from 'libs/auth'
import { AuthorFormScheme } from 'libs/definitions'

export const getAuthors = async () => {
  const config = await setHeaderConfig()
  return client.get('/authors', config)
}

export const getAuthor = async (id: string) => {
  const config = await setHeaderConfig()
  return client.get(`/authors/${id}`, config)
}

export const updateAuthor = async (formData: FormData) => {
  const requestUrl = (await headers()).get('x-url')
  const id = requestUrl?.split('/').pop()

  // バリデーション用のオブジェクトを作成
  const validationData = {
    name: formData.get('author[name]')?.toString() ?? '',
    description: formData.get('author[description]')?.toString() ?? '',
  }

  // バリデーション実行
  try {
    const validatedFields = AuthorFormScheme.parse(validationData)
    console.log('バリデーション成功:', validatedFields)
  } catch (error) {
    console.error('バリデーション失敗:', error)
    throw error
  }

  const config = await setHeaderConfig()
  return client.put(`/authors/${id}`, formData, config)
}

export const deleteAuthor = async (
  id: string,
): Promise<{ message: string; success: boolean }> => {
  try {
    const config = await setHeaderConfig()
    const response = await client.delete(`/authors/${id}`, config)
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

export const createAuthor = async (formData: FormData) => {
  const config = await setHeaderConfig()
  return client.post('/authors', formData, config)
}
