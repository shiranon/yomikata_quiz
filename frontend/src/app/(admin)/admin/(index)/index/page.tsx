import { Board } from 'app/(admin)/_components/board'
import { cachedValidateAuth } from 'libs/auth'
import { redirect } from 'next/navigation'

export default async function AdminIndexPage() {
  const user = await cachedValidateAuth()
  if (!user?.data.admin) {
    redirect('/admin')
  }
  return (
    <div className="">
      <Board>
        <div>クイズ</div>
      </Board>
    </div>
  )
}
