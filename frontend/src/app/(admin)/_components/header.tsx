'use client'

import { Button } from 'components/ui/button'
import { signOut } from 'libs/api/api-auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const handleLogout = () => {
  signOut()
  redirect('/admin')
}
export function Header() {
  return (
    <div className="flex justify-between items-center">
      <div className="text-2xl font-bold p-2">Yomikata Quiz管理</div>
      <div className="flex gap-2 items-center">
        <div className="p-2 font-bold hover:underline">
          <Link href="/">Topページ</Link>
        </div>
        <span className="text-2xl">/</span>
        <Button
          onClick={() => {
            handleLogout()
          }}
        >
          ログアウト
        </Button>
      </div>
    </div>
  )
}
