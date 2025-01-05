import { Header } from 'app/(admin)/_components/header'

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="p-4">
      <Header />
      <div className=" ">{children}</div>
    </div>
  )
}
