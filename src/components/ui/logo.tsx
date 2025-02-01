import { Command } from 'lucide-react'

export function Logo() {
  return (
    <div className='flex items-center gap-2'>
      <Command className='h-6 w-6' />
      <span className='font-bold'>Trucha Admin</span>
    </div>
  )
}
