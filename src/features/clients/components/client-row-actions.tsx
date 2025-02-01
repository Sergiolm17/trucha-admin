import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Row } from '@tanstack/react-table'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useClients } from '../context/clients-context'
import { clientStatusTypes } from '../data/data'
import { Client } from '../data/schema'

interface ClientRowActionsProps {
  row: Row<Client>
}

export function ClientRowActions({ row }: ClientRowActionsProps) {
  const { setOpen, setCurrentRow, updateClient } = useClients()
  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
          >
            <DotsHorizontalIcon className='h-4 w-4' />
            <span className='sr-only'>Abrir menú</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-[160px]'>
          <DropdownMenuItem
            onClick={() => {
              setCurrentRow(row.original)
              setOpen('editar')
            }}
          >
            Editar
            <DropdownMenuShortcut>
              <IconEdit size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Cambiar Estado</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              {Array.from(clientStatusTypes.entries()).map(
                ([status, color]) => (
                  <DropdownMenuItem
                    key={status}
                    onClick={() => {
                      const updatedClient = {
                        ...row.original,
                        status,
                        updatedAt: new Date(),
                      }
                      updateClient(updatedClient)
                    }}
                  >
                    <Badge
                      variant='outline'
                      className={cn('w-full justify-start capitalize', color)}
                    >
                      {status}
                    </Badge>
                  </DropdownMenuItem>
                )
              )}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setCurrentRow(row.original)
              setOpen('eliminar')
            }}
            className='!text-red-500'
          >
            Eliminar
            <DropdownMenuShortcut>
              <IconTrash size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
