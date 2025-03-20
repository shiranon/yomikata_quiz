'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Comic, Quiz } from 'app/(admin)/_type/board'
import { Button } from 'components/ui/button'
import { ImageUploader } from 'components/ui/image-upload'
import { Input } from 'components/ui/input'
import { handleUpdateQuiz } from 'libs/action/action-quiz'
import { deleteQuiz } from 'libs/api/api-quiz'
import { QuizFormScheme } from 'libs/definitions'
import { redirect, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FormQuizValues } from 'type/form'

export function QuizForm({
  quizData,
  comics,
}: {
  quizData: Quiz
  comics: Comic[]
}) {
  const [message, setMessage] = useState<string>('')
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormQuizValues>({
    resolver: zodResolver(QuizFormScheme),
    defaultValues: {
      question: quizData.question,
      answer: quizData.answer,
      comicId: quizData.comic.id,
      description: quizData.description,
    },
  })

  const router = useRouter()
  const [error, setError] = useState<string>('')

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!confirm('本当に削除してもよろしいですか？')) {
      return
    }

    try {
      const result = await deleteQuiz(quizData.id.toString())
      if (result.data && result.data.success) {
        router.push('/admin/quiz')
      } else {
        setError(result.data?.message || '削除に失敗しました')
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('削除に失敗しました')
      }
    }
  }

  const onSubmit = async (data: FormQuizValues) => {
    const result = await handleUpdateQuiz({
      ...data,
      id: quizData.id,
    })
    console.log(result)
    if (result.success) {
      redirect('/admin/quiz')
    } else {
      setMessage(result.message)
    }
  }

  return (
    <div className="rounded-lg p-5 mx-auto">
      <h1 className="text-2xl font-bold">クイズ編集</h1>
      <form
        className="flex flex-col font-semibold"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="w-full py-5 flex items-center">
          <label
            className="inline-block text-right text-xs w-12"
            htmlFor="magazineImage"
          >
            画像
          </label>
          <div className="flex flex-col justify-center items-center w-full">
            <ImageUploader
              previewSize="lg"
              imageUrl={quizData.quizImageUrl}
              onChange={(file) => setValue('quizImage', file)}
            />
            {errors?.quizImage && (
              <p className="text-red-400 text-xs pl-3">
                {errors.quizImage.message}
              </p>
            )}
          </div>
        </div>
        <div className="w-full pt-5 flex items-center">
          <label className="text-right pr-2 text-xs w-16" htmlFor="title">
            問題文
          </label>
          <div className="flex flex-col">
            <Input
              className="w-96"
              type="text"
              id="question"
              {...register('question')}
            />
            {errors?.question && (
              <p className="text-red-400 text-xs pl-3">
                {errors.question.message}
              </p>
            )}
          </div>
        </div>

        <div className="w-full pt-5 flex items-center">
          <label className="text-right pr-2 text-xs w-16" htmlFor="answer">
            回答文
          </label>
          <div className="flex flex-col">
            <Input
              className="w-96"
              type="text"
              id="answer"
              {...register('answer')}
            />
            {errors?.answer && (
              <p className="text-red-400 text-xs pl-3">
                {errors.answer.message}
              </p>
            )}
          </div>
        </div>
        <div className="w-full pt-5 flex items-center">
          <label className="text-right pr-2 text-xs w-16" htmlFor="comicId">
            漫画
          </label>
          <div className="flex flex-col">
            <select
              className="w-96 border-2 border-primary rounded-md p-2 outline-none"
              id="comicId"
              {...register('comicId', {
                valueAsNumber: true,
              })}
            >
              <option value={0}>選択してください</option>
              {comics.map((comic) => (
                <option key={comic.id} value={comic.id}>
                  {comic.title}
                </option>
              ))}
            </select>
            {errors?.comicId && (
              <p className="text-red-400 text-xs pl-3">
                {errors.comicId.message}
              </p>
            )}
          </div>
        </div>
        <div className="w-full pt-5 flex items-center">
          <label className="text-right pr-2 text-xs w-16" htmlFor="description">
            説明
          </label>
          <div className="flex flex-col">
            <textarea
              className="w-96 h-24 border-2 border-primary rounded-md p-2"
              id="description"
              {...register('description')}
            />
            {errors?.description && (
              <p className="text-red-400 text-xs pl-3">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>

        {message && (
          <p className="text-green-400 text-xs pl-3 pb-3">{message}</p>
        )}
        {error && <p className="text-red-400 text-xs pl-3 pb-3">{error}</p>}
        <div className="flex justify-center gap-5 mt-5">
          <Button
            className="w-1/3"
            size={'sm'}
            variant={'default'}
            type="submit"
          >
            更新
          </Button>
          <Button
            className="w-1/3"
            size={'sm'}
            variant={'outline'}
            onClick={(e) => handleDelete(e)}
            type="button"
          >
            削除
          </Button>
        </div>
      </form>
    </div>
  )
}
