import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useDashboard } from '../context/dashboard-context'

export function SalesVsProductionTrend() {
  const { data } = useDashboard()

  // Combinar datos de ventas y producción por mes
  const chartData = data.sales.salesByMonth.map((month, index) => ({
    name: month.month,
    ventas: month.amount,
    produccion: data.production.productionByMonth[index].quantity,
  }))

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <Card className='col-span-full'>
      <CardHeader>
        <CardTitle>Tendencia de Ventas vs Producción</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='h-[400px]'>
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis tickFormatter={formatCurrency} />
              <Tooltip
                formatter={(value: number) => [formatCurrency(value)]}
                labelStyle={{ color: 'black' }}
              />
              <Legend />
              <Line
                type='monotone'
                dataKey='ventas'
                stroke='#2563eb'
                strokeWidth={2}
                name='Ventas'
                dot={false}
              />
              <Line
                type='monotone'
                dataKey='produccion'
                stroke='#16a34a'
                strokeWidth={2}
                name='Producción'
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
