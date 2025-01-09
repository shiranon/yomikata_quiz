type FormUserValues = {
  name?: string
  email?: string
  admin?: boolean
}

type FormUserState = {
  errors: {
    [key: string]: string[]
  } | null
  message: string | null
  values: FormUserValues
}

export type { FormUserState, FormUserValues }
