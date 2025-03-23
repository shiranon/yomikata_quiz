'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from 'components/ui/button'
import { ImageUploader } from 'components/ui/image-upload'
import { Input } from 'components/ui/input'
import { handleCreateQuiz } from 'libs/action/action-quiz'
import { cachedValidateAuth } from 'libs/auth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

// バリデーションスキーマ
const QuizFormSchema = z
  .object({
    title: z.string().min(1, '必須項目です'),
    description: z.string().min(1, '必須項目です'),
    filterType: z.enum(['publisher', 'magazine', 'author']),
    publisherId: z.string().optional(),
    magazineId: z.string().optional(),
    authorId: z.string().optional(),
    comicId: z.string().min(1, '漫画を選択してください'),
    quizzes: z
      .array(
        z.object({
          question: z.string().min(1, '必須項目です'),
          answer: z.string().min(1, '必須項目です'),
          description: z.string().min(1, '必須項目です'),
          quizImage: z.any().optional(),
        }),
      )
      .min(3, '最低3つのクイズが必要です'),
  })
  .refine(
    (data) => {
      // 選択されたフィルタータイプに応じて、対応するIDが選択されているか確認
      if (data.filterType === 'publisher') {
        return !!data.publisherId
      } else if (data.filterType === 'magazine') {
        return !!data.magazineId
      } else if (data.filterType === 'author') {
        return !!data.authorId
      }
      return false
    },
    {
      message: '選択したフィルタータイプに対応する項目を選択してください',
      path: ['filterType'],
    },
  )

type QuizFormValues = z.infer<typeof QuizFormSchema>

type Comic = {
  id: number
  title: string
  author: {
    id: number
    name: string
  }
  magazine: {
    id: number
    name: string
    publisher: {
      id: number
      name: string
    }
  }
}

type Publisher = {
  id: number
  name: string
}

type Magazine = {
  id: number
  name: string
  publisher: {
    id: number
    name: string
  }
}

type Author = {
  id: number
  name: string
}

interface CreateQuizDetailProps {
  comics: Comic[]
  publishers: Publisher[]
  magazines: Magazine[]
  authors: Author[]
}

