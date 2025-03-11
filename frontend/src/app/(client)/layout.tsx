import { Header } from 'components/header'
import { cachedValidateAuth } from 'libs/auth'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Yomikata Quiz',
  description: 'Yomikata Quiz',
}

export default async function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await cachedValidateAuth()
  return (
    <div className="w-full">
      <Header user={user} />
      {children}
    </div>
  )
}
