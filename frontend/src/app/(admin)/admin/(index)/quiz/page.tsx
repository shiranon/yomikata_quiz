import { getQuizzes } from 'libs/api/api-quiz'
import { Quizzes } from './quiz'

export default async function AdminQuizPage() {
  const quizzes = await getQuizzes()
  return (
    <>
      <Quizzes quizzes={quizzes.data} />
    </>
  )
}
