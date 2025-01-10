import { getUsers } from 'libs/api/api-users'
import { cachedValidateAuth } from 'libs/auth'
import { redirect } from 'next/navigation'
import { Users } from './users'

export default async function AdminUserPage() {
  const user = await cachedValidateAuth()
  const users = await getUsers()
  if (!user?.data.admin) {
    redirect('/admin')
  }
  return (
    <>
      <Users users={users.data} />
    </>
  )
}
