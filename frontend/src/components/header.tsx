'use client'

import { Button } from 'components/ui/button'
import { signOut } from 'libs/api/api-auth'
import Link from 'next/link'
import { redirect, usePathname } from 'next/navigation'
import { AuthInfo } from 'type/auth'

const handleLogout = () => {
  signOut()
  redirect('/')
}
export function Header({ user }: { user: AuthInfo | null }) {
  const pathname = usePathname()
  return (
    <>
      {pathname === '/login' ? (
        <></>
      ) : (
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold p-2">Yomikata Quiz</div>
          <div className="flex gap-2 items-center pr-2">
            <div className="p-2 font-bold hover:underline">
              <Link href="/">Topページ</Link>
            </div>
            <span className="text-2xl">/</span>
            <div className="p-2 font-bold hover:underline">
              <Link href="/quiz">クイズ</Link>
            </div>
            <span className="text-2xl">/</span>
            {user ? (
              <>
                <div className="p-2 font-bold hover:underline">
                  <Link href="/quiz/create">クイズを作る</Link>
                </div>
                <span className="text-2xl">/</span>
              </>
            ) : null}
            <div className="p-2 font-bold hover:underline">
              <Link href="/quiz/search">クイズを探す</Link>
            </div>
            <span className="text-2xl">/</span>
            {user ? (
              <>
                <div className="p-2 font-bold hover:underline">
                  <Link href="/mypage">マイページ</Link>
                </div>
                <span className="text-2xl">/</span>
                <Button
                  onClick={() => {
                    handleLogout()
                  }}
                >
                  ログアウト
                </Button>
              </>
            ) : (
              <Link href="/login">
                <Button>ログイン</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  )
}
