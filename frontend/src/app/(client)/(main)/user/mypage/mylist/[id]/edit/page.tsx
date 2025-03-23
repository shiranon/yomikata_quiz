'use client'

import { MylistForm } from 'components/form/mylist-form'
import { getMylist } from 'libs/api/api-mylist'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Mylist {
  id: number
  title: string
  description: string
  is_public: boolean
}

export default function EditMylistPage({
  params,
}: {
  params: { id: string }
}) {
  const [mylist, setMylist] = useState<Mylist | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchMylist = async () => {
      try {
        const response = await getMylist(params.id)
        setMylist(response.data)
        setLoading(false)
      } catch (err) {
        console.error('マイリストの取得に失敗しました:', err)
        setError('マイリストの取得に失敗しました')
        setLoading(false)
      }
    }

    fetchMylist()
  }, [params.id])

  const handleSuccess = () => {
    router.push(`/user/mypage/mylist/${params.id}`)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error || !mylist) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">{error || 'マイリストが見つかりません'}</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <Link
          href={`/user/mypage/mylist/${params.id}`}
          className="text-primary hover:underline"
        >
          ← マイリスト詳細に戻る
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <MylistForm
          initialData={{
            id: params.id,
            title: mylist.title,
            description: mylist.description,
            is_public: mylist.is_public,
          }}
          onSuccess={handleSuccess}
        />
      </div>
    </div>
  )
}