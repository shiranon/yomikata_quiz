import { cache } from 'react'
import { getCurrentUser } from './api/api-auth'

import { AuthInfo } from 'type/auth'

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
