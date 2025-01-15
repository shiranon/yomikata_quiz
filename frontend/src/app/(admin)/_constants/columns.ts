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
  { field: 'user', headerName: '作成者', type: 'user' },
]

const magazineColumns: Colum[] = [
  { field: 'id', headerName: 'ID', type: 'number', path: 'magazine' },
  { field: 'name', headerName: '名前', type: 'string' },
  { field: 'magazineImageUrl', headerName: '画像', type: 'image_url' },
  { field: 'createdAt', headerName: '作成日', type: 'date' },
  { field: 'updatedAt', headerName: '更新日', type: 'date' },
  { field: 'user', headerName: '作成者', type: 'user' },
]

const authorColumns: Colum[] = [
  { field: 'id', headerName: 'ID', type: 'number', path: 'author' },
  { field: 'name', headerName: '名前', type: 'string' },
  { field: 'description', headerName: '説明', type: 'string' },
  { field: 'createdAt', headerName: '作成日', type: 'date' },
  { field: 'updatedAt', headerName: '更新日', type: 'date' },
  { field: 'user', headerName: '作成者', type: 'user' },
]

const comicColumns: Colum[] = [
  { field: 'id', headerName: 'ID', type: 'number', path: 'comic' },
  { field: 'title', headerName: 'タイトル', type: 'string' },
  { field: 'comicImageUrl', headerName: '画像', type: 'image_url' },
  { field: 'createdAt', headerName: '作成日', type: 'date' },
  { field: 'updatedAt', headerName: '更新日', type: 'date' },
  { field: 'user', headerName: '作成者', type: 'user' },
]

const quizColumns: Colum[] = [
  { field: 'id', headerName: 'ID', type: 'number', path: 'quiz' },
  { field: 'quizImageUrl', headerName: '画像', type: 'image_url' },
  { field: 'question', headerName: '問題', type: 'string' },
  { field: 'answer', headerName: '回答', type: 'string' },
  { field: 'comic', headerName: '漫画', type: 'comic' },
  { field: 'createdAt', headerName: '作成日', type: 'date' },
  { field: 'updatedAt', headerName: '更新日', type: 'date' },
  { field: 'user', headerName: '作成者', type: 'user' },
]

export {
  authorColumns,
  comicColumns,
  magazineColumns,
  publisherColumns,
  quizColumns,
  userColumns,
}
