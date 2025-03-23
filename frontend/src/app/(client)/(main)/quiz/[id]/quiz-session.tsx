'use client'

import { useCallback, useEffect, useState } from 'react'
import { MyQuizList, Quiz } from 'type/quiz'

import { QuizDetail } from 'components/quiz/quiz-detail'
import { Button } from 'components/ui/button'
import Image from 'next/image'

interface QuizSessionProps {
  myQuizList: MyQuizList
}

interface QuizResult {
  quiz: Quiz
  userAnswer: string
  isCorrect: boolean
}

export default function QuizSession({ myQuizList }: QuizSessionProps) {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0)
  const [quizResults, setQuizResults] = useState<QuizResult[]>([])
  const [isSessionComplete, setIsSessionComplete] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)

  const totalQuizzes = myQuizList.quizzes.length
  const currentQuiz = myQuizList.quizzes[currentQuizIndex]

  // 現在のクイズの結果を取得
  const getCurrentQuizResult = useCallback(() => {
    return quizResults.find((result) => result.quiz.id === currentQuiz?.id)
  }, [currentQuiz, quizResults])

  const currentResult = getCurrentQuizResult()

  // 回答提出時の処理
  const handleAnswerSubmit = (isCorrect: boolean, userAnswer: string) => {
    const newResult: QuizResult = {
      quiz: currentQuiz,
      userAnswer,
      isCorrect,
    }

    // 結果を保存
    setQuizResults((prev) => {
      const existingIndex = prev.findIndex((r) => r.quiz.id === currentQuiz.id)
      if (existingIndex >= 0) {
        const updated = [...prev]
        updated[existingIndex] = newResult
        return updated
      }
      return [...prev, newResult]
    })

    // 正解数を更新
    if (isCorrect) {
      setCorrectCount((prev) => {
        // 既に正解していた場合は増やさない
        const alreadyCorrect = quizResults.find(
          (r) => r.quiz.id === currentQuiz.id && r.isCorrect,
        )
        return alreadyCorrect ? prev : prev + 1
      })
    }
  }

  // 次の問題へ進む
  const handleNext = useCallback(() => {
    if (currentQuizIndex < totalQuizzes - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1)
    } else {
      setIsSessionComplete(true)
    }
  }, [currentQuizIndex, totalQuizzes])

  // 最初からやり直す
  const handleRestart = () => {
    setCurrentQuizIndex(0)
    setQuizResults([])
    setIsSessionComplete(false)
    setCorrectCount(0)
  }
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // 正解/不正解の結果が表示されていて、かつエンターキーが押された場合
      if (getCurrentQuizResult() && event.key === 'Enter') {
        handleNext()
      }
    }

    // イベントリスナーを追加
    window.addEventListener('keydown', handleKeyDown)

    // クリーンアップ関数
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [getCurrentQuizResult, handleNext])

  if (!currentQuiz && !isSessionComplete) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">クイズがありません</h1>
        <p>このマイリストにはクイズが登録されていないのだ。</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-2">{myQuizList.title}</h1>
          <p className="text-gray-600 mb-4">{myQuizList.description}</p>

          {/* 進捗状況 */}
          <div className="flex justify-between items-center mb-2 p-3 bg-gray-50 rounded-lg">
            <div>
              <span className="font-medium">問題: </span>
              <span className="text-lg font-bold">{currentQuizIndex + 1}</span>
              <span className="text-gray-500"> / {totalQuizzes}</span>
            </div>
            <div>
              <span className="font-medium">正解数: </span>
              <span className="text-lg font-bold text-green-600">
                {correctCount}
              </span>
              <span className="text-gray-500"> / {totalQuizzes}</span>
            </div>
          </div>
        </div>
      </div>

      {!isSessionComplete ? (
        <>
          {/* 現在のクイズ */}
          <QuizDetail
            quiz={currentQuiz}
            onAnswerSubmit={handleAnswerSubmit}
            showAnswerImmediately={!!currentResult}
            userAnswerProp={currentResult?.userAnswer}
            isCorrectProp={currentResult?.isCorrect || null}
          />

          {/* ナビゲーションボタン */}
          {getCurrentQuizResult() && (
            <div className="fixed bottom-6 right-[25%] flex justify-center mt-6">
              <Button onClick={handleNext}>
                {currentQuizIndex < totalQuizzes - 1
                  ? '次の問題へ'
                  : '結果を見る'}
              </Button>
            </div>
          )}
        </>
      ) : (
        /* 結果一覧 */
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">結果一覧</h2>
            <div className="mb-6 text-center">
              <p className="text-lg">
                正解数:{' '}
                <span className="font-bold text-green-600">{correctCount}</span>{' '}
                / {totalQuizzes}（
                {Math.round((correctCount / totalQuizzes) * 100)}%）
              </p>
            </div>

            <div className="space-y-6">
              {quizResults.map((result, index) => (
                <div
                  key={result.quiz.id}
                  className="border rounded-lg overflow-hidden"
                >
                  <div className="bg-gray-50 p-3 border-b">
                    <h3 className="font-medium">問題 {index + 1}</h3>
                  </div>
                  <div className="p-4">
                    <p className="font-medium mb-2">{result.quiz.question}</p>
                    <div className="mb-2">
                      {result.quiz.quizImageUrl && (
                        <div className="relative w-full h-40 mb-3 bg-gray-100 rounded-lg overflow-hidden">
                          <Image
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${result.quiz.quizImageUrl}`}
                            alt="クイズ画像"
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                    </div>
                    <div
                      className={`p-3 rounded-lg ${
                        result.isCorrect
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      <p>
                        <span className="font-medium">あなたの回答: </span>
                        {result.userAnswer}
                      </p>
                      <p>
                        <span className="font-medium">正解: </span>
                        {result.quiz.answer}
                      </p>
                    </div>
                    {result.quiz.description && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">
                          {result.quiz.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Button onClick={handleRestart}>もう一度挑戦する</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
