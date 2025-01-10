import { cache } from 'react'
import { getCurrentUser } from './api/api-auth'

import { AuthInfo } from 'type/auth'
import { AxiosRequestConfig } from 'axios'
import { getSession } from './session'

export const setHeaderConfig = async () => {
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

const formatAuthInfo = (responseData: AuthInfo): AuthInfo => {
  return {
    isLogin: responseData.isLogin,
    data: {
      id: responseData.data.id,
      name: responseData.data.name,
      email: responseData.data.email,
      admin: responseData.data.admin,
    },
  }
}

const validateAuth = async () => {
  const response = await getCurrentUser()
  if (!response || !response.data.isLogin) return null
  return formatAuthInfo(response.data)
}

export const cachedValidateAuth = cache(validateAuth)
