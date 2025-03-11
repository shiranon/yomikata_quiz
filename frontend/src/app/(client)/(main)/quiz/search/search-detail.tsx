'use client'

import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type Publisher = {
  id: number
  name: string
}

type Author = {
  id: number
  name: string
}

type Magazine = {
  id: number
  name: string
  publisher: Publisher
}

type Comic = {
  id: number
  title: string
  author: Author
  magazine: Magazine
}

type Quiz = {
  id: number
  question: string
  answer: string
  description: string
  quizImageUrl: string | null
  comic: Comic
}

type SearchDetailProps = {
  publishers: Publisher[]
  authors: Author[]
  magazines: Magazine[]
  quizzes: Quiz[]
}

export default function SearchDetail({
  publishers,
  authors,
  magazines,
  quizzes,
}: SearchDetailProps) {
  const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[]>(quizzes)

  // フィルター状態
  const [selectedPublisher, setSelectedPublisher] = useState<number | null>(
    null,
  )
  const [selectedAuthor, setSelectedAuthor] = useState<number | null>(null)
  const [selectedMagazine, setSelectedMagazine] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  // フィルター適用
  useEffect(() => {
    let result = [...quizzes]

    // 出版社でフィルター
    if (selectedPublisher) {
      result = result.filter(
        (quiz) => quiz.comic.magazine.publisher.id === selectedPublisher,
      )
    }

    // 作者でフィルター
    if (selectedAuthor) {
      result = result.filter((quiz) => quiz.comic.author.id === selectedAuthor)
    }

    // 雑誌でフィルター
    if (selectedMagazine) {
      result = result.filter(
        (quiz) => quiz.comic.magazine.id === selectedMagazine,
      )
    }

    // 検索クエリでフィルター
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (quiz) =>
          quiz.question.toLowerCase().includes(query) ||
          quiz.comic.title.toLowerCase().includes(query) ||
          quiz.comic.author.name.toLowerCase().includes(query),
      )
    }

    setFilteredQuizzes(result)
  }, [
    selectedPublisher,
    selectedAuthor,
    selectedMagazine,
    searchQuery,
    quizzes,
  ])

  // フィルターリセット
  const resetFilters = () => {
    setSelectedPublisher(null)
    setSelectedAuthor(null)
    setSelectedMagazine(null)
    setSearchQuery('')
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">クイズを探す</h1>

      {/* 検索フィルター */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">検索条件</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              キーワード検索
            </label>
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="クイズ、漫画タイトル、作者名など"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">出版社</label>
            <select
              value={selectedPublisher || ''}
              onChange={(e) =>
                setSelectedPublisher(
                  e.target.value ? Number(e.target.value) : null,
                )
              }
              className="w-full border-2 border-primary rounded-md p-2 outline-none"
            >
              <option value="">すべての出版社</option>
              {publishers.map((publisher) => (
                <option key={publisher.id} value={publisher.id}>
                  {publisher.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">作者</label>
            <select
              value={selectedAuthor || ''}
              onChange={(e) =>
                setSelectedAuthor(
                  e.target.value ? Number(e.target.value) : null,
                )
              }
              className="w-full border-2 border-primary rounded-md p-2 outline-none"
            >
              <option value="">すべての作者</option>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">雑誌</label>
            <select
              value={selectedMagazine || ''}
              onChange={(e) =>
                setSelectedMagazine(
                  e.target.value ? Number(e.target.value) : null,
                )
              }
              className="w-full border-2 border-primary rounded-md p-2 outline-none"
            >
              <option value="">すべての雑誌</option>
              {magazines.map((magazine) => (
                <option key={magazine.id} value={magazine.id}>
                  {magazine.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <Button variant="outline" onClick={resetFilters} className="mr-2">
            リセット
          </Button>
        </div>
      </div>

      {/* 検索結果 */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          検索結果 ({filteredQuizzes.length}件)
        </h2>

        {filteredQuizzes.length === 0 ? (
          <p className="text-center py-8">
            条件に一致するクイズが見つかりませんでした
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes.map((quiz) => (
              <Link href={`/quiz/${quiz.id}`} key={quiz.id}>
                <div className="border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="relative h-48 w-full">
                    {quiz.quizImageUrl ? (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${quiz.quizImageUrl}`}
                        alt={quiz.question}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-gray-100">
                        <span className="text-gray-400">画像なし</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h2 className="text-lg font-semibold mb-2">
                      {quiz.question}
                    </h2>
                    <p className="text-sm text-gray-600 mb-2">
                      漫画: {quiz.comic.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      作者: {quiz.comic.author.name}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
