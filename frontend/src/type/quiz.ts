type User = {
  id: number
  name: string
  email: string
  admin: boolean
  createdAt: Date
  updatedAt: Date
}

type Publisher = {
  id: number
  name: string
  description: string
  publisherImageUrl: string
  createdAt: Date
  updatedAt: Date
  user: User
}

type Magazine = {
  id: number
  name: string
  description: string
  magazineImageUrl: string
  createdAt: Date
  updatedAt: Date
  user: User
  publisher: Publisher
}

type Author = {
  id: number
  name: string
  description: string
  createdAt: Date
  updatedAt: Date
}

type Comic = {
  id: number
  title: string
  description: string
  comicImageUrl: string
  createdAt: Date
  updatedAt: Date
  user: User
  magazine: Magazine
  author: Author
}

type Quiz = {
  id: number
  question: string
  answer: string
  description: string
  quizImageUrl: string
  createdAt: Date
  updatedAt: Date
  user: User
  comic: Comic
}

type MyQuizList = {
  id: number
  title: string
  description: string
  isPublic: boolean
  createdAt: Date
  updatedAt: Date
  user: User
  quizzes: Quiz[]
}

export type { Author, Comic, Magazine, Publisher, Quiz, MyQuizList, User }
