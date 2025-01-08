'use server'

import { AxiosRequestConfig } from 'axios'
import { UserFormScheme } from 'libs/definitions'
import { getSession } from 'libs/session'
import { headers } from 'next/headers'
import client from './api-client'

const setSession = async () => {
  const session = await getSession()
  const config: AxiosRequestConfig = {
    headers: {
      'access-token': session.accessToken,
      client: session.client,
      uid: session.uid,
      'Cache-Control': 'no-cache',
    },
  }
  return config
}

export const getUsers = async () => {
  const config = await setSession()
  return client.get('/users', config)
}

export const getUser = async (id: string) => {
  const config = await setSession()
  return client.get(`/users/${id}`, config)
}

export const updateUser = async (formData: FormData) => {
  const requestUrl = (await headers()).get('x-url')
  const id = requestUrl?.split('/').pop()
  const validatedFields = UserFormScheme.parse(Object.fromEntries(formData))
  const config = await setSession()
  return client.patch(`/users/${id}`, { user: validatedFields }, config)
}

export const deleteUser = async (
  id: number,
): Promise<{ message: string; success: boolean }> => {
  try {
    const config = await setSession()
    const response = await client.delete(`/users/${id}`, config)
    return response.data
  } catch (error) {
    console.error('Delete user error:', error)
    throw new Error('Failed to delete user')
  }
}
