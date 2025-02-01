import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Size } from '../data/schema'
import { SizeRowActions } from './size-row-actions'

export const columns: ColumnDef<Size>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre',
  },
  {
    accessorKey: 'commonName',
    header: 'Nombre Común',
  },
  {
    accessorKey: 'grams',
    header: 'Gramos',
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
    cell: ({ row }) => {
      const type = row.getValue('type') as string
      return (
        <Badge variant='outline' className='capitalize'>
          {type}
        </Badge>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <SizeRowActions row={row} />,
  },
]
