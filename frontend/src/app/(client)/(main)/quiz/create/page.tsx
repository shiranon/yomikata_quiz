import { getComics } from 'libs/api/api-comic'
import { getPublishers } from 'libs/api/api-publisher'
import { getMagazines } from 'libs/api/api-magazine'
import { getAuthors } from 'libs/api/api-author'
import CreateQuizDetail from './create-detail'

export default async function CreateQuizPage() {
  // サーバーサイドでデータを取得
  const [comicsResponse, publishersResponse, magazinesResponse, authorsResponse] = await Promise.all([
    getComics(),
    getPublishers(),
    getMagazines(),
    getAuthors()
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
