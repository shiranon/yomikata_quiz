import { getAuthors } from 'libs/api/api-author'
import { getComics } from 'libs/api/api-comic'
import { getMagazines } from 'libs/api/api-magazine'
import { getPublishers } from 'libs/api/api-publisher'
import { cachedValidateAuth } from 'libs/auth'
import { redirect } from 'next/navigation'
import CreateQuizDetail from './create-detail'

export default async function CreateQuizPage() {
  const user = await cachedValidateAuth()
  if (!user) {
    redirect('/login')
  }

  // サーバーサイドでデータを取得
  const [
    comicsResponse,
    publishersResponse,
    magazinesResponse,
    authorsResponse,
  ] = await Promise.all([
    getComics(),
    getPublishers(),
    getMagazines(),
    getAuthors(),
  ])

  const comics = comicsResponse.data || []
  const publishers = publishersResponse.data || []
  const magazines = magazinesResponse.data || []
  const authors = authorsResponse.data || []

  return (
    <CreateQuizDetail
      comics={comics}
      publishers={publishers}
      magazines={magazines}
      authors={authors}
    />
  )
}
