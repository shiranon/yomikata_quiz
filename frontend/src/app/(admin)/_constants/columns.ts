import { Colum } from '../_type/board'

const userColumns: Colum[] = [
  { field: 'id', headerName: 'ID', type: 'number', path: 'user' },
  { field: 'name', headerName: '名前', type: 'string' },
  { field: 'email', headerName: 'メールアドレス', type: 'string' },
  { field: 'admin', headerName: '管理者', type: 'boolean' },
  { field: 'createdAt', headerName: '作成日', type: 'date' },
  { field: 'updatedAt', headerName: '更新日', type: 'date' },
]

const publisherColumns: Colum[] = [
  { field: 'id', headerName: 'ID', type: 'number', path: 'publisher' },
  { field: 'name', headerName: '名前', type: 'string' },
  { field: 'publisherImageUrl', headerName: '画像', type: 'image_url' },
  { field: 'createdAt', headerName: '作成日', type: 'date' },
  { field: 'updatedAt', headerName: '更新日', type: 'date' },
]

export { publisherColumns, userColumns }
