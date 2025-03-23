import { getMylists } from 'libs/api/api-mylist'
import { MyQuizList } from 'type/quiz'
import QuizList from './quiz-list'
export default async function QuizListPage() {
  try {
    const response = await getMylists()
    const quizzesList = response.data as MyQuizList[]
    console.log(quizzesList)
    return <QuizList quizzesList={quizzesList} />
  } catch (error) {
    console.error('クイズの取得に失敗しました:', error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">クイズの取得に失敗しました</div>
      </div>
    )
  }
}
