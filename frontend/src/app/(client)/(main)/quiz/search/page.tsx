import { getPublishers } from 'libs/api/api-publisher'
import { getAuthors } from 'libs/api/api-author'
import { getMagazines } from 'libs/api/api-magazine'
import { getQuizzes } from 'libs/api/api-quiz'
import SearchDetail from './search-detail'

export default async function SearchQuizPage() {
  // サーバーサイドでデータを取得
  const [publishersRes, authorsRes, magazinesRes, quizzesRes] = await Promise.all([
    getPublishers(),
    getAuthors(),
    getMagazines(),
    getQuizzes()
  ])

  const publishers = publishersRes.data || []
  const authors = authorsRes.data || []
  const magazines = magazinesRes.data || []
  const quizzes = quizzesRes.data || []

  return (
    <SearchDetail
      publishers={publishers}
      authors={authors}
      magazines={magazines}
      quizzes={quizzes}
    />
  )
}