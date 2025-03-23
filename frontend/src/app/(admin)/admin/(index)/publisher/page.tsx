import { getPublishers } from 'libs/api/api-publishers'
import { Publishers } from './publishers'

export default async function AdminPublisherPage() {
  const publishers = await getPublishers()

  return (
    <>
      <Publishers publishers={publishers.data} />
    </>
  )
}
