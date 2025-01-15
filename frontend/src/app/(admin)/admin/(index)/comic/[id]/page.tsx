import { ComicForm } from 'components/form/comic-form'
import { getAuthors } from 'libs/api/api-author'
import { getComic } from 'libs/api/api-comic'
import { getMagazines } from 'libs/api/api-magazine'
import { cachedValidateAuth } from 'libs/auth'
import { redirect } from 'next/navigation'

export default async function MagazinePage({
  params,
}: {
  params: { id: string }
}) {
  const user = await cachedValidateAuth()
  if (!user?.data.admin) {
    redirect('/admin')
  }

  const { id } = await params

  const comicData = await getComic(id)
  const magazines = await getMagazines()
  const authors = await getAuthors()
  return (
    <div className="p-5">
      <div className="flex justify-center">
        <ComicForm
          comicData={comicData.data}
          magazines={magazines.data}
          authors={authors.data}
        />
      </div>
    </div>
  )
}
