import { getPublishers } from 'libs/api/api-publishers'
import { cachedValidateAuth } from 'libs/auth'
import { redirect } from 'next/navigation'
import { Publishers } from './publishers'

export default async function AdminPublisherPage() {
  const user = await cachedValidateAuth()
  const publishers = await getPublishers()
  if (!user?.data.admin) {
    redirect('/admin')
  }

  return (
    <>
      <Publishers publishers={publishers.data} />
    </>
  )
}
