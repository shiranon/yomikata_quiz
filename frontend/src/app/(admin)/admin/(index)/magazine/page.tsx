import { getMagazines } from 'libs/api/api-magazine'
import { Magazines } from './magazines'

export default async function AdminPublisherPage() {
  const magazines = await getMagazines()

  return (
    <>
      <Magazines magazines={magazines.data} />
    </>
  )
}
