import { IconPlus } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { useProduction } from '../context/production-context'

export function ProductionPrimaryButtons() {
  const { setOpen } = useProduction()

  return (
    <div className='flex items-center space-x-2'>
      <Button onClick={() => setOpen('add')}>
        <IconPlus className='mr-2 h-4 w-4' />
        Nueva Producción
      </Button>
    </div>
  )
}
