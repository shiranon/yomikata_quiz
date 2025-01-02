import { SigninFormScheme, SignupFormScheme } from 'libs/definitions'
import { deleteSession, getSession } from 'libs/session'
import client from './client'

export const signUp = async (formData: FormData) => {
  const validatedFields = SignupFormScheme.parse(Object.fromEntries(formData))

  const signUpParams = {
    registration: {
      name: validatedFields.name,
      email: validatedFields.email,
      password: validatedFields.password,
      password_confirmation: validatedFields.passwordConfirmation,
    },
  }

  return client.post('auth', signUpParams)
}

export const signIn = (formData: FormData) => {
  const validatedFields = SigninFormScheme.parse(Object.fromEntries(formData))

  const signInParams = {
    email: validatedFields.email,
    password: validatedFields.password,
  }
  return client.post('auth/sign_in', signInParams)
}

export const signOut = async () => {
  const session = await getSession()
  if (!session.accessToken || !session.client || !session.uid) return
  await deleteSession()
  return client.delete('auth/sign_out', {
    headers: {
      'access-token': session.accessToken,
      client: session.client,
      uid: session.uid,
    },
  })
}

export const getCurrentUser = async () => {
  const session = await getSession()
  if (!session.accessToken || !session.client || !session.uid) return
  return client.get('/auth/sessions', {
    headers: {
      'access-token': session.accessToken,
      client: session.client,
      uid: session.uid,
    },
  })
}
