import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Production } from '../data/schema'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: Production
}

interface CategorySummary {
  name: string
  total: number
}

export function ProductionViewDialog({
  open,
  onOpenChange,
  currentRow,
}: Props) {
  if (!currentRow) return null

  // Calcular resumen por categoría
  const calculateCategorySummary = (): CategorySummary[] => {
    const categories = {
      Comercial: ['600gr', '3x kg'],
      Grande: ['4x kg', '5x kg'],
    }

    return Object.entries(categories).map(([category, sizes]) => {
      const total = currentRow.details
        .filter((detail) => sizes.includes(detail.size))
        .reduce((sum, detail) => sum + detail.quantity, 0)

      return { name: category, total }
    })
  }

  const categorySummary = calculateCategorySummary()
  const totalProduction = categorySummary.reduce(
    (sum, cat) => sum + cat.total,
    0
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detalles de Producción</DialogTitle>
        </DialogHeader>

        <div className='space-y-6'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <p className='text-sm font-medium text-muted-foreground'>Fecha</p>
              <p>{currentRow.date.toLocaleDateString()}</p>
            </div>
            <div>
              <p className='text-sm font-medium text-muted-foreground'>Sede</p>
              <p>{currentRow.location}</p>
            </div>
          </div>

          <div>
            <p className='mb-2 text-sm font-medium text-muted-foreground'>
              Detalles
            </p>
            <Card>
              <CardContent className='pt-6'>
                {/* Encabezados */}
                <div className='mb-4 grid grid-cols-3 gap-4 border-b pb-2'>
                  <p className='text-sm font-medium text-muted-foreground'>
                    Talla
                  </p>
                  <p className='text-sm font-medium text-muted-foreground'>
                    Cantidad
                  </p>
                  <p className='text-sm font-medium text-muted-foreground'>
                    Margen de Error
                  </p>
                </div>
                {/* Detalles */}
                <div className='space-y-4'>
                  {currentRow.details.map((detail) => (
                    <div key={detail.id} className='grid grid-cols-3 gap-4'>
                      <p>{detail.size}</p>
                      <p>{detail.quantity} kg</p>
                      <p>{detail.error_margin}%</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resumen por Categoría */}
          <div>
            <p className='mb-2 text-sm font-medium text-muted-foreground'>
              Resumen por Categoría
            </p>
            <Card>
              <CardContent className='pt-6'>
                <div className='space-y-4'>
                  {categorySummary.map((category) => (
                    <div key={category.name} className='flex justify-between'>
                      <p className='text-sm font-medium'>{category.name}</p>
                      <p>{category.total} kg</p>
                    </div>
                  ))}
                  <div className='flex justify-between border-t pt-4 font-medium'>
                    <p>Total</p>
                    <p>{totalProduction} kg</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
