import { HeatMapGrid } from 'react-grid-heatmap'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useDashboard } from '../context/dashboard-context'

export function CustomerConcentration() {
  const { data } = useDashboard()

  // Preparar datos para el heatmap
  const regions = data.sales.salesByRegion.map((r) => r.name)
  const metrics = ['Ventas', 'Clientes']

  const salesValues = data.sales.salesByRegion.map((r) => r.value)
  const maxSales = Math.max(...salesValues)
  const clientValues = data.sales.salesByRegion.map((r) => r.clientCount)
  const maxClients = Math.max(...clientValues)

  const data2D = [
    salesValues.map((value) => value / maxSales),
    clientValues.map((value) => value / maxClients),
  ]

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const getCellContent = (x: number, y: number, value: number) => {
    const region = regions[x]
    const regionData = data.sales.salesByRegion[x]
    const percentage = (value * 100).toFixed(0)
    const detail =
      y === 0
        ? formatCurrency(regionData.value)
        : `${regionData.clientCount} clientes`
    return `${region}: ${detail} (${percentage}%)`
  }

  return (
    <Card className='col-span-full lg:col-span-6'>
      <CardHeader>
        <CardTitle>Concentración de Clientes por Región</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='h-[400px] p-4'>
          <HeatMapGrid
            data={data2D}
            xLabels={regions}
            yLabels={metrics}
            cellHeight='120px'
            xLabelsStyle={() => ({
              fontSize: '12px',
              color: 'var(--muted-foreground)',
            })}
            yLabelsStyle={() => ({
              fontSize: '12px',
              color: 'var(--muted-foreground)',
            })}
            cellStyle={(x: number, y: number, ratio: number) => ({
              background: `rgb(37, 99, 235, ${ratio})`,
              fontSize: '12px',
              color: ratio > 0.5 ? '#fff' : '#000',
            })}
            cellRender={(x: number, y: number, value: number) => (
              <div
                className='h-full w-full p-2'
                title={getCellContent(x, y, value)}
              >
                {(value * 100).toFixed(0)}%
              </div>
            )}
          />
        </div>
      </CardContent>
    </Card>
  )
}
