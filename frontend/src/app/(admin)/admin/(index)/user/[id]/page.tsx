import { UserForm } from 'app/(admin)/_components/form/user-form'
import { getUser } from 'libs/api/api-users'
import { cachedValidateAuth } from 'libs/auth'
import { redirect } from 'next/navigation'

export default async function UserPage({ params }: { params: { id: string } }) {
  const user = await cachedValidateAuth()
  if (!user?.data.admin) {
    redirect('/admin')
  }

  const { id } = await params

  const userData = await getUser(id)
  return (
    <div className="p-5">
      <div className="flex justify-center">
        <UserForm userData={userData.data} />
      </div>
    </div>
  )
}
