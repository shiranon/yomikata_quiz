'use client'
import { cn } from 'libs/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const sidebarClass =
  'inline-flex items-center bg-primary text-white justify-center whitespace-nowrap  w-full border-y-4 border-border rounded-s-2xl h-12 rounded-e-none text-[16px] disabled:pointer-events-none disabled:opacity-50'

const selectedClass =
  'bg-white text-primary border-l-4 border-y-4 border-primary'

export const Side = () => {
  const adminPath = usePathname()
  return (
    <div className="relative z-10">
      <aside className="absolute w-[250px] -right-[4px] flex top-0 left-0 flex-col gap-2 text-lg font-bold">
        <Link
          className={cn(
            sidebarClass,
            adminPath === '/admin/user' && selectedClass,
          )}
          href={'/admin/user'}
        >
          <div className="p-4">ユーザー</div>
        </Link>
        <Link
          className={cn(
            sidebarClass,
            adminPath === '/admin/index' && selectedClass,
          )}
          href={'/admin/index'}
        >
          <div className="p-4">クイズ</div>
        </Link>
        <Link
          className={cn(sidebarClass, adminPath === 'title' && selectedClass)}
          href={'/admin/title'}
        >
          <div className="p-4">タイトル</div>
        </Link>
        <Link
          className={cn(
            sidebarClass,
            adminPath === 'publisher' && selectedClass,
          )}
          href={'/admin/publisher'}
        >
          <div className="p-4">出版社</div>
        </Link>
        <Link
          className={cn(
            sidebarClass,
            adminPath === 'magazine' && selectedClass,
          )}
          href={'/admin/magazine'}
        >
          <div className="p-4">雑誌</div>
        </Link>
      </aside>
    </div>
  )
}
