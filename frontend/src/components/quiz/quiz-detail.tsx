'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from 'components/ui/button'
import { ImageHeightFix } from 'components/ui/image-size-fix'
import { Input } from 'components/ui/input'
import { toHalfWidth } from 'libs/utils'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Quiz } from 'type/quiz'
import { z } from 'zod'
import { AnswerContainer } from './answer-container'

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
  const fixedHeight = 250

  return (
    <div className="container mx-auto max-w-3xl">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4">
          {quiz.quizImageUrl ? (
            <ImageHeightFix
              imageUrl={`${process.env.NEXT_PUBLIC_BACKEND_URL}${quiz.quizImageUrl}`}
              fixedHeight={fixedHeight}
            />
          ) : null}
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
            <AnswerContainer
              isCorrect={isCorrect}
              quiz={quiz}
              userAnswer={userAnswer}
            />
          )}
          <div className="m-6 text-right">
            <p className="text-sm text-gray-600">
              漫画: {quiz.comic.title} / 作者: {quiz.comic.author.name}
            </p>
            <p className="text-xs pt-2 text-gray-600">
              ©{quiz.comic.magazine.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
