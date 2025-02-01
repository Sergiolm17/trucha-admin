import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header'
import { Production } from '../data/schema'
import { ProductionRowActions } from './production-row-actions'

export const columns: ColumnDef<Production>[] = [
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
  },
  {
    id: 'actions',
    cell: ({ row }) => <ProductionRowActions row={row} />,
  },
]
