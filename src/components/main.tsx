import { cn } from '@/lib/utils'

interface MainProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

export function Main({ children, className, ...props }: MainProps) {
  return (
    <main className={cn('container flex-1 py-6', className)} {...props}>
      {children}
    </main>
  )
}
