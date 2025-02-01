import { IconUserPlus } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { useClients } from '../context/clients-context'

export function ClientsPrimaryButtons() {
  const { setOpen } = useClients()
  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Nuevo Cliente</span> <IconUserPlus size={18} />
      </Button>
    </div>
  )
}
