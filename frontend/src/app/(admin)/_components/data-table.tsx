'use client'

import { Button } from 'components/ui/button'
import Link from 'next/link'
import { useState } from 'react'

export type Colum = {
  field: string
  headerName: string
  width?: number
  type?: string
}

type Order = 'asc' | 'desc'

type DataTableProps<T extends Record<string, unknown>> = {
  columns: Colum[]
  rows: T[]
}

const formatValue = (value: unknown, type?: string) => {
  switch (type) {
    case 'date':
      const dateStr = String(value)
      return dateStr.replace('T', ' ').split('.')[0]
    case 'boolean':
      return value ? '✓' : '✗'
    default:
      return String(value)
  }
}

export const DataTable = <T extends Record<string, unknown>>({
  columns,
  rows,
}: DataTableProps<T>) => {
  const [sortBy, setSortBy] = useState<string>('id')
  const [order, setOrder] = useState<Order>('asc')

  const header = columns.map((col) => {
    const transform = order === 'asc' ? 'rotate(180deg)' : undefined
    const opacity = sortBy === col.field ? 1 : 0
    const sort = () => {
      if (sortBy === col.field) {
        const newOrder = order === 'desc' ? 'asc' : 'desc'
        setSortBy(col.field)
        setOrder(newOrder)
      } else {
        setSortBy(col.field)
        setOrder(order ? order : 'desc')
      }
    }
    return (
      <th
        className="border-b-2 border-gray-200"
        key={col.field}
        style={{ width: col.width }}
      >
        <div className="flex items-center justify-between">
          <Button className="bg-white text-primary pl-0" onClick={sort}>
            <span>{col.headerName}</span>
            <span className="h-4 w-4" style={{ transform, opacity }}>
              ↑
            </span>
          </Button>
        </div>
      </th>
    )
  })

  const sortedRows = [...rows].sort((a, b) => {
    const aValue = sortBy in a ? (a[sortBy] as string | number | boolean) : ''
    const bValue = sortBy in b ? (b[sortBy] as string | number | boolean) : ''

    if (aValue == null) return 1
    if (bValue == null) return -1

    if (aValue < bValue) return order === 'asc' ? -1 : 1
    if (aValue > bValue) return order === 'asc' ? 1 : -1
    return 0
  })

  const tbodyContent = sortedRows.map((row, index) => {
    const cells = columns.map((col) => {
      const value = col.field in row ? row[col.field] : ''
      const displayValue = formatValue(value, col.type)
      if (col.field === 'id') {
        return (
          <td key={col.field}>
            <Link
              className="ml-1 p-2 bg-primary rounded-md text-white"
              href={`/admin/user/${row.id}`}
            >
              {displayValue}
            </Link>
          </td>
        )
      }
      return <td key={col.field}>{displayValue}</td>
    })
    return (
      <tr
        className={`h-10 ${index % 2 === 0 ? 'bg-secondary' : 'bg-secondary-light'}`}
        key={row.id as number}
      >
        {cells}
      </tr>
    )
  })

  return (
    <div className="mt-2 p-2 border-2 border-gray-200 rounded-md">
      <table className="w-full">
        <thead className="text-left">
          <tr>{header}</tr>
        </thead>
        <tbody>{tbodyContent}</tbody>
      </table>
    </div>
  )
}
