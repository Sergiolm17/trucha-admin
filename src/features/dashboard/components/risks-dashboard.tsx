import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ProductionVsSalesScatter } from './charts/production-vs-sales-scatter'
import { RealTimeAlerts } from './charts/real-time-alerts'

export function RisksDashboard() {
  return (
    <div className='grid gap-4'>
      {/* Semáforo de Alertas en Tiempo Real */}
      <Card>
        <CardHeader>
          <CardTitle>Alertas en Tiempo Real</CardTitle>
        </CardHeader>
        <CardContent>
          <RealTimeAlerts />
        </CardContent>
      </Card>

      {/* Producción vs Ventas por Producto */}
      <Card>
        <CardHeader>
          <CardTitle>Producción vs Ventas por Producto</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductionVsSalesScatter />
        </CardContent>
      </Card>
    </div>
  )
}
