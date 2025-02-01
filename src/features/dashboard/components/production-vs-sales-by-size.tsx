import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useDashboard } from '../context/dashboard-context'

export function ProductionVsSalesBySize() {
  const { data } = useDashboard()

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('es-PE', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <Card className='col-span-full lg:col-span-6'>
      <CardHeader>
        <CardTitle>Producción vs Ventas por Tamaño</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='h-[400px]'>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart data={data.production.productionBySize}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='size' />
              <YAxis tickFormatter={formatNumber} />
              <Tooltip
                formatter={(value: number) => [formatNumber(value)]}
                labelStyle={{ color: 'black' }}
              />
              <Legend />
              <Bar
                dataKey='production'
                name='Producción'
                fill='#16a34a'
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey='sales'
                name='Ventas'
                fill='#2563eb'
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
