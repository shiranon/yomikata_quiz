import { AxiosRequestConfig } from 'axios'
import client from './api-client'

export const getUsers = async () => {
  const config: AxiosRequestConfig = {
    headers: {
      'Cache-Control': 'no-cache',
    },
  }
  return client.get('/users', config)
}
