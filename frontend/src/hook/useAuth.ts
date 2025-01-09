'use client'

import { getCurrentUser } from 'libs/api/auth'
import { useEffect, useState } from 'react'

export function useAuth() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getCurrentUser()
        setUser(response.data)
      } catch (error) {
        setUser(null)
        window.location.href = '/login'
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [])

  return { user, isLoading }
}
