import { z } from 'zod'

export const SignupFormScheme = z
  .object({
    name: z.string().min(2, { message: '名前が短すぎます' }).trim(),
    email: z
      .string()
      .email({ message: 'メールアドレスの形式で入力してください' })
      .trim(),
    password: z
      .string()
      .min(8, { message: 'パスワードは8文字以上必要です' })
      .regex(/[a-zA-Z]/, { message: 'アルファベットが1文字以上必要です' })
      .regex(/[0-9]/, { message: '数字が1文字以上必要です' })
      .trim(),
    passwordConfirmation: z.string().trim(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'パスワードが一致しません',
    path: ['passwordConfirmation'],
  })

export type SignupFormState =
  | {
      errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
        passwordConfirmation?: string[]
      }
      message?: string
    }
  | undefined

export const SigninFormScheme = z.object({
  email: z
    .string()
    .min(1, { message: 'メールアドレスを入力してください' })
    .trim(),
  password: z
    .string()
    .min(1, { message: 'パスワードを入力してください' })
    .trim(),
})

export type SigninFormState =
  | {
      errors?: {
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined

export const UserFormScheme = z.object({
  name: z.string().min(2, { message: '名前が短すぎます' }).trim(),
  email: z
    .string()
    .email({ message: 'メールアドレスの形式で入力してください' })
    .trim(),
  admin: z.preprocess((val) => val === 'on', z.boolean().default(false)),
})

export type UserFormState =
  | {
      errors?: {
        name?: string[]
        email?: string[]
        admin?: string[]
      }
      message?: string
    }
  | undefined
