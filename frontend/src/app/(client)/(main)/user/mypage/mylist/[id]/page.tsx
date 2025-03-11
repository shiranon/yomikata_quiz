'use client'

import { Button } from 'components/ui/button'
import { handleDeleteMylist, handleRemoveQuizFromMylist } from 'libs/action/action-mylist'
import { getMylist } from 'libs/api/api-mylist'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Quiz {
  id: number
  question: string
  answer: string
  description: string
  quizImageUrl: string
  comic: {
    id: number
    title: string
    author: {
      id: number
      name: string
    }
  }
}

interface Mylist {
  id: number
  title: string
  description: string
  is_public: boolean
  created_at: string
  updated_at: string
  quizzes: Quiz[]
}

export default function MylistDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const [mylist, setMylist] = useState<Mylist | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleteLoading, setDeleteLoading] = useState(false)
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

  const handleDelete = async () => {
    if (!mylist) return

    if (!confirm('このマイリストを削除してもよろしいですか？')) {
      return
    }

    setDeleteLoading(true)
    try {
      const result = await handleDeleteMylist(mylist.id.toString())
      if (result.success) {
        router.push('/user/mypage/mylist')
        router.refresh()
      } else {
        setError(result.message)
        setDeleteLoading(false)
      }
    } catch (err) {
      console.error('マイリスト削除エラー:', err)
      setError('マイリストの削除中にエラーが発生しました')
      setDeleteLoading(false)
    }
  }

  const handleRemoveQuiz = async (quizId: number) => {
    if (!mylist) return

    if (!confirm('このクイズをマイリストから削除してもよろしいですか？')) {
      return
    }

    try {
      const result = await handleRemoveQuizFromMylist(
        mylist.id.toString(),
        quizId.toString()
      )
      
      if (result.success) {
        // クイズを削除した後、マイリストを再取得
        const response = await getMylist(params.id)
        setMylist(response.data)
      } else {
        setError(result.message)
      }
    } catch (err) {
      console.error('クイズ削除エラー:', err)
      setError('クイズの削除中にエラーが発生しました')
    }
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
        <Link href="/user/mypage/mylist" className="text-primary hover:underline">
          ← マイリスト一覧に戻る
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-2xl font-bold">{mylist.title}</h1>
            <div className="flex space-x-2">
              <Link href={`/user/mypage/mylist/${mylist.id}/edit`}>
                <Button variant="outline" size="sm">
                  編集
                </Button>
              </Link>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleDelete}
                disabled={deleteLoading}
                className="text-red-500 hover:bg-red-50"
              >
                {deleteLoading ? '削除中...' : '削除'}
              </Button>
            </div>
          </div>

          <p className="text-gray-600 mb-4">{mylist.description}</p>

          <div className="flex items-center text-sm text-gray-500 mb-6">
            <span className="mr-4">
              {mylist.is_public ? '公開' : '非公開'}
            </span>
            <span>
              クイズ数: {mylist.quizzes.length}問
            </span>
          </div>

          {mylist.quizzes.length === 0 ? (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <p className="text-gray-500 mb-4">このマイリストにはまだクイズがありません</p>
              <Link href="/quiz">
                <Button>クイズを探す</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">登録済みクイズ</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mylist.quizzes.map((quiz) => (
                  <div
                    key={quiz.id}
                    className="border border-gray-200 rounded-lg overflow-hidden flex"
                  >
                    <div className="relative h-24 w-24 flex-shrink-0">
                      {quiz.quizImageUrl ? (
                        <Image
                          src={quiz.quizImageUrl}
                          alt={quiz.question}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full bg-gray-100">
                          <span className="text-gray-400 text-xs">画像なし</span>
                        </div>
                      )}
                    </div>
                    <div className="p-3 flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="font-medium line-clamp-1">{quiz.question}</h3>
                        <p className="text-xs text-gray-600 line-clamp-1">
                          {quiz.comic.title} / {quiz.comic.author.name}
                        </p>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <Link href={`/quiz/${quiz.id}`}>
                          <Button size="sm" variant="outline">
                            挑戦する
                          </Button>
                        </Link>
                        <button
                          onClick={() => handleRemoveQuiz(quiz.id)}
                          className="text-red-500 text-xs hover:underline"
                        >
                          削除
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}