import { getQuiz } from 'libs/api/api-quiz'
import { Quiz } from 'app/(admin)/_type/board'
import QuizDetail from './quiz-detail'

export default async function QuizDetailPage({ params }: { params: { id: string } }) {
  try {
    const response = await getQuiz(params.id)
    const quiz = response.data as Quiz

    return <QuizDetail quiz={quiz} />
  } catch (error) {
    console.error('クイズの取得に失敗しました:', error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">クイズの取得に失敗しました</div>
      </div>
    )
  }
}
