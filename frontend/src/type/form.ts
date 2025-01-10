type FormSignupValues = {
  name?: string
  email?: string
  password?: string
  passwordConfirmation?: string
}

type FormSignupState = {
  errors: {
    [key: string]: string[]
  } | null
  message: string | null
  values: FormSignupValues
}

type FormSigninValues = {
  email?: string
  password?: string
}

type FormSigninState = {
  errors: {
    [key: string]: string[]
  } | null
  message: string | null
  values: FormSigninValues
}

type FormAdminUserValues = {
  name?: string
  email?: string
  admin?: boolean
}

type FormAdminUserState = {
  errors: {
    [key: string]: string[]
  } | null
  message: string | null
  values: FormAdminUserValues
}

type FormAdminPublisherValues = {
  name?: string
  description?: string
  image_url?: string
}

type FormAdminPublisherState = {
  errors: {
    [key: string]: string[]
  } | null
  message: string | null
  values: FormAdminPublisherValues
}

export type {
  FormSignupState,
  FormSignupValues,
  FormSigninState,
  FormSigninValues,
  FormAdminUserState,
  FormAdminUserValues,
  FormAdminPublisherState,
  FormAdminPublisherValues,
}

