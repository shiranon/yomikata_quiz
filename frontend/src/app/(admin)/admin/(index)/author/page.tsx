import { getAuthors } from 'libs/api/api-author'
import { AdminAuthorPage } from './author'

export default async function AdminPublisherPage() {
  const authors = await getAuthors()

  return (
    <>
      <AdminAuthorPage authors={authors.data} />
    </>
  )
}
