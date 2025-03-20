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

type FormUserValues = {
  name: string
  email: string
  admin: boolean
}

type FormPublisherValues = {
  name: string
  description: string
  publisherImage?: File | null
}

type FormMagazineValues = {
  name: string
  description: string
  magazineImage?: File | null
  publisherId: number
}

type FormAuthorValues = {
  name: string
  description: string
}

type FormComicValues = {
  title: string
  description: string
  comicImage?: File | null
  authorId: number
  magazineId: number
}

type FormQuizValues = {
  question: string
  answer: string
  description: string
  quizImage?: File | null
  comicId: number
}

export type {
  FormAuthorValues,
  FormComicValues,
  FormMagazineValues,
  FormPublisherValues,
  FormQuizValues,
  FormSigninValues,
  FormSignupValues,
  FormUserValues,
}
