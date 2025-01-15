import { DataTable } from 'app/(admin)/_components/data-table'
import { comicColumns } from 'app/(admin)/_constants/columns'
import { Comic } from 'app/(admin)/_type/board'

export const Comics = ({ comics }: { comics: Comic[] }) => {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold bg-secondary pl-8 py-4 rounded-xl shadow-md shadow-secondary-dark">
        雑誌
      </h1>
      <DataTable columns={comicColumns} rows={comics} />
    </div>
  )
}
