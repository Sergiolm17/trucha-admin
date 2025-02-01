import { Row } from '@tanstack/react-table'
import { IconDots, IconEdit, IconEye, IconTrash } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useSale } from '../context/sales-context'
import { Sale } from '../data/schema'

interface Props {
  row: Row<Sale>
}

export function SaleRowActions({ row }: Props) {
  const { setOpen, setCurrentRow } = useSale()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
        >
          <IconDots className='h-4 w-4' />
          <span className='sr-only'>Abrir menú</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[160px]'>
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(row.original)
            setOpen('ver')
          }}
        >
          <IconEye className='mr-2 h-4 w-4' />
          Ver
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(row.original)
            setOpen('editar')
          }}
        >
          <IconEdit className='mr-2 h-4 w-4' />
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(row.original)
            setOpen('eliminar')
          }}
          className='text-destructive focus:text-destructive'
        >
          <IconTrash className='mr-2 h-4 w-4' />
          Eliminar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
