type FormSignupValues = {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

type FormSigninValues = {
  email: string
  password: string
}

type FormAdminUserValues = {
  name: string
  email: string
  admin: boolean
}

type FormAdminPublisherValues = {
  name: string
  description: string
  publisherImage?: File | null
}

type FormAdminMagazineValues = {
  name: string
  description: string
  magazineImage?: File | null
  publisherId: number
}

type FormAdminAuthorValues = {
  name: string
  description: string
}

type FormAdminComicValues = {
  title: string
  description: string
  comicImage?: File | null
  authorId: number
  magazineId: number
}

type FormAdminQuizValues = {
  question: string
  answer: string
  description: string
  quizImage?: File | null
  comicId: number
}

export type {
  FormAdminAuthorValues,
  FormAdminComicValues,
  FormAdminMagazineValues,
  FormAdminPublisherValues,
  FormAdminQuizValues,
  FormAdminUserValues,
  FormSigninValues,
  FormSignupValues,
}
