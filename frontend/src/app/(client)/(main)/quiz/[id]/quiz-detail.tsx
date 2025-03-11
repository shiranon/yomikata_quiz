'use client'

import { Quiz } from 'app/(admin)/_type/board'
import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface QuizDetailProps {
  quiz: Quiz
}

export default function QuizDetail({ quiz }: QuizDetailProps) {
  const [userAnswer, setUserAnswer] = useState('')
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [showAnswer, setShowAnswer] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // 回答の正誤判定
    const isAnswerCorrect = userAnswer.trim() === quiz.answer.trim()
    setIsCorrect(isAnswerCorrect)
    setShowAnswer(true)
  }

  const handleRetry = () => {
    setUserAnswer('')
    setIsCorrect(null)
    setShowAnswer(false)
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <div className="mb-4">
        <Link href="/quiz" className="text-primary hover:underline">
          ← クイズ一覧に戻る
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">問題</h1>
          <p className="text-lg mb-6">{quiz.question}</p>

          <div className="relative w-full h-64 mb-6 bg-gray-100 rounded-lg overflow-hidden">
            {quiz.quizImageUrl ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${quiz.quizImageUrl}`}
                alt="クイズ画像"
                fill
                className="object-contain"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <span className="text-gray-400">画像なし</span>
              </div>
            )}
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-600">
              漫画: {quiz.comic.title} / 作者: {quiz.comic.author.name}
            </p>
          </div>

          {/* マイリスト機能は一時的に無効化 */}

          {!showAnswer ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="answer"
                  className="block text-lg font-medium mb-2"
                >
                  読み方を入力してください
                </label>
                <Input
                  id="answer"
                  type="text"
                  autoComplete="off"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="ひらがなで入力"
                  className="w-full"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                回答する
              </Button>
            </form>
          ) : (
            <div className="space-y-6">
              <div
                className={`p-4 rounded-lg ${
                  isCorrect
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                <p className="font-bold text-lg">
                  {isCorrect ? '正解！' : '不正解...'}
                </p>
                <p className="mt-2">
                  正解: <span className="font-bold">{quiz.answer}</span>
                </p>
                {!isCorrect && (
                  <p className="mt-1">
                    あなたの回答:{' '}
                    <span className="font-medium">{userAnswer}</span>
                  </p>
                )}
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">解説</h3>
                <p>{quiz.description}</p>
              </div>

              <div className="flex space-x-4">
                <Button
                  onClick={handleRetry}
                  variant="outline"
                  className="flex-1"
                >
                  もう一度挑戦
                </Button>
                <Link href="/quiz" className="flex-1">
                  <Button className="w-full">次のクイズへ</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
