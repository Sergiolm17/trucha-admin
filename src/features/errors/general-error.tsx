import { useNavigate, useRouter } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface GeneralErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  minimal?: boolean
}

export default function GeneralError({
  className,
  minimal = false,
}: GeneralErrorProps) {
  const navigate = useNavigate()
  const { history } = useRouter()
  return (
    <div className={cn('h-svh w-full', className)}>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        {!minimal && (
          <h1 className='text-[7rem] font-bold leading-tight'>500</h1>
        )}
        <span className='font-medium'>¡Ups! Algo salió mal {`:')`}</span>
        <p className='text-center text-muted-foreground'>
          Nos disculpamos por el inconveniente. <br /> Por favor, inténtalo de
          nuevo más tarde.
        </p>
        {!minimal && (
          <div className='mt-6 flex gap-4'>
            <Button variant='outline' onClick={() => history.go(-1)}>
              Volver
            </Button>
            <Button onClick={() => navigate({ to: '/' })}>Ir al Inicio</Button>
          </div>
        )}
      </div>
    </div>
  )
}
