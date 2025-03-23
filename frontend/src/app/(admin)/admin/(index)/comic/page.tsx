import { getComics } from 'libs/api/api-comic'
import { Comics } from './comic'

export default async function AdminPublisherPage() {
  const comics = await getComics()

  return (
    <>
      <Comics comics={comics.data} />
    </>
  )
}
