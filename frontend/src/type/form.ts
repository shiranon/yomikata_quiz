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
  publisher_image?: File | null
}

export type {
  FormAdminPublisherValues,
  FormAdminUserValues,
  FormSigninValues,
  FormSignupValues,
}
