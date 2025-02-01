import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useDashboard } from '../context/dashboard-context'

const COLORS = {
  sold: '#16a34a',
  available: '#2563eb',
}

export function ProductionSalesRatio() {
  const { data } = useDashboard()

  // Calcular totales por tamaño
  const totals = data.production.productionBySize.reduce(
    (acc, item) => {
      acc.totalProduction += item.production
      acc.totalSales += item.sales
      return acc
    },
    { totalProduction: 0, totalSales: 0 }
  )

  const available = totals.totalProduction - totals.totalSales
  const soldPercentage = (
    (totals.totalSales / totals.totalProduction) *
    100
  ).toFixed(1)

  const chartData = [
    { name: 'Vendido', value: totals.totalSales },
    { name: 'Disponible', value: available },
  ]

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('es-PE').format(value) + ' kg'
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className='rounded-lg bg-white p-2 shadow-md'>
          <p className='text-sm font-medium'>
            {`${payload[0].name}: ${formatNumber(payload[0].value)}`}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className='col-span-full lg:col-span-6'>
      <CardHeader>
        <CardTitle>Producción vs Ventas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='h-[400px]'>
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart>
              <Pie
                data={chartData}
                cx='50%'
                cy='50%'
                innerRadius={80}
                outerRadius={120}
                paddingAngle={2}
                dataKey='value'
                label={({ value }) => formatNumber(value)}
                labelLine={false}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      COLORS[entry.name.toLowerCase() as keyof typeof COLORS]
                    }
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className='mt-4 text-center'>
          <p className='text-lg font-medium'>
            Porcentaje Vendido: {soldPercentage}%
          </p>
          <p className='text-sm text-muted-foreground'>
            Total Producido: {formatNumber(totals.totalProduction)}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
