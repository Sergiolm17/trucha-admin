import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { GanttChart } from './charts/gantt-chart'
import { HeatmapDelays } from './charts/heatmap-delays'
import { ProductionVsSales } from './charts/production-vs-sales'
import { ProductionSalesRatio } from './production-sales-ratio'
import { ProductionVsSalesBySize } from './production-vs-sales-by-size'

export function ProductionDashboard() {
  return (
    <div className='grid gap-8 md:grid-cols-2'>
      <ProductionSalesRatio />
      <ProductionVsSalesBySize />
    </div>
  )
}