export default function CreateQuizDetail({
  comics,
  publishers,
  magazines,
  authors,
}: CreateQuizDetailProps) {
  const [quizCount, setQuizCount] = useState(3)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{
    text: string
    type: 'success' | 'error'
  } | null>(null)
  const router = useRouter()

  // フィルタリング用の状態
  const [filteredComics, setFilteredComics] = useState<Comic[]>([])

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<QuizFormValues>({
    resolver: zodResolver(QuizFormSchema),
    defaultValues: {
      filterType: 'publisher',
      quizzes: Array(3).fill({
        question: '',
        answer: '',
        description: '',
      }),
    },
  })

  // 選択された値を監視
  const watchFilterType = watch('filterType')
  const watchPublisherId = watch('publisherId')
  const watchMagazineId = watch('magazineId')
  const watchAuthorId = watch('authorId')

  // フィルタータイプが変更されたら、他のフィルターをリセット
  useEffect(() => {
    setValue('publisherId', '')
    setValue('magazineId', '')
    setValue('authorId', '')
    setValue('comicId', '')
    setFilteredComics([])
  }, [watchFilterType, setValue])

  // 選択されたフィルターに基づいて漫画をフィルタリング
  useEffect(() => {
    let filtered: Comic[] = []

    if (watchFilterType === 'publisher' && watchPublisherId) {
      // 出版社に属する雑誌のIDを取得
      const magazineIdsForPublisher = magazines
        .filter(
          (magazine) => magazine.publisher?.id?.toString() === watchPublisherId,
        )
        .map((magazine) => magazine.id.toString())

      // 該当する雑誌に属するコミックをフィルタリング
      filtered = comics.filter(
        (comic) =>
          comic.magazine &&
          magazineIdsForPublisher.includes(comic.magazine.id.toString()),
      )
    } else if (watchFilterType === 'magazine' && watchMagazineId) {
      filtered = comics.filter(
        (comic) => comic.magazine?.id?.toString() === watchMagazineId,
      )
    } else if (watchFilterType === 'author' && watchAuthorId) {
      filtered = comics.filter(
        (comic) => comic.author?.id?.toString() === watchAuthorId,
      )
    }

    setFilteredComics(filtered)
    // 漫画の選択をリセット
    setValue('comicId', '')
  }, [
    watchFilterType,
    watchPublisherId,
    watchMagazineId,
    watchAuthorId,
    comics,
    setValue,
    magazines,
  ])

  const onSubmit = async (data: QuizFormValues) => {
    setIsSubmitting(true)
    setMessage(null)

    try {
      console.log('送信データ:', data)

      // ユーザー情報を取得
      const user = await cachedValidateAuth()
      if (!user) {
        setMessage({
          text: 'ログインが必要です',
          type: 'error',
        })
        return
      }

      console.log('ユーザー情報:', user)

      // すべてのクイズに同じcomicIdを設定
      const quizzesWithComicId = data.quizzes.map((quiz) => ({
        ...quiz,
        comicId: data.comicId,
      }))

      const result = await handleCreateQuiz({
        title: data.title,
        description: data.description,
        userId: user.data.id,
        quizzes: quizzesWithComicId,
      })

      console.log('クイズ作成結果:', result)

      if (result.success) {
        setMessage({
          text: result.message,
          type: 'success',
        })
        // 成功したら3秒後にクイズ一覧ページに遷移
        setTimeout(() => {
          router.push('/quiz')
        }, 3000)
      } else {
        setMessage({
          text: result.message,
          type: 'error',
        })
      }
    } catch (error) {
      console.error('クイズ作成エラー:', error)
      setMessage({
        text: '予期せぬエラーが発生しました',
        type: 'error',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const addQuiz = () => {
    setQuizCount((prev) => prev + 1)
    setValue('quizzes', [
      ...Array(quizCount + 1).fill({
        question: '',
        answer: '',
        description: '',
      }),
    ])
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">クイズを作成</h1>

      {message && (
        <div
          className={`p-4 mb-6 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* マイリスト情報 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">マイリスト情報</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                タイトル
              </label>
              <Input id="title" {...register('title')} className="w-full" />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium mb-1"
              >
                説明
              </label>
              <textarea
                id="description"
                {...register('description')}
                className="w-full h-24 border-2 border-primary rounded-md p-2"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 漫画選択 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">漫画選択</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                フィルタータイプ
              </label>
              <div className="flex space-x-4 mb-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="publisher"
                    {...register('filterType')}
                    className="mr-2"
                  />
                  出版社
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="magazine"
                    {...register('filterType')}
                    className="mr-2"
                  />
                  雑誌
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="author"
                    {...register('filterType')}
                    className="mr-2"
                  />
                  作者
                </label>
              </div>
              {errors.filterType && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.filterType.message}
                </p>
              )}
            </div>

            {watchFilterType === 'publisher' && (
              <div>
                <label className="block text-sm font-medium mb-1">出版社</label>
                <select
                  {...register('publisherId')}
                  className="w-full border-2 border-primary rounded-md p-2 outline-none"
                >
                  <option value="">選択してください</option>
                  {publishers.map((publisher) => (
                    <option key={publisher.id} value={publisher.id}>
                      {publisher.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {watchFilterType === 'magazine' && (
              <div>
                <label className="block text-sm font-medium mb-1">雑誌</label>
                <select
                  {...register('magazineId')}
                  className="w-full border-2 border-primary rounded-md p-2 outline-none"
                >
                  <option value="">選択してください</option>
                  {magazines.map((magazine) => (
                    <option key={magazine.id} value={magazine.id}>
                      {magazine.name} ({magazine.publisher.name})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {watchFilterType === 'author' && (
              <div>
                <label className="block text-sm font-medium mb-1">作者</label>
                <select
                  {...register('authorId')}
                  className="w-full border-2 border-primary rounded-md p-2 outline-none"
                >
                  <option value="">選択してください</option>
                  {authors.map((author) => (
                    <option key={author.id} value={author.id}>
                      {author.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">漫画</label>
              <select
                {...register('comicId')}
                className="w-full border-2 border-primary rounded-md p-2 outline-none"
                disabled={filteredComics.length === 0}
              >
                <option value="">選択してください</option>
                {filteredComics.map((comic) => (
                  <option key={comic.id} value={comic.id}>
                    {comic.title} ({comic.author.name})
                  </option>
                ))}
              </select>
              {errors.comicId && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.comicId.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* クイズ一覧 */}
        <div className="space-y-4">
          {Array(quizCount)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">
                  クイズ {index + 1}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      画像
                    </label>
                    <ImageUploader
                      previewSize="lg"
                      onChange={(file) =>
                        setValue(`quizzes.${index}.quizImage`, file)
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      問題
                    </label>
                    <Input
                      {...register(`quizzes.${index}.question`)}
                      className="w-full"
                    />
                    {errors.quizzes?.[index]?.question && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.quizzes[index]?.question?.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      答え
                    </label>
                    <Input
                      {...register(`quizzes.${index}.answer`)}
                      className="w-full"
                    />
                    {errors.quizzes?.[index]?.answer && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.quizzes[index]?.answer?.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      解説
                    </label>
                    <textarea
                      {...register(`quizzes.${index}.description`)}
                      className="w-full h-24 border-2 border-primary rounded-md p-2"
                    />
                    {errors.quizzes?.[index]?.description && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.quizzes[index]?.description?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="flex justify-center space-x-4">
          <Button type="button" variant="outline" onClick={addQuiz}>
            クイズを追加
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? '作成中...' : '作成する'}
          </Button>
        </div>
      </form>
    </div>
  )
}
