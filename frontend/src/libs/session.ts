'use server'

import { AxiosResponse } from 'axios'
import { cookies } from 'next/headers'

export const setSession = async (response: AxiosResponse) => {
  const cookieStore = await cookies()
  cookieStore.set('_access_token', response.headers['access-token'], {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
  })
  cookieStore.set('_client', response.headers.client, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
  })
  cookieStore.set('_uid', response.headers.uid, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
  })
}

export const deleteSession = async () => {
  const cookieStore = await cookies()
  cookieStore.delete('_access_token')
  cookieStore.delete('_client')
  cookieStore.delete('_uid')
}

export const getSession = async () => {
  const cookieStore = await cookies()
  return {
    accessToken: cookieStore.get('_access_token')?.value,
    client: cookieStore.get('_client')?.value,
    uid: cookieStore.get('_uid')?.value,
  }
}
