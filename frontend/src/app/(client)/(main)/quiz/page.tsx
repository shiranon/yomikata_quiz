import { getMylists } from 'libs/api/api-mylist'
import { Quiz } from 'type/quiz'
import QuizList from './quiz-list'

export default async function QuizListPage() {
  try {
    const response = await getMylists()
    const quizzes = response.data as Quiz[]

    return <QuizList quizzes={quizzes} />
  } catch (error) {
    console.error('クイズの取得に失敗しました:', error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">クイズの取得に失敗しました</div>
      </div>
    )
  }
}
