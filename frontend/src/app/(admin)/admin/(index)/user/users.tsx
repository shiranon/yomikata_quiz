import { Colum, DataTable } from 'app/(admin)/_components/data-table'

export type User = {
  id: number
  name: string
  email: string
  admin: boolean
  createdAt: Date
  updatedAt: Date
}

export const Users = ({ users }: { users: User[] }) => {
  const columns: Colum[] = [
    { field: 'id', headerName: 'ID', type: 'number' },
    { field: 'name', headerName: '名前', type: 'string' },
    { field: 'email', headerName: 'メールアドレス', type: 'string' },
    { field: 'admin', headerName: '管理者', type: 'boolean' },
    { field: 'createdAt', headerName: '作成日', type: 'date' },
    { field: 'updatedAt', headerName: '更新日', type: 'date' },
  ]
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold bg-secondary pl-8 py-4 rounded-xl shadow-md shadow-secondary-dark">
        ユーザー
      </h1>
      <DataTable columns={columns} rows={users} />
    </div>
  )
}
