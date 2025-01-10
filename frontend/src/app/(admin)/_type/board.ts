export type Colum = {
  field: string
  headerName: string
  width?: number
  type?: string
  path?: string
}

export type User = {
  id: number
  name: string
  email: string
  admin: boolean
  createdAt: Date
  updatedAt: Date
}

export type Publisher = {
  id: number
  name: string
  description: string
  publisherImageUrl: string
  createdAt: Date
  updatedAt: Date
}
