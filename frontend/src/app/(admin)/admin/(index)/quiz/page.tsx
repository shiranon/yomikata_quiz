import { getQuizzes } from 'libs/api/api-quiz'
import { cachedValidateAuth } from 'libs/auth'
import { redirect } from 'next/navigation'
import { Quizzes } from './quiz'

export default async function AdminQuizPage() {
  const user = await cachedValidateAuth()
  const quizzes = await getQuizzes()
  if (!user?.data.admin) {
    redirect('/admin')
  }
  return (
    <>
      <Quizzes quizzes={quizzes.data} />
    </>
  )
}
