'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Quiz } from 'type/quiz'
interface QuizListProps {
  quizzes: Quiz[]
}

export default function QuizList({ quizzes }: QuizListProps) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">読み方クイズ一覧</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
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
                <h2 className="text-lg font-semibold mb-2">{quiz.question}</h2>
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
    </div>
  )
}
