'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MyQuizList } from 'type/quiz'
export default function QuizList({
  quizzesList,
}: {
  quizzesList: MyQuizList[]
}) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">読み方クイズ一覧</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzesList.map((quizzes) => (
          <Link href={`/quiz/${quizzes.id}`} key={quizzes.id}>
            <div>
              <p>{quizzes.title}</p>
              <p>{quizzes.description}</p>
              <div>
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${quizzes.quizzes[0].quizImageUrl}`}
                  alt="publisher image"
                  width={100}
                  height={100}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
