import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useDashboard } from '../context/dashboard-context'

const COLORS = {
  paid: '#16a34a',
  overdue: '#dc2626',
  pending: '#f59e0b',
}

export function AccountsReceivableStatus() {
  const { data } = useDashboard()

  const { status } = data.finance.receivables
  const chartData = [
    { name: 'Pagado', value: status.paid },
    { name: 'Vencido', value: status.overdue },
    { name: 'Pendiente', value: status.pending },
  ]

  const formatPercentage = (value: number) => `${value}%`

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className='rounded-lg bg-white p-2 shadow-md'>
          <p className='text-sm font-medium'>{`${payload[0].name}: ${payload[0].value}%`}</p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className='col-span-full lg:col-span-6'>
      <CardHeader>
        <CardTitle>Estado de Cuentas por Cobrar</CardTitle>
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
                label={({ value }) => formatPercentage(value)}
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
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className='mt-4 flex justify-center gap-4'>
          {chartData.map((entry, index) => (
            <div key={`legend-${index}`} className='flex items-center gap-2'>
              <div
                className='h-3 w-3 rounded-full'
                style={{
                  backgroundColor:
                    COLORS[entry.name.toLowerCase() as keyof typeof COLORS],
                }}
              />
              <span className='text-sm text-muted-foreground'>
                {entry.name}: {entry.value}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
