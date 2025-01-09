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

export type {
  FormSignupState,
  FormSignupValues,
  FormSigninState,
  FormSigninValues,
}

