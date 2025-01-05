import { Button } from 'components/ui/button'
import { cn } from 'libs/utils'

const sidebarClass =
  'w-full border-y-4 border-border rounded-s-2xl h-12 rounded-e-none text-[16px]'

const selectedClass =
  'bg-white text-primary border-l-4 border-y-4 border-primary'

interface SideProps {
  adminPath: string
  setAdminPath: (path: string) => void
}

export const Side = ({ adminPath, setAdminPath }: SideProps) => {
  return (
    <div className="flex flex-col gap-2 pl-4 pt-4 text-lg font-bold">
      <Button
        className={cn(sidebarClass, adminPath === 'user' && selectedClass)}
        onClick={() => setAdminPath('user')}
      >
        <div className="p-4">ユーザー</div>
      </Button>
      <Button
        className={cn(sidebarClass, adminPath === 'quiz' && selectedClass)}
        onClick={() => setAdminPath('quiz')}
      >
        <div className="p-4">クイズ</div>
      </Button>
      <Button
        className={cn(sidebarClass, adminPath === 'title' && selectedClass)}
        onClick={() => setAdminPath('title')}
      >
        <div className="p-4">タイトル</div>
      </Button>
      <Button
        className={cn(sidebarClass, adminPath === 'publisher' && selectedClass)}
        onClick={() => setAdminPath('publisher')}
      >
        <div className="p-4">出版社</div>
      </Button>
      <Button
        className={cn(sidebarClass, adminPath === 'magazine' && selectedClass)}
        onClick={() => setAdminPath('magazine')}
      >
        <div className="p-4">雑誌</div>
      </Button>
    </div>
  )
}
