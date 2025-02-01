import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'

const alerts = [
  {
    title: 'Producción Retrasada',
    description: 'Lote C tiene un retraso de 7 días',
    status: 'error',
  },
  {
    title: 'Cliente Moroso',
    description: 'Mercado Central tiene 60% de deuda pendiente',
    status: 'warning',
  },
  {
    title: 'Stock Bajo',
    description: 'Trucha Salmón al 15% de capacidad',
    status: 'warning',
  },
  {
    title: 'Operación Normal',
    description: 'Todos los demás indicadores en rango normal',
    status: 'success',
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'error':
      return 'bg-red-500'
    case 'warning':
      return 'bg-yellow-500'
    case 'success':
      return 'bg-green-500'
    default:
      return 'bg-gray-500'
  }
}

export function RealTimeAlerts() {
  return (
    <div className='space-y-4'>
      {alerts.map((alert, index) => (
        <Alert key={index}>
          <div className='flex items-center space-x-2'>
            <Badge className={getStatusColor(alert.status)} variant='outline'>
              <span className='h-2 w-2 rounded-full bg-white' />
            </Badge>
            <div>
              <AlertTitle>{alert.title}</AlertTitle>
              <AlertDescription>{alert.description}</AlertDescription>
            </div>
          </div>
        </Alert>
      ))}
    </div>
  )
}
