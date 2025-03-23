import { getMylist } from 'libs/api/api-mylist'
import { MyQuizList } from 'type/quiz'
import QuizSession from './quiz-session'

export default async function MylistQuizPage({
  params,
}: {
  params: { id: string }
}) {
  try {
    const response = await getMylist(params.id)
    const myQuizList = response.data as MyQuizList

    return <QuizSession myQuizList={myQuizList} />
  } catch (error) {
    console.error('マイリストの取得に失敗しました:', error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">マイリストの取得に失敗したのだ</div>
      </div>
    )
  }
}