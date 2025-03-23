import { Header } from 'app/(admin)/_components/header'
import { Side } from 'app/(admin)/_components/side'
import { cachedValidateAuth } from 'libs/auth'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Yomikata Quiz管理',
  description: 'Yomikata Quiz管理',
}

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await cachedValidateAuth()
  if (!user?.data.admin) {
    redirect('/admin')
  }
  return (
    <div className="p-4">
      <Header />
      <Side />
      <div className="flex relative ml-[246px]">
        <div className="border-4 border-border rounded-e-2xl rounded-b-2xl w-full h-[80vh]">
          {children}
        </div>
      </div>
    </div>
  )
}
