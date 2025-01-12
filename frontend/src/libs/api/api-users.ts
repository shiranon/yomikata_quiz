'use server'

import { setHeaderConfig } from 'libs/auth'
import { UserFormScheme } from 'libs/definitions'
import { headers } from 'next/headers'
import client from './api-client'

export const getUsers = async () => {
  const config = await setHeaderConfig()
  return client.get('/users', config)
}

export const getUser = async (id: string) => {
  const config = await setHeaderConfig()
  return client.get(`/users/${id}`, config)
}

export const updateUser = async (formData: FormData) => {
  const requestUrl = (await headers()).get('x-url')
  const id = requestUrl?.split('/').pop()

  const validationData = {
    name: formData.get('name')?.toString() ?? '',
    email: formData.get('email')?.toString() ?? '',
    admin: formData.get('admin')?.toString() ?? '',
  }

  try {
    const validatedFields = UserFormScheme.parse(validationData)
    console.log('Validation passed:', validatedFields)
  } catch (error) {
    console.error('Validation failed:', error)
    throw error
  }

  const config = await setHeaderConfig()
  return client.patch(
    `/users/${id}`,
    { user: Object.fromEntries(formData) },
    config,
  )
}

export const deleteUser = async (
  id: number,
): Promise<{ message: string; success: boolean }> => {
  try {
    const config = await setHeaderConfig()
    const response = await client.delete(`/users/${id}`, config)
    return response.data
  } catch (error) {
    console.error('Delete user error:', error)
    throw new Error('Failed to delete user')
  }
}
