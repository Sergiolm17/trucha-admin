import { IconDownload } from '@tabler/icons-react'
import html2canvas from 'html2canvas'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Sale } from '../data/schema'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: Sale
}

export function SaleViewDialog({ open, onOpenChange, currentRow }: Props) {
  if (!currentRow) return null

  // Calcular totales por categoría
  const calculateCategorySummary = () => {
    const summary = {
      comercial: { quantity: 0, total: 0 },
      grande: { quantity: 0, total: 0 },
    }

    currentRow.details.forEach((detail) => {
      const size = detail.size.toLowerCase()
      const quantity = detail.quantity
      const price = detail.price
      const subtotal = quantity * price

      if (size === 's' || size === 'm' || size === 'l') {
        summary.comercial.quantity += quantity
        summary.comercial.total += subtotal
      } else if (size === 'xl' || size === 'xxl') {
        summary.grande.quantity += quantity
        summary.grande.total += subtotal
      }
    })

    return summary
  }

  const summary = calculateCategorySummary()
  const totalGeneral = currentRow.details.reduce((acc, detail) => {
    return acc + detail.quantity * detail.price
  }, 0)

  const handleDownload = async () => {
    const content = document.getElementById('sale-details-content')
    if (!content) return

    try {
      // Crear un contenedor temporal para la captura
      const tempContainer = document.createElement('div')
      tempContainer.style.position = 'absolute'
      tempContainer.style.left = '-9999px'
      tempContainer.style.top = '-9999px'
      tempContainer.style.width = '400px' // Ancho fijo para el recibo
      tempContainer.style.backgroundColor = '#ffffff'
      tempContainer.style.padding = '20px'
      tempContainer.innerHTML = content.innerHTML
      document.body.appendChild(tempContainer)

      // Asegurarnos que todos los elementos dentro tengan el ancho correcto
      const cards = tempContainer.querySelectorAll('.card')
      cards.forEach((card) => {
        ;(card as HTMLElement).style.width = '100%'
      })

      const canvas = await html2canvas(tempContainer, {
        logging: false,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 400, // Ancho fijo que coincide con el contenedor
        height: tempContainer.scrollHeight + 40, // Altura del contenido + padding
        scale: 2, // Mayor calidad de imagen
      })

      // Eliminar el contenedor temporal
      document.body.removeChild(tempContainer)

      const image = canvas.toDataURL('image/png', 1.0)
      const link = document.createElement('a')
      link.href = image
      link.download = `venta-${currentRow.id}-${new Date().toISOString().split('T')[0]}.png`
      link.click()
    } catch (error) {
      console.error('Error al generar la imagen:', error)
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <div className='flex h-full flex-col'>
          <SheetHeader className='text-left'>
            <SheetTitle>Detalles de la Venta</SheetTitle>
            <SheetDescription>
              Información detallada de la venta seleccionada
            </SheetDescription>
          </SheetHeader>

          <div className='flex-1 overflow-y-auto'>
            <div id='sale-details-content' className='space-y-4 px-2 py-4'>
              <Card className='shadow-none'>
                <CardHeader className='px-4 pb-2'>
                  <CardTitle className='text-base'>
                    Información General
                  </CardTitle>
                </CardHeader>
                <CardContent className='px-4'>
                  <div className='grid grid-cols-2 gap-3'>
                    <div>
                      <p className='text-sm font-medium text-muted-foreground'>
                        Cliente
                      </p>
                      <p className='text-sm'>{currentRow.client}</p>
                    </div>
                    <div>
                      <p className='text-sm font-medium text-muted-foreground'>
                        Fecha
                      </p>
                      <p className='text-sm'>
                        {new Date(currentRow.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className='text-sm font-medium text-muted-foreground'>
                        Sede
                      </p>
                      <p className='text-sm'>{currentRow.location}</p>
                    </div>
                    <div>
                      <p className='text-sm font-medium text-muted-foreground'>
                        Estado
                      </p>
                      <p className='text-sm'>{currentRow.status}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className='shadow-none'>
                <CardHeader className='px-4 pb-2'>
                  <CardTitle className='text-base'>Detalles</CardTitle>
                </CardHeader>
                <CardContent className='px-4'>
                  <div>
                    <div className='mb-2 grid grid-cols-3 gap-4 text-sm font-medium text-muted-foreground'>
                      <div>Talla</div>
                      <div>Cantidad</div>
                      <div>Precio</div>
                    </div>
                    <div className='space-y-1'>
                      {currentRow.details.map((detail) => (
                        <div
                          key={detail.id}
                          className='grid grid-cols-3 gap-4 text-sm'
                        >
                          <div>{detail.size}</div>
                          <div>{detail.quantity} kg</div>
                          <div>S/. {detail.price.toFixed(2)}</div>
                        </div>
                      ))}
                    </div>
                    <div className='mt-3 border-t pt-2 text-sm font-medium'>
                      <div className='grid grid-cols-3 gap-4'>
                        <div className='col-span-2'>Total:</div>
                        <div>S/. {totalGeneral.toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className='shadow-none'>
                <CardHeader className='px-4 pb-2'>
                  <CardTitle className='text-base'>
                    Resumen por Categoría
                  </CardTitle>
                </CardHeader>
                <CardContent className='px-4'>
                  <div>
                    <div className='mb-2 grid grid-cols-3 gap-4 text-sm font-medium text-muted-foreground'>
                      <div>Categoría</div>
                      <div>Cantidad</div>
                      <div>Total</div>
                    </div>
                    <div className='space-y-1'>
                      <div className='grid grid-cols-3 gap-4 text-sm'>
                        <div>Comercial</div>
                        <div>{summary.comercial.quantity} kg</div>
                        <div>S/. {summary.comercial.total.toFixed(2)}</div>
                      </div>
                      <div className='grid grid-cols-3 gap-4 text-sm'>
                        <div>Grande</div>
                        <div>{summary.grande.quantity} kg</div>
                        <div>S/. {summary.grande.total.toFixed(2)}</div>
                      </div>
                    </div>
                    <div className='mt-3 border-t pt-2 text-sm font-medium'>
                      <div className='grid grid-cols-3 gap-4'>
                        <div className='col-span-2'>Total General:</div>
                        <div>S/. {totalGeneral.toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className='mt-4 space-y-2 border-t px-4 pt-4'>
            <Button
              onClick={handleDownload}
              className='w-full'
              variant='secondary'
            >
              <IconDownload className='mr-2 h-4 w-4' />
              Descargar como imagen
            </Button>
            <SheetClose asChild>
              <Button className='w-full' variant='outline'>
                Cerrar
              </Button>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
