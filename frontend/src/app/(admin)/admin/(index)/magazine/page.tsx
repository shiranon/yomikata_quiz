import { cachedValidateAuth } from 'libs/auth'
import { redirect } from 'next/navigation'
import { Magazines } from './magazines'
import { getMagazines } from 'libs/api/api-magazine'

export default async function AdminPublisherPage() {
  const user = await cachedValidateAuth()
  const magazines = await getMagazines()
  if (!user?.data.admin) {
    redirect('/admin')
  }

  return (
    <>
      <Magazines magazines={magazines.data} />
    </>
  )
}
