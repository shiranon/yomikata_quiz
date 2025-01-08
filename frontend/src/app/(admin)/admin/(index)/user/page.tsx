import { Board } from 'app/(admin)/_components/board'
import { getUsers } from 'libs/api/api-users'
import { cachedValidateAuth } from 'libs/auth'
import { redirect } from 'next/navigation'
import { Users } from './users'

export default async function AdminIndexPage() {
  const user = await cachedValidateAuth()
  const users = await getUsers()
  if (!user?.data.admin) {
    redirect('/admin')
  }
  return (
    <div className="">
      <Board>
        <Users users={users.data} />
      </Board>
    </div>
  )
}
