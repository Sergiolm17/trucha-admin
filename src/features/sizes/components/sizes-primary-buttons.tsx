import { IconRuler } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { useSizes } from '../context/sizes-context'

export function SizesPrimaryButtons() {
  const { setOpen } = useSizes()
  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Nueva Talla</span> <IconRuler size={18} />
      </Button>
    </div>
  )
}
