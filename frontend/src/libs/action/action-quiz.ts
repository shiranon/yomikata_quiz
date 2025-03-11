'use server'

import { addQuizToMylist, createMylist } from '../api/api-mylist'
import { createQuiz } from '../api/api-quiz'

type CreateQuizFormData = {
  title: string
  description: string
  userId?: number
  quizzes: {
    question: string
    answer: string
    description: string
    comicId: string
    quizImage?: File
  }[]
}

type ActionResponse = {
  success: boolean
  message: string
}

export async function handleCreateQuiz(
  data: CreateQuizFormData,
): Promise<ActionResponse> {
  try {
    console.log('クイズ作成開始:', data)

    // マイリストを作成
    const mylistResponse = await createMylist({
      title: data.title,
      description: data.description,
      is_public: true,
      user_id: data.userId,
    })

    console.log('マイリスト作成結果:', mylistResponse)

    if (!mylistResponse.data) {
      return {
        success: false,
        message: 'マイリストの作成に失敗しました',
      }
    }

    const mylistId = mylistResponse.data.id

    // クイズを作成
    for (const quiz of data.quizzes) {
      const formData = new FormData()
      formData.append('quiz[question]', quiz.question)
      formData.append('quiz[answer]', quiz.answer)
      formData.append('quiz[description]', quiz.description)
      formData.append('quiz[comic_id]', quiz.comicId)

      // ユーザーIDが提供されている場合は追加
      if (data.userId) {
        formData.append('quiz[user_id]', data.userId.toString())
      }

      if (quiz.quizImage) {
        formData.append('quiz[quiz_image]', quiz.quizImage)
      }

      console.log('クイズ作成リクエスト:', {
        question: quiz.question,
        answer: quiz.answer,
        description: quiz.description,
        comicId: quiz.comicId,
        userId: data.userId,
      })

      const quizResponse = await createQuiz(formData)
      console.log('クイズ作成結果:', quizResponse)

      if (!quizResponse.data) {
        return {
          success: false,
          message: 'クイズの作成に失敗しました',
        }
      }

      // クイズをマイリストに追加
      console.log('マイリストにクイズを追加:', {
        mylistId: mylistId.toString(),
        quizId: quizResponse.data.id.toString(),
      })

      const addResult = await addQuizToMylist(
        mylistId.toString(),
        quizResponse.data.id.toString(),
      )
      console.log('マイリストにクイズを追加結果:', addResult)
    }

    return {
      success: true,
      message: 'クイズの作成が完了しました',
    }
  } catch (error) {
    console.error('クイズ作成エラー:', error)
    return {
      success: false,
      message: '予期せぬエラーが発生しました',
    }
  }
}
