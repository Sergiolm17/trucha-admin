import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { useDashboard } from '../context/dashboard-context'

function MetricCard({
  title,
  value,
  comparison,
  trend,
  format = 'number',
}: {
  title: string
  value: number
  comparison: number
  trend: 'up' | 'down'
  format?: 'number' | 'currency' | 'percentage'
}) {
  const formatValue = (val: number) => {
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('es-PE', {
          style: 'currency',
          currency: 'PEN',
        }).format(val)
      case 'percentage':
        return `${val.toFixed(1)}%`
      default:
        return val.toLocaleString()
    }
  }

  const isPositive = trend === 'up'
  const Arrow = isPositive ? ArrowUpIcon : ArrowDownIcon
  const trendColor = isPositive ? 'text-green-500' : 'text-red-500'

  return (
    <Card className='p-6'>
      <h3 className='text-sm font-medium text-muted-foreground'>{title}</h3>
      <div className='mt-2 flex items-baseline'>
        <p className='text-2xl font-semibold'>{formatValue(value)}</p>
        <p
          className={cn(
            'ml-2 flex items-center text-sm font-medium',
            trendColor
          )}
        >
          <Arrow className='mr-1 h-4 w-4' />
          {comparison}%
        </p>
      </div>
    </Card>
  )
}

export function KeyMetricsScorecard() {
  const { data } = useDashboard()

  const salesGrowth = (
    ((data.sales.totalSales - data.sales.previousMonthSales) /
      data.sales.previousMonthSales) *
    100
  ).toFixed(1)

  const productionCapacityUsage = (
    (data.production.totalProduction / data.production.maxCapacity) *
    100
  ).toFixed(1)

  const overdueReceivablesPercentage = (
    (data.finance.receivables.overdue / data.finance.receivables.total) *
    100
  ).toFixed(1)

  const clientsGrowth = (
    ((data.sales.activeClients - data.sales.historicAverageClients) /
      data.sales.historicAverageClients) *
    100
  ).toFixed(1)

  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
      <MetricCard
        title='Ventas del Mes'
        value={data.sales.totalSales}
        comparison={Number(salesGrowth)}
        trend={Number(salesGrowth) >= 0 ? 'up' : 'down'}
        format='currency'
      />
      <MetricCard
        title='Producción vs Capacidad'
        value={Number(productionCapacityUsage)}
        comparison={Number(productionCapacityUsage) - 75} // Comparamos con un objetivo del 75%
        trend={Number(productionCapacityUsage) >= 75 ? 'up' : 'down'}
        format='percentage'
      />
      <MetricCard
        title='Cuentas por Cobrar Vencidas'
        value={data.finance.receivables.overdue}
        comparison={Number(overdueReceivablesPercentage)}
        trend={Number(overdueReceivablesPercentage) <= 20 ? 'up' : 'down'}
        format='currency'
      />
      <MetricCard
        title='Clientes Activos'
        value={data.sales.activeClients}
        comparison={Number(clientsGrowth)}
        trend={Number(clientsGrowth) >= 0 ? 'up' : 'down'}
        format='number'
      />
    </div>
  )
}
