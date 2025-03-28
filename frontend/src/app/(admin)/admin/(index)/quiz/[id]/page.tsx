import { QuizForm } from 'components/form/quiz-form'
import { getComics } from 'libs/api/api-comic'
import { getQuiz } from 'libs/api/api-quiz'

export default async function QuizPage({ params }: { params: { id: string } }) {
  const { id } = await params

  const quizData = await getQuiz(id)
  const comics = await getComics()
  return (
    <div className="p-5">
      <div className="flex justify-center">
        <QuizForm quizData={quizData.data} comics={comics.data} />
      </div>
    </div>
  )
}
