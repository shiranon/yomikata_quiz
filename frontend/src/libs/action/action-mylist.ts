'use server'

import { z } from 'zod'
import {
  addQuizToMylist,
  createMylist,
  deleteMylist,
  removeQuizFromMylist,
  updateMylist,
} from 'libs/api/api-mylist'
import axios from 'axios'

// マイリストフォームのバリデーションスキーマ
const MylistFormSchema = z.object({
  title: z.string().min(2, { message: 'タイトルが短すぎます' }).trim(),
  description: z.string().min(2, { message: '説明が短すぎます' }).trim(),
  is_public: z.boolean().default(false),
})

type FormValues = z.infer<typeof MylistFormSchema>

type ActionResponse = {
  success: boolean
  message: string
  data?: unknown
}

// マイリストを作成
export async function handleCreateMylist(
  data: FormValues
): Promise<ActionResponse> {
  try {
    const validatedFields = MylistFormSchema.parse(data)
    
    const response = await createMylist({
      title: validatedFields.title,
      description: validatedFields.description,
      is_public: validatedFields.is_public,
    })
    
    return {
      success: true,
      message: 'マイリストを作成しました',
      data: response.data,
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 422) {
      return {
        success: false,
        message: 'APIエラーが発生しました',
      }
    }
    console.error('マイリスト作成エラー:', error)
    return {
      success: false,
      message:
        error instanceof z.ZodError
          ? `${error.errors.map((e) => e.message).join(', ')}`
          : '作成中にエラーが発生しました',
    }
  }
}

// マイリストを更新
export async function handleUpdateMylist(
  id: string,
  data: FormValues
): Promise<ActionResponse> {
  try {
    const validatedFields = MylistFormSchema.parse(data)
    
    const response = await updateMylist(id, {
      title: validatedFields.title,
      description: validatedFields.description,
      is_public: validatedFields.is_public,
    })
    
    return {
      success: true,
      message: 'マイリストを更新しました',
      data: response.data,
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 422) {
      return {
        success: false,
        message: 'APIエラーが発生しました',
      }
    }
    console.error('マイリスト更新エラー:', error)
    return {
      success: false,
      message:
        error instanceof z.ZodError
          ? `${error.errors.map((e) => e.message).join(', ')}`
          : '更新中にエラーが発生しました',
    }
  }
}

// マイリストを削除
export async function handleDeleteMylist(
  id: string
): Promise<ActionResponse> {
  try {
    await deleteMylist(id)
    
    return {
      success: true,
      message: 'マイリストを削除しました',
    }
  } catch (error) {
    console.error('マイリスト削除エラー:', error)
    return {
      success: false,
      message: 'マイリストの削除中にエラーが発生しました',
    }
  }
}

// クイズをマイリストに追加
export async function handleAddQuizToMylist(
  mylistId: string,
  quizId: string
): Promise<ActionResponse> {
  try {
    const response = await addQuizToMylist(mylistId, quizId)
    
    return {
      success: true,
      message: 'クイズをマイリストに追加しました',
      data: response.data,
    }
  } catch (error) {
    console.error('クイズ追加エラー:', error)
    return {
      success: false,
      message: 'クイズの追加中にエラーが発生しました',
    }
  }
}

// クイズをマイリストから削除
export async function handleRemoveQuizFromMylist(
  mylistId: string,
  quizId: string
): Promise<ActionResponse> {
  try {
    await removeQuizFromMylist(mylistId, quizId)
    
    return {
      success: true,
      message: 'クイズをマイリストから削除しました',
    }
  } catch (error) {
    console.error('クイズ削除エラー:', error)
    return {
      success: false,
      message: 'クイズの削除中にエラーが発生しました',
    }
  }
}