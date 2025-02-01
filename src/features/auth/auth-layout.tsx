import { Logo } from '@/components/ui/logo'

interface Props {
  children: React.ReactNode
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className='container relative grid h-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
        <div className='absolute inset-0 bg-zinc-900' />
        <div className='relative z-20 flex items-center text-lg font-medium'>
          <Logo />
        </div>
        <div className='relative z-20 mt-auto'>
          <blockquote className='space-y-2'>
            <p className='text-lg'>
              &ldquo;Esta aplicación ha revolucionado la forma en que
              gestionamos nuestra producción de truchas.&rdquo;
            </p>
            <footer className='text-sm'>Sofia Mendoza</footer>
          </blockquote>
        </div>
      </div>
      <div className='lg:p-8'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col space-y-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>
              Bienvenido de nuevo
            </h1>
            <p className='text-sm text-muted-foreground'>
              Ingresa tus credenciales para acceder a tu cuenta
            </p>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
