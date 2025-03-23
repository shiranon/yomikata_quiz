'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'
import { toHalfWidth } from 'libs/utils'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Quiz } from 'type/quiz'
import { z } from 'zod'

interface QuizDetailProps {
  quiz: Quiz
  onAnswerSubmit?: (isCorrect: boolean, userAnswer: string) => void
  showAnswerImmediately?: boolean
  userAnswerProp?: string
  isCorrectProp?: boolean | null
}

const answerSchema = z.object({
  answer: z.string().min(1, '答えを入力してね！'),
})

type AnswerFormValues = z.infer<typeof answerSchema>

export function QuizDetail({
  quiz,
  onAnswerSubmit,
  showAnswerImmediately = false,
  userAnswerProp,
  isCorrectProp,
}: QuizDetailProps) {
  const [userAnswer, setUserAnswer] = useState(userAnswerProp || '')
  const [isCorrect, setIsCorrect] = useState<boolean | null>(
    isCorrectProp || null,
  )
  const [showAnswer, setShowAnswer] = useState(showAnswerImmediately)
  const [imageSize, setImageSize] = useState({ width: 256, height: 256 })

  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<AnswerFormValues>({
    resolver: zodResolver(answerSchema),
    defaultValues: {
      answer: userAnswerProp || '',
    },
  })

  const watchedAnswer = watch('answer')

  useEffect(() => {
    setUserAnswer(watchedAnswer || '')
  }, [watchedAnswer])

  // propsが変更された時の処理
  useEffect(() => {
    if (userAnswerProp !== undefined) {
      setUserAnswer(userAnswerProp)
    }
    if (isCorrectProp !== undefined) {
      setIsCorrect(isCorrectProp)
    }
    if (showAnswerImmediately) {
      setShowAnswer(true)
    }
  }, [userAnswerProp, isCorrectProp, showAnswerImmediately])

  // クイズが変わった時に入力をリセット（ただし、既存の回答がある場合は保持）
  useEffect(() => {
    // 既存の回答がない場合のみリセット
    if (!userAnswerProp) {
      setUserAnswer('')
      setIsCorrect(null)
      setShowAnswer(showAnswerImmediately)
    }
  }, [quiz.id, showAnswerImmediately, userAnswerProp])

  const onSubmit = (data: AnswerFormValues) => {
    const userAnswerHalfWidth = toHalfWidth(data.answer)
    const isAnswerCorrect = userAnswerHalfWidth.trim() === quiz.answer.trim()
    setIsCorrect(isAnswerCorrect)
    setShowAnswer(true)
    setValue('answer', '')

    // 親コンポーネントに結果を通知
    if (onAnswerSubmit) {
      onAnswerSubmit(isAnswerCorrect, data.answer)
    }
  }

  return (
    <div className="container mx-auto max-w-3xl">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl pl-10 font-bold mb-4">問題</h1>
          <div
            className="relative mb-6 mx-auto bg-gray-100 rounded-lg overflow-hidden"
            style={{
              height: `${imageSize.height}px`,
              width: `${imageSize.width}px`,
              maxWidth: '100%', // 親コンテナからはみ出さないように
              maxHeight: '400px', // 高さの上限を設定（必要に応じて調整）
            }}
          >
            {quiz.quizImageUrl ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${quiz.quizImageUrl}`}
                alt="クイズ画像"
                fill
                className="object-contain"
                onLoadingComplete={(target) => {
                  const aspectRatio = target.naturalWidth / target.naturalHeight
                  let newWidth = target.naturalWidth
                  let newHeight = target.naturalHeight

                  // サイズの上限を設定（必要に応じて調整）
                  const maxWidth = 600
                  const maxHeight = 400

                  if (newWidth > maxWidth) {
                    newWidth = maxWidth
                    newHeight = newWidth / aspectRatio
                  }

                  if (newHeight > maxHeight) {
                    newHeight = maxHeight
                    newWidth = newHeight * aspectRatio
                  }

                  setImageSize({ width: newWidth, height: newHeight })
                }}
              />
            ) : null}
          </div>
          <p className="text-4xl mb-6 text-center font-bold">{quiz.question}</p>
          {!showAnswer ? (
            <form
              onSubmit={handleFormSubmit(onSubmit)}
              className="space-y-4 w-[70%] mx-auto"
            >
              <div>
                <label
                  htmlFor="answer"
                  className="block text-lg font-medium mb-2"
                >
                  読み方を入力してください
                </label>
                <Input
                  {...register('answer')}
                  id="answer"
                  type="text"
                  autoComplete="off"
                  className="w-full h-10"
                  autoFocus={!showAnswerImmediately}
                />
                {errors.answer && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.answer.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full">
                回答する
              </Button>
            </form>
          ) : (
            <div className="space-y-6">
              <div
                className={`p-4 rounded-lg ${
                  isCorrect
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                <p className="font-bold text-lg">
                  {isCorrect ? '正解！' : '不正解...'}
                </p>
                <p className="mt-2">
                  正解: <span className="font-bold">{quiz.answer}</span>
                </p>
                {!isCorrect && (
                  <p className="mt-1">
                    あなたの回答:{' '}
                    <span className="font-medium">{userAnswer}</span>
                  </p>
                )}
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">解説</h3>
                <p>{quiz.description}</p>
              </div>
            </div>
          )}
          <div className="m-6">
            <p className="text-sm text-gray-600">
              漫画: {quiz.comic.title} / 作者: {quiz.comic.author.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
