import { Header } from 'app/(admin)/_components/header'
import { Side } from 'app/(admin)/_components/side'

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="p-4">
      <Header />
      <Side />
      <div className=" ">{children}</div>
    </div>
  )
}
