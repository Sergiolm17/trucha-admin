import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header'
import { Production } from '../data/schema'
import { ProductionRowActions } from './production-row-actions'

export const columns: ColumnDef<Production>[] = [
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
    accessorKey: 'details',
    header: 'Detalles',
    cell: ({ row }) => {
      const details = row.getValue('details') as Production['details']
      return (
        <div className='space-y-1'>
          {details.map((detail) => (
            <Badge key={detail.id} variant='outline'>
              {detail.size}: {detail.quantity} (±{detail.error_margin})
            </Badge>
          ))}
        </div>
      )
    },
    enableSorting: false,
  },
  {
    id: 'actions',
    cell: ({ row }) => <ProductionRowActions row={row} />,
    enableSorting: false,
  },
]
