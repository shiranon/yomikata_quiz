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
  const validatedFields = PublisherFormScheme.parse(
    Object.fromEntries(formData),
  )
  const config = await setHeaderConfig()
  return client.patch(
    `/publishers/${id}`,
    { publisher: validatedFields },
    config,
  )
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
