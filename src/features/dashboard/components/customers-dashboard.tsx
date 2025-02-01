import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CustomerLifetimeValue } from './charts/customer-lifetime-value'
import { RetentionCohort } from './charts/retention-cohort'

export function CustomersDashboard() {
  return (
    <div className='grid gap-4'>
      {/* Análisis de Cohortes de Retención */}
      <Card>
        <CardHeader>
          <CardTitle>Análisis de Cohortes de Retención</CardTitle>
        </CardHeader>
        <CardContent>
          <RetentionCohort />
        </CardContent>
      </Card>

      {/* CLV vs Frecuencia de Compra */}
      <Card>
        <CardHeader>
          <CardTitle>CLV vs Frecuencia de Compra</CardTitle>
        </CardHeader>
        <CardContent>
          <CustomerLifetimeValue />
        </CardContent>
      </Card>
    </div>
  )
}
