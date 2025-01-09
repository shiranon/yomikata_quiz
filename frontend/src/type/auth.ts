type User = {
  id: number
  name: string
  email: string
  admin: boolean
}

type AuthInfo = {
  isLogin: boolean
  data: User
}

export type { AuthInfo, User }
