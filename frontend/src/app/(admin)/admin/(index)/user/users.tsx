import { DataTable } from 'app/(admin)/_components/data-table'
import { userColumns } from 'app/(admin)/_constants/columns'
import { User } from 'app/(admin)/_type/board'

export const Users = ({ users }: { users: User[] }) => {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold bg-secondary pl-8 py-4 rounded-xl shadow-md shadow-secondary-dark">
        ユーザー
      </h1>
      <DataTable columns={userColumns} rows={users} />
    </div>
  )
}
