'use client'

import { useState } from 'react'
import { Side } from './side'

export const Board = () => {
  const [adminPath, setAdminPath] = useState<string>('user')
  return (
    <div className="flex relative">
      <div className="relative w-[300px] -right-[4px]">
        <Side adminPath={adminPath} setAdminPath={setAdminPath} />
      </div>
      <div className="border-4 border-border rounded-e-2xl rounded-b-2xl w-full h-[80vh] mt-4">
        aaa
      </div>
    </div>
  )
}
