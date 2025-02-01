import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CashFlow } from './charts/cash-flow'
import { DebtAging } from './charts/debt-aging'

export function FinanceDashboard() {
  return (
    <div className='grid gap-4'>
      {/* Análisis de Antigüedad de Deudas */}
      <Card>
        <CardHeader>
          <CardTitle>Antigüedad de Deudas</CardTitle>
        </CardHeader>
        <CardContent>
          <DebtAging />
        </CardContent>
      </Card>

      {/* Pronóstico de Flujo de Caja */}
      <Card>
        <CardHeader>
          <CardTitle>Pronóstico de Flujo de Caja</CardTitle>
        </CardHeader>
        <CardContent>
          <CashFlow />
        </CardContent>
      </Card>
    </div>
  )
}
