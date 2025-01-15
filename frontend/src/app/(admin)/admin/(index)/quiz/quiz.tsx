import { DataTable } from 'app/(admin)/_components/data-table'
import { quizColumns } from 'app/(admin)/_constants/columns'
import { Quiz } from 'app/(admin)/_type/board'

export const Quizzes = ({ quizzes }: { quizzes: Quiz[] }) => {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold bg-secondary pl-8 py-4 rounded-xl shadow-md shadow-secondary-dark">
        クイズ
      </h1>
      <DataTable columns={quizColumns} rows={quizzes} />
    </div>
  )
}
