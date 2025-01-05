import { SigninForm } from 'components/form/signin-form'
import { cachedValidateAuth } from 'libs/auth'
import { redirect } from 'next/navigation'

export default async function Admin() {
  const user = await cachedValidateAuth()
  if (user?.data.admin) {
    redirect('/admin/index')
  }
  return (
    <div className="flex h-[70vh] flex-col items-center justify-center">
      <SigninForm />
    </div>
  )
}
