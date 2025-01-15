import { DataTable } from 'app/(admin)/_components/data-table'
import { authorColumns } from 'app/(admin)/_constants/columns'
import { Author } from 'app/(admin)/_type/board'

export const AdminAuthorPage = ({ authors }: { authors: Author[] }) => {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold bg-secondary pl-8 py-4 rounded-xl shadow-md shadow-secondary-dark">
        著者
      </h1>
      <DataTable columns={authorColumns} rows={authors} />
    </div>
  )
}
