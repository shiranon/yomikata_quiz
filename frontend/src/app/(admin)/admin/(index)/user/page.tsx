import { getUsers } from 'libs/api/api-users'
import { Users } from './users'

export default async function AdminUserPage() {
  const users = await getUsers()

  return (
    <>
      <Users users={users.data} />
    </>
  )
}
