'use client'

import { Publisher } from 'app/(admin)/_type/board'
import { Button } from 'components/ui/button'
import { ImageUploader } from 'components/ui/image-upload'
import { Input } from 'components/ui/input'
import { handleUpdateAdminPublisher } from 'libs/action/action-publisher'
import { deletePublisher } from 'libs/api/api-publishers'
import { useRouter } from 'next/navigation'
import { useActionState, useState } from 'react'
import { FormAdminPublisherState, FormAdminPublisherValues } from 'type/form'

export function PublisherForm({ publisherData }: { publisherData: Publisher }) {
  const initialState: FormAdminPublisherState = {
    errors: {},
    message: '',
    values: {
      name: publisherData.name,
      description: publisherData.description,
      image_url: publisherData.publisherImageUrl,
    },
  }

  const [state, dispatch] = useActionState(
    handleUpdateAdminPublisher,
    initialState,
  )

  const [formValue, setFormValue] = useState<FormAdminPublisherValues>({
    name: publisherData.name,
    description: publisherData.description,
    image_url: publisherData.publisherImageUrl,
  })

  const router = useRouter()
  const [error, setError] = useState<string>('')

  const handleDelete = async () => {
    if (!confirm('本当に削除してもよろしいですか？')) {
      return
    }

    try {
      const result = await deletePublisher(Number(publisherData.id))
      if (result.success) {
        router.push('/admin/publisher')
      } else {
        setError(result.message)
      }
    } catch (err) {
      console.error('削除エラー:', err)
      setError('削除に失敗しました')
    }
  }

  return (
    <div className="rounded-lg p-5 mx-auto">
      <h1 className="text-2xl font-bold">出版社編集</h1>
      <form
        className="flex flex-col font-semibold"
        action={dispatch}
        noValidate
      >
        <div className="w-full pt-5 flex items-center">
          <label className="text-right pr-2 text-xs" htmlFor="name">
            名前
          </label>
          <div className="flex flex-wrap">
            <Input
              className="w-64"
              type="text"
              name="name"
              id="name"
              value={formValue.name}
              onChange={(e) =>
                setFormValue({ ...formValue, name: e.target.value })
              }
            />
            {state.errors?.name && (
              <p className="text-red-400 text-xs pl-3">
                {state.errors.name[0]}
              </p>
            )}
          </div>
        </div>
        <div className="w-full pt-5 flex items-center">
          <label className="text-right pr-2 text-xs" htmlFor="description">
            説明
          </label>
          <div className="flex flex-wrap w-64">
            <textarea
              className="w-64 h-36 border-2 border-primary rounded-md p-2"
              name="description"
              id="description"
              value={formValue.description}
              onChange={(e) =>
                setFormValue({ ...formValue, description: e.target.value })
              }
            />
            {state.errors?.description && (
              <p className="text-red-400 text-xs pl-3">
                {state.errors.description[0]}
              </p>
            )}
          </div>
        </div>
        <div className="w-full py-5 flex items-center">
          <label className="text-right pr-2 text-xs" htmlFor="image_url">
            画像
          </label>
          <div className="flex flex-wrap w-64">
            <ImageUploader
              previewSize="lg"
              imageUrl={publisherData.publisherImageUrl}
            />
            {state.errors?.image_url && (
              <p className="text-red-400 text-xs pl-3">
                {state.errors.image_url[0]}
              </p>
            )}
          </div>
        </div>

        {state.message && (
          <p className="text-green-400 text-xs pl-3 pb-3">{state.message}</p>
        )}
        {error && <p className="text-red-400 text-xs pl-3 pb-3">{error}</p>}
        <div className="flex justify-center gap-5">
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
            onClick={handleDelete}
            type="button"
          >
            削除
          </Button>
        </div>
      </form>
    </div>
  )
}
