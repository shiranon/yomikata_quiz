import { z } from 'zod'

const SignupFormScheme = z
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

const SigninFormScheme = z.object({
  email: z
    .string()
    .min(1, { message: 'メールアドレスを入力してください' })
    .trim(),
  password: z
    .string()
    .min(1, { message: 'パスワードを入力してください' })
    .trim(),
})

const UserFormScheme = z.object({
  name: z.string().min(2, { message: '名前が短すぎます' }).trim(),
  email: z
    .string()
    .email({ message: 'メールアドレスの形式で入力してください' })
    .trim(),
  admin: z.preprocess((val) => val === 'true', z.boolean().default(false)),
})

const PublisherFormScheme = z.object({
  name: z.string().min(2, { message: '名前が短すぎます' }).trim(),
  description: z.string().min(2, { message: '説明が短すぎます' }).trim(),
  publisherImage: z.union([
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

const MagazineFormScheme = z.object({
  name: z.string().min(2, { message: '名前が短すぎます' }).trim(),
  description: z.string().min(2, { message: '説明が短すぎます' }).trim(),
  publisherId: z
    .number({
      required_error: '出版社を選択してください',
      invalid_type_error: '出版社を選択してください',
    })
    .min(1, '出版社を選択してください'),
  magazineImage: z.union([
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

const AuthorFormScheme = z.object({
  name: z.string().min(2, { message: '名前が短すぎます' }).trim(),
  description: z.string().min(2, { message: '説明が短すぎます' }).trim(),
})

const ComicFormScheme = z.object({
  title: z.string().min(2, { message: 'タイトルが短すぎます' }).trim(),
  description: z.string().min(2, { message: '説明が短すぎます' }).trim(),
  comicImage: z.union([
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
  authorId: z
    .number({
      required_error: '著者を選択してください',
      invalid_type_error: '著者を選択してください',
    })
    .min(1, '著者を選択してください'),
  magazineId: z
    .number({
      required_error: '雑誌を選択してください',
      invalid_type_error: '雑誌を選択してください',
    })
    .min(1, '雑誌を選択してください'),
})

const QuizFormScheme = z.object({
  question: z.string().min(2, { message: '問題文が短すぎます' }).trim(),
  answer: z.string().min(2, { message: '答えが短すぎます' }).trim(),
  description: z.string().min(2, { message: '説明が短すぎます' }).trim(),
  comicId: z
    .number({
      required_error: '漫画を選択してください',
      invalid_type_error: '漫画を選択してください',
    })
    .min(1, '漫画を選択してください'),
  quizImage: z.union([
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

export {
  AuthorFormScheme,
  ComicFormScheme,
  MagazineFormScheme,
  PublisherFormScheme,
  QuizFormScheme,
  SigninFormScheme,
  SignupFormScheme,
  UserFormScheme,
}
