import { PublisherForm } from 'components/form/publisher-form'
import { getPublisher } from 'libs/api/api-publishers'

export default async function PublisherPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = await params

  const publisherData = await getPublisher(id)
  return (
    <div className="p-5">
      <div className="flex justify-center">
        <PublisherForm publisherData={publisherData.data} />
      </div>
    </div>
  )
}
