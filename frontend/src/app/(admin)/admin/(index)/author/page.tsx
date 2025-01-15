import { getAuthors } from 'libs/api/api-author'
import { cachedValidateAuth } from 'libs/auth'
import { redirect } from 'next/navigation'
import { AdminAuthorPage } from './author'

export default async function AdminPublisherPage() {
  const user = await cachedValidateAuth()
  const authors = await getAuthors()
  if (!user?.data.admin) {
    redirect('/admin')
  }

  return (
    <>
      <AdminAuthorPage authors={authors.data} />
    </>
  )
}
