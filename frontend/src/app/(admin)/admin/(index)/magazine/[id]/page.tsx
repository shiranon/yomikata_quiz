import { MagazineForm } from 'components/form/magazine-form'
import { getMagazine } from 'libs/api/api-magazine'
import { getPublishers } from 'libs/api/api-publishers'
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

  const magazineData = await getMagazine(id)
  const publishers = await getPublishers()

  return (
    <div className="p-5">
      <div className="flex justify-center">
        <MagazineForm
          magazineData={magazineData.data}
          publishers={publishers.data}
        />
      </div>
    </div>
  )
}
