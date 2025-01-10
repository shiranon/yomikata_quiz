'use server'

import { updatePublisher } from 'libs/api/api-publishers'
import { PublisherFormScheme } from 'libs/definitions'
import { FormAdminPublisherState } from 'type/form'

export async function handleUpdateAdminPublisher(
  prevState: FormAdminPublisherState,
  formData: FormData,
): Promise<FormAdminPublisherState> {
  try {
    console.log(formData)
    const validatedFields = PublisherFormScheme.safeParse(
      Object.fromEntries(formData),
    )
    if (!validatedFields.success) {
      return {
        ...prevState,
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'バリデーションエラーが発生しました',
      }
    }
    await updatePublisher(formData)
    return {
      ...prevState,
      errors: {},
      message: '更新が完了しました',
    }
  } catch (error) {
    console.error('更新エラー:', error)
    return prevState
  }
}
