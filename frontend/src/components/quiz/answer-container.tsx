import { useState } from 'react'
import { Quiz } from 'type/quiz'

interface AnswerContainerProps {
  isCorrect: boolean | null
  quiz: Quiz
  userAnswer: string
}
export const AnswerContainer = ({
  isCorrect,
  quiz,
  userAnswer,
}: AnswerContainerProps) => {
  const [showDescription, setShowDescription] = useState(false)

  return (
    <div className="space-y-6 w-[70%] mx-auto">
      <div
        className={`py-4 px-8 rounded-lg ${
          isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
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
            あなたの回答:
            <span className="font-medium">{userAnswer}</span>
          </p>
        )}
      </div>

      <div className="mt-4">
        <div className="flex px-4 justify-between">
          <button
            onClick={() => setShowDescription(!showDescription)}
            className="text-primary hover:text-primary/80 font-medium flex items-center"
          >
            {showDescription ? '解説を隠す ▲' : '解説を見る ▼'}
          </button>
          <div>
            <span className="bg-primary text-white px-2 py-1 rounded">
              Enter
            </span>
            で次の問題へ
          </div>
        </div>

        {showDescription && (
          <div className="bg-gray-50 py-4 px-8 rounded-lg mt-2 animate-fadeIn">
            <h3 className="font-bold text-lg mb-2">解説</h3>
            <p>{quiz.description}</p>
          </div>
        )}
      </div>
    </div>
  )
}
