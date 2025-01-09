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
      <div className="flex relative ml-[246px]">
        <div className="border-4 border-border rounded-e-2xl rounded-b-2xl w-full h-[80vh]">
          {children}
        </div>
      </div>
    </div>
  )
}
