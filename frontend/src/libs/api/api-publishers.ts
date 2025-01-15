'use server'

import { setHeaderConfig } from 'libs/auth'
import { PublisherFormScheme } from 'libs/definitions'
import { headers } from 'next/headers'
import client from './api-client'

export const getPublishers = async () => {
  const config = await setHeaderConfig()
  return client.get('/publishers', config)
}

export const getPublisher = async (id: string) => {
  const config = await setHeaderConfig()
  return client.get(`/publishers/${id}`, config)
}

export const updatePublisher = async (formData: FormData) => {
  const requestUrl = (await headers()).get('x-url')
  const id = requestUrl?.split('/').pop()

  // バリデーション用のオブジェクトを作成
  const validationData = {
    name: formData.get('publisher[name]')?.toString() ?? '',
    description: formData.get('publisher[description]')?.toString() ?? '',
    publisherImage: formData.get('publisher[publisherImage]') as
      | File
      | undefined,
  }

  // バリデーション実行
  try {
    const validatedFields = PublisherFormScheme.parse(validationData)
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

  return client.patch(`/publishers/${id}`, formData, config)
}

export const deletePublisher = async (
  id: number,
): Promise<{ message: string; success: boolean }> => {
  const config = await setHeaderConfig()
  return client.delete(`/publishers/${id}`, config)
}

export const createPublisher = async (formData: FormData) => {
  const validatedFields = PublisherFormScheme.parse(
    Object.fromEntries(formData),
  )
  const config = await setHeaderConfig()
  return client.post('/publishers', { publisher: validatedFields }, config)
}
