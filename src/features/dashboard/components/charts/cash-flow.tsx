import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const data = [
  {
    name: 'Ene',
    ingresos: 120000,
    gastos: 90000,
  },
  {
    name: 'Feb',
    ingresos: 135000,
    gastos: 95000,
  },
  {
    name: 'Mar',
    ingresos: 150000,
    gastos: 100000,
  },
  {
    name: 'Abr',
    ingresos: 145000,
    gastos: 98000,
  },
  {
    name: 'May',
    ingresos: 160000,
    gastos: 105000,
  },
  {
    name: 'Jun',
    ingresos: 175000,
    gastos: 110000,
  },
  {
    name: 'Jul (Proy.)',
    ingresos: 180000,
    gastos: 112000,
  },
  {
    name: 'Ago (Proy.)',
    ingresos: 185000,
    gastos: 115000,
  },
]

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
  }).format(value)
}

export function CashFlow() {
  return (
    <div className='h-[400px] w-full'>
      <ResponsiveContainer width='100%' height='100%'>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis tickFormatter={(value) => formatCurrency(value)} />
          <Tooltip formatter={(value) => formatCurrency(value as number)} />
          <Legend />
          <Area
            type='monotone'
            dataKey='ingresos'
            stackId='1'
            stroke='#4ade80'
            fill='#4ade80'
            name='Ingresos Proyectados'
          />
          <Area
            type='monotone'
            dataKey='gastos'
            stackId='2'
            stroke='#f87171'
            fill='#f87171'
            name='Gastos Operativos'
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
