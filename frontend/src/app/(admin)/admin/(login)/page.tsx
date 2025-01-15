import { SigninForm } from 'components/form/signin-form'
import { cachedValidateAuth } from 'libs/auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Admin() {
  const user = await cachedValidateAuth()
  if (user?.data.admin) {
    redirect('/admin/quiz')
  }
  return (
    <div className="flex h-[70vh] flex-col items-center justify-center">
      <div className="w-[360px]">
        <SigninForm />
        <div className="flex justify-end">
          <Link className="p-2" href="/">
            戻る
          </Link>
        </div>
      </div>
    </div>
  )
}
