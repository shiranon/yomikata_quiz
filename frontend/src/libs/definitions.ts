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
  admin: z.preprocess((val) => val === 'true', z.boolean().default(false)),
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

export const PublisherFormScheme = z.object({
  name: z.string().min(2, { message: '名前が短すぎます' }).trim(),
  description: z.string().min(2, { message: '説明が短すぎます' }).trim(),
  publisher_image: z.union([
    z
      .instanceof(File, { message: '画像ファイルを選択してください' })
      .refine((file) => file.size <= 5000000, {
        message: 'ファイルサイズは5MB以下にしてください',
      })
      .refine(
        (file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
        { message: 'jpeg, png, webp形式の画像を選択してください' },
      ),
    z.undefined(),
    z.null(),
  ]),
})

export type PublisherFormState =
  | {
      errors?: {
        name?: string[]
        description?: string[]
        publisher_image?: string[]
      }
      message?: string
    }
  | undefined
