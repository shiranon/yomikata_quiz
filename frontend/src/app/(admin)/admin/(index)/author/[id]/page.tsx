import { AuthorForm } from 'components/form/author-form'
import { getAuthor } from 'libs/api/api-author'
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

  const authorData = await getAuthor(id)

  return (
    <div className="p-5">
      <div className="flex justify-center">
        <AuthorForm authorData={authorData.data} />
      </div>
    </div>
  )
}
