import { IconPlus } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { useSale } from '../context/sales-context'

export function SalePrimaryButtons() {
  const { setOpen } = useSale()

  return (
    <div className='flex items-center space-x-2'>
      <Button onClick={() => setOpen('add')}>
        <IconPlus className='mr-2 h-4 w-4' />
        Nueva Venta
      </Button>
    </div>
  )
}
