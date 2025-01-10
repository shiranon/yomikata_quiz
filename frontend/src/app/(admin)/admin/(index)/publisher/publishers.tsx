import { DataTable } from 'app/(admin)/_components/data-table'
import { publisherColumns } from 'app/(admin)/_constants/columns'
import { Publisher } from 'app/(admin)/_type/board'

export const Publishers = ({ publishers }: { publishers: Publisher[] }) => {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold bg-secondary pl-8 py-4 rounded-xl shadow-md shadow-secondary-dark">
        出版社
      </h1>
      <DataTable columns={publisherColumns} rows={publishers} />
    </div>
  )
}
