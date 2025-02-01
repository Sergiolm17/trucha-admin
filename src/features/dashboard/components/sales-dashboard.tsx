import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ClientsHistory } from './charts/clients-history'
import { SalesFunnel } from './charts/sales-funnel'
import { SalesMap } from './charts/sales-map'

export function SalesDashboard() {
  return (
    <div className='grid gap-4'>
      {/* Mapa Geográfico de Ventas */}
      <Card>
        <CardHeader>
          <CardTitle>Distribución Geográfica de Ventas</CardTitle>
        </CardHeader>
        <CardContent>
          <SalesMap />
        </CardContent>
      </Card>

      {/* Tabla Dinámica de Historial de Clientes */}
      <Card>
        <CardHeader>
          <CardTitle>Historial de Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <ClientsHistory />
        </CardContent>
      </Card>

      {/* Embudo de Conversión de Ventas */}
      <Card>
        <CardHeader>
          <CardTitle>Embudo de Conversión</CardTitle>
        </CardHeader>
        <CardContent>
          <SalesFunnel />
        </CardContent>
      </Card>
    </div>
  )
}
