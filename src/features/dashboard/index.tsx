import { DownloadIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { AccountsReceivableStatus } from './components/accounts-receivable-status'
import { CustomerConcentration } from './components/customer-concentration'
import { CustomersDashboard } from './components/customers-dashboard'
import { FinanceDashboard } from './components/finance-dashboard'
import { KeyMetricsScorecard } from './components/key-metrics-scorecard'
import { ProductionDashboard } from './components/production-dashboard'
import { ProductionVsSalesBySize } from './components/production-vs-sales-by-size'
import { RisksDashboard } from './components/risks-dashboard'
import { SalesDashboard } from './components/sales-dashboard'
import { SalesVsProductionTrend } from './components/sales-vs-production-trend'
import { DashboardProvider, useDashboard } from './context/dashboard-context'

const topNav = [
  {
    title: 'Dashboard',
    href: '/',
    isActive: true,
    disabled: false,
  },
  {
    title: 'Producción',
    href: '/production',
    isActive: false,
    disabled: false,
  },
  {
    title: 'Ventas',
    href: '/sales',
    isActive: false,
    disabled: false,
  },
  {
    title: 'Finanzas',
    href: '/finance',
    isActive: false,
    disabled: false,
  },
  {
    title: 'Clientes',
    href: '/customers',
    isActive: false,
    disabled: false,
  },
]

function DashboardContent() {
  const { data } = useDashboard()

  const handleDownloadReport = () => {
    const now = new Date()
    const formattedDate = now.toLocaleDateString('es-PE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })

    const reportContent = `
REPORTE DE DASHBOARD - ${formattedDate}

PRODUCCIÓN
- Lotes Activos: ${data.production.activeLots}
- Producción Total: ${data.production.totalProduction} kg
- Capacidad Utilizada: ${((data.production.totalProduction / data.production.maxCapacity) * 100).toFixed(1)}%
- Retraso Promedio: ${data.production.averageDelay} días

VENTAS
- Ventas Totales: S/ ${data.sales.totalSales.toLocaleString()}
- Crecimiento: ${data.sales.salesGrowth}%
- Clientes Activos: ${data.sales.activeClients}

FINANZAS
- Ingresos Mensuales: S/ ${data.finance.monthlyIncome.toLocaleString()}
- Gastos Operativos: S/ ${data.finance.operatingExpenses.toLocaleString()}
- Cuentas por Cobrar: S/ ${data.finance.receivables.total.toLocaleString()}
- Vencidas: S/ ${data.finance.receivables.overdue.toLocaleString()}

CLIENTES
- Retención Promedio: ${data.customers.averageRetention}%
- CLV Promedio: S/ ${data.customers.averageClv.toLocaleString()}
- Frecuencia de Compra: ${data.customers.purchaseFrequency} veces/mes

RIESGOS
- Alertas Activas: ${data.risks.activeAlerts}
- Nivel de Riesgo: ${data.risks.riskLevel}
- Acciones Pendientes: ${data.risks.pendingActions}
`

    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `reporte-dashboard-${formattedDate}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        <TopNav links={topNav} />
        <div className='ml-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      {/* ===== Main ===== */}
      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>Dashboard</h1>
          <div className='flex items-center space-x-2'>
            <Button onClick={handleDownloadReport}>
              <DownloadIcon className='mr-2 h-4 w-4' />
              Descargar Reporte
            </Button>
          </div>
        </div>

        <Tabs defaultValue='overview' className='space-y-4'>
          <div className='w-full overflow-x-auto pb-2'>
            <TabsList>
              <TabsTrigger value='overview'>General</TabsTrigger>
              <TabsTrigger value='production'>Producción</TabsTrigger>
              <TabsTrigger value='sales'>Ventas</TabsTrigger>
              <TabsTrigger value='finance'>Finanzas</TabsTrigger>
              <TabsTrigger value='customers'>Clientes</TabsTrigger>
              <TabsTrigger value='risks'>Riesgos</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value='overview' className='space-y-4'>
            <KeyMetricsScorecard />
            <div className='grid gap-8 md:grid-cols-2'>
              <SalesVsProductionTrend />
              <ProductionVsSalesBySize />
              <AccountsReceivableStatus />
              <CustomerConcentration />
            </div>
          </TabsContent>

          <TabsContent value='production' className='space-y-4'>
            <ProductionDashboard />
          </TabsContent>

          <TabsContent value='sales' className='space-y-4'>
            <SalesDashboard />
          </TabsContent>

          <TabsContent value='finance' className='space-y-4'>
            <FinanceDashboard />
          </TabsContent>

          <TabsContent value='customers' className='space-y-4'>
            <CustomersDashboard />
          </TabsContent>

          <TabsContent value='risks' className='space-y-4'>
            <RisksDashboard />
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}

export function Dashboard() {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  )
}
