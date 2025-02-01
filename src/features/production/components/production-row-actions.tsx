import { Row } from '@tanstack/react-table'
import { IconDots, IconEdit, IconTrash } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useProduction } from '../context/production-context'
import { Production } from '../data/schema'

interface Props {
  row: Row<Production>
}

export function ProductionRowActions({ row }: Props) {
  const { setOpen, setCurrentRow } = useProduction()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0'>
          <IconDots className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem
          onClick={() => {
            setOpen('edit')
            setCurrentRow(row.original)
          }}
        >
          <IconEdit className='mr-2 h-4 w-4' />
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setOpen('delete')
            setCurrentRow(row.original)
          }}
          className='text-destructive'
        >
          <IconTrash className='mr-2 h-4 w-4' />
          Eliminar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
