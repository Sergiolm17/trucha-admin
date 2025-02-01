import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header'
import { Sale } from '../data/schema'
import { SaleRowActions } from './sales-row-actions'

const statusOptions = [
  { label: 'Completado', value: 'Completado' },
  { label: 'Pendiente', value: 'Pendiente' },
  { label: 'Cancelado', value: 'Cancelado' },
]

const mortalityOptions = [
  { label: 'Sí', value: 'true' },
  { label: 'No', value: 'false' },
]

export const columns: ColumnDef<Sale>[] = [
  {
    accessorKey: 'client',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Cliente'
        sortingLabels={{
          asc: 'A-Z',
          desc: 'Z-A',
        }}
      />
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Fecha'
        sortingLabels={{
          asc: 'Más antiguas primero',
          desc: 'Más recientes primero',
        }}
      />
    ),
    cell: ({ row }) => {
      const date = row.getValue('date') as Date
      return <div>{date.toLocaleDateString()}</div>
    },
    enableSorting: true,
  },
  {
    accessorKey: 'location',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Sede'
        sortingLabels={{
          asc: 'A-Z',
          desc: 'Z-A',
        }}
      />
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'total',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Total'
        sortingLabels={{
          asc: 'Menor a mayor',
          desc: 'Mayor a menor',
        }}
      />
    ),
    cell: ({ row }) => {
      const total = row.getValue('total') as number
      return <div>S/. {total.toFixed(2)}</div>
    },
    enableSorting: true,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Estado'
        showFilterOption={true}
        filterOptions={statusOptions}
      />
    ),
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      return (
        <Badge
          variant={
            status === 'Completado'
              ? 'default'
              : status === 'Pendiente'
                ? 'secondary'
                : 'destructive'
          }
        >
          {status}
        </Badge>
      )
    },
    enableSorting: false,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'mortality',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Mortalidad'
        showFilterOption={true}
        filterOptions={mortalityOptions}
      />
    ),
    cell: ({ row }) => {
      const mortality = row.getValue('mortality') as boolean
      return (
        <Badge variant={mortality ? 'destructive' : 'default'}>
          {mortality ? 'Sí' : 'No'}
        </Badge>
      )
    },
    enableSorting: false,
    filterFn: (row, id, value) => {
      const mortality = row.getValue(id) as boolean
      return value.includes(mortality.toString())
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <SaleRowActions row={row} />,
    enableSorting: false,
  },
]
