import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header'
import { Sale } from '../data/schema'
import { SaleRowActions } from './sales-row-actions'

export const columns: ColumnDef<Sale>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Seleccionar todo'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Seleccionar fila'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'client',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Cliente' />
    ),
  },
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Fecha' />
    ),
    cell: ({ row }) => {
      const date = row.getValue('date') as Date
      return <div>{date.toLocaleDateString()}</div>
    },
  },
  {
    accessorKey: 'location',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Sede' />
    ),
  },
  {
    accessorKey: 'total',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Total' />
    ),
    cell: ({ row }) => {
      const total = row.getValue('total') as number
      return <div>S/. {total.toFixed(2)}</div>
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Estado' />
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
  },
  {
    accessorKey: 'mortality',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Mortalidad' />
    ),
    cell: ({ row }) => {
      const mortality = row.getValue('mortality') as boolean
      return (
        <Badge variant={mortality ? 'destructive' : 'default'}>
          {mortality ? 'Sí' : 'No'}
        </Badge>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <SaleRowActions row={row} />,
  },
]
