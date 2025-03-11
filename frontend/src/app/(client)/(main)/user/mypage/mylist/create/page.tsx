'use client'

import { MylistForm } from 'components/form/mylist-form'
import Link from 'next/link'

export default function CreateMylistPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <Link href="/user/mypage/mylist" className="text-primary hover:underline">
          ← マイリスト一覧に戻る
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <MylistForm />
      </div>
    </div>
  )
}