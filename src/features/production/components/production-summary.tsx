import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Production } from '../data/schema'

interface Props {
  data: Production[]
}

interface SizeGroup {
  name: string
  total: number
}

export function ProductionSummary({ data }: Props) {
  // Calcular totales por grupo
  const calculateTotals = () => {
    const comercial: SizeGroup = { name: 'Comercial', total: 0 }
    const grande: SizeGroup = { name: 'Grande', total: 0 }

    data.forEach((production) => {
      production.details.forEach((detail) => {
        // Asumimos que tallas menores a 4x son comerciales
        if (['600gr', '3x kg'].includes(detail.size)) {
          comercial.total += detail.quantity
        } else {
          grande.total += detail.quantity
        }
      })
    })

    return [comercial, grande]
  }

  const groups = calculateTotals()
  const total = groups.reduce((acc, group) => acc + group.total, 0)

  return (
    <div className='space-y-4'>
      {/* Detalles por talla */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {data.flatMap((production) =>
          production.details.map((detail) => (
            <Card key={detail.id}>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  {detail.size}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{detail.quantity} kg</div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Resumen por grupo */}
      <Card>
        <CardHeader>
          <CardTitle>Resumen de Producción</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-2'>
            {groups.map((group) => (
              <div key={group.name} className='flex justify-between'>
                <span>{group.name}</span>
                <span>{group.total} kg</span>
              </div>
            ))}
            <div className='mt-2 border-t pt-2'>
              <div className='flex justify-between font-bold'>
                <span>Total</span>
                <span>{total} kg</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
