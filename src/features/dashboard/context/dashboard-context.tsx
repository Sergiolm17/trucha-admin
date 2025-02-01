import { createContext, useContext, useState } from 'react'

interface DashboardData {
  production: {
    activeLots: number
    averageDelay: number
    totalProduction: number
    maxCapacity: number
    productionByMonth: Array<{
      month: string
      quantity: number
      capacity: number
    }>
    productionBySize: Array<{
      size: string
      production: number
      sales: number
    }>
    lotsStatus: {
      onTime: number
      delayed: number
      atRisk: number
    }
    lots: Array<{
      name: string
      status: string
      start: number
      end: number
    }>
  }
  sales: {
    totalSales: number
    previousMonthSales: number
    salesGrowth: number
    activeClients: number
    historicAverageClients: number
    salesByMonth: Array<{
      month: string
      amount: number
    }>
    salesByRegion: Array<{
      name: string
      value: number
      clientCount: number
    }>
    topClients: Array<{
      name: string
      totalAmount: number
      purchaseFrequency: number
      averageDelay: number
    }>
  }
  finance: {
    monthlyIncome: number
    operatingExpenses: number
    receivables: {
      total: number
      overdue: number
      percentageOfSales: number
      status: {
        paid: number
        overdue: number
        pending: number
      }
    }
    cashFlow: Array<{
      month: string
      ingresos: number
      gastos: number
    }>
    topDebtors: Array<{
      name: string
      amount: number
      daysOverdue: number
    }>
  }
  customers: {
    averageRetention: number
    averageClv: number
    purchaseFrequency: number
    clientHistory: Array<{
      name: string
      sales: number[]
      profitability: number
      riskScore: number
      purchaseFrequency: number
    }>
  }
  risks: {
    activeAlerts: number
    riskLevel: string
    pendingActions: number
    alerts: Array<{
      title: string
      description: string
      status: string
    }>
  }
}

const initialData: DashboardData = {
  production: {
    activeLots: 3,
    averageDelay: 2.5,
    totalProduction: 15000,
    maxCapacity: 20000,
    productionByMonth: [
      { month: 'Ene', quantity: 12000, capacity: 20000 },
      { month: 'Feb', quantity: 13500, capacity: 20000 },
      { month: 'Mar', quantity: 15000, capacity: 20000 },
      { month: 'Abr', quantity: 14500, capacity: 20000 },
      { month: 'May', quantity: 16000, capacity: 20000 },
      { month: 'Jun', quantity: 15500, capacity: 20000 },
    ],
    productionBySize: [
      { size: 'Pequeño', production: 5000, sales: 4800 },
      { size: 'Mediano', production: 7000, sales: 6800 },
      { size: 'Grande', production: 3000, sales: 2900 },
    ],
    lotsStatus: {
      onTime: 70,
      delayed: 20,
      atRisk: 10,
    },
    lots: [
      {
        name: 'Lote A',
        status: 'completado',
        start: new Date('2024-01-01').getTime(),
        end: new Date('2024-02-15').getTime(),
      },
      {
        name: 'Lote B',
        status: 'en_proceso',
        start: new Date('2024-01-15').getTime(),
        end: new Date('2024-03-01').getTime(),
      },
      {
        name: 'Lote C',
        status: 'retrasado',
        start: new Date('2024-02-01').getTime(),
        end: new Date('2024-04-15').getTime(),
      },
    ],
  },
  sales: {
    totalSales: 450000,
    previousMonthSales: 420000,
    salesGrowth: 7.14,
    activeClients: 25,
    historicAverageClients: 22,
    salesByMonth: [
      { month: 'Ene', amount: 380000 },
      { month: 'Feb', amount: 420000 },
      { month: 'Mar', amount: 480000 },
      { month: 'Abr', amount: 520000 },
      { month: 'May', amount: 510000 },
      { month: 'Jun', amount: 540000 },
    ],
    salesByRegion: [
      { name: 'Lima', value: 150000, clientCount: 8 },
      { name: 'Arequipa', value: 80000, clientCount: 5 },
      { name: 'Trujillo', value: 60000, clientCount: 4 },
      { name: 'Cusco', value: 45000, clientCount: 3 },
      { name: 'Chiclayo', value: 35000, clientCount: 2 },
    ],
    topClients: [
      {
        name: 'Mercado Central',
        totalAmount: 150000,
        purchaseFrequency: 12,
        averageDelay: 5,
      },
      {
        name: 'Supermercado Wong',
        totalAmount: 120000,
        purchaseFrequency: 8,
        averageDelay: 2,
      },
      {
        name: 'Rest. El Pez Dorado',
        totalAmount: 80000,
        purchaseFrequency: 4,
        averageDelay: 8,
      },
    ],
  },
  finance: {
    monthlyIncome: 175000,
    operatingExpenses: 110000,
    receivables: {
      total: 53000,
      overdue: 15000,
      percentageOfSales: 11.8,
      status: {
        paid: 65,
        overdue: 15,
        pending: 20,
      },
    },
    cashFlow: [
      { month: 'Ene', ingresos: 120000, gastos: 90000 },
      { month: 'Feb', ingresos: 135000, gastos: 95000 },
      { month: 'Mar', ingresos: 150000, gastos: 100000 },
      { month: 'Abr', ingresos: 145000, gastos: 98000 },
      { month: 'May', ingresos: 160000, gastos: 105000 },
      { month: 'Jun', ingresos: 175000, gastos: 110000 },
    ],
    topDebtors: [
      { name: 'Mercado Central', amount: 25000, daysOverdue: 15 },
      { name: 'Rest. El Pez Dorado', amount: 15000, daysOverdue: 30 },
      { name: 'Distribuidora Norte', amount: 10000, daysOverdue: 8 },
    ],
  },
  customers: {
    averageRetention: 85,
    averageClv: 280000,
    purchaseFrequency: 2.5,
    clientHistory: [
      {
        name: 'Mercado Central',
        sales: [15000, 18000, 12000, 20000, 16000, 22000],
        profitability: 0.25,
        riskScore: 0.15,
        purchaseFrequency: 12,
      },
      {
        name: 'Supermercado Wong',
        sales: [25000, 22000, 28000, 24000, 26000, 30000],
        profitability: 0.3,
        riskScore: 0.1,
        purchaseFrequency: 8,
      },
    ],
  },
  risks: {
    activeAlerts: 3,
    riskLevel: 'Moderado',
    pendingActions: 2,
    alerts: [
      {
        title: 'Producción Retrasada',
        description: 'Lote C tiene un retraso de 7 días',
        status: 'error',
      },
      {
        title: 'Cliente Moroso',
        description: 'Mercado Central tiene 60% de deuda pendiente',
        status: 'warning',
      },
      {
        title: 'Stock Bajo',
        description: 'Trucha Salmón al 15% de capacidad',
        status: 'warning',
      },
    ],
  },
}

const DashboardContext = createContext<{
  data: DashboardData
  updateData: (newData: Partial<DashboardData>) => void
}>({
  data: initialData,
  updateData: () => {},
})

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<DashboardData>(initialData)

  const updateData = (newData: Partial<DashboardData>) => {
    setData((prev) => ({ ...prev, ...newData }))
  }

  return (
    <DashboardContext.Provider value={{ data, updateData }}>
      {children}
    </DashboardContext.Provider>
  )
}

export const useDashboard = () => useContext(DashboardContext)
