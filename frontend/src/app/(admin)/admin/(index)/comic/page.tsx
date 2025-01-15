import { cachedValidateAuth } from 'libs/auth'
import { redirect } from 'next/navigation'
import { Comics } from './comic'
import { getComics } from 'libs/api/api-comic'

export default async function AdminPublisherPage() {
  const user = await cachedValidateAuth()
  const comics = await getComics()
  if (!user?.data.admin) {
    redirect('/admin')
  }

  return (
    <>
      <Comics comics={comics.data} />
    </>
  )
}
