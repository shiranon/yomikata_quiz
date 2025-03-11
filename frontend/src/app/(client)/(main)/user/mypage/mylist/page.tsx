'use client'

import { Button } from 'components/ui/button'
import { getUserMylists } from 'libs/api/api-mylist'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Mylist {
  id: number
  title: string
  description: string
  is_public: boolean
  created_at: string
  updated_at: string
  quiz_count: number
}

export default function MylistsPage() {
  const [mylists, setMylists] = useState<Mylist[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMylists = async () => {
      try {
        const response = await getUserMylists()
        setMylists(response.data)
        setLoading(false)
      } catch (err) {
        console.error('マイリストの取得に失敗しました:', err)
        setError('マイリストの取得に失敗しました')
        setLoading(false)
      }
    }

    fetchMylists()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">マイリスト</h1>
        <Link href="/user/mypage/mylist/create">
          <Button>新しいマイリストを作成</Button>
        </Link>
      </div>

      {mylists.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 mb-4">マイリストがまだありません</p>
          <Link href="/user/mypage/mylist/create">
            <Button>最初のマイリストを作成する</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mylists.map((mylist) => (
            <Link
              href={`/user/mypage/mylist/${mylist.id}`}
              key={mylist.id}
              className="block"
            >
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                <h2 className="text-xl font-semibold mb-2">{mylist.title}</h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {mylist.description}
                </p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>クイズ: {mylist.quiz_count}問</span>
                  <span>{mylist.is_public ? '公開' : '非公開'}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
