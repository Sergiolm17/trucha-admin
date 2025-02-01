import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const data = [
  {
    name: 'Mercado Central',
    '0-30': 25000,
    '31-60': 15000,
    '61-90': 8000,
    '90+': 5000,
  },
  {
    name: 'Supermercado Wong',
    '0-30': 35000,
    '31-60': 12000,
    '61-90': 6000,
    '90+': 3000,
  },
  {
    name: 'Rest. El Pez Dorado',
    '0-30': 18000,
    '31-60': 9000,
    '61-90': 4000,
    '90+': 2000,
  },
  {
    name: 'Distribuidora Norte',
    '0-30': 28000,
    '31-60': 14000,
    '61-90': 7000,
    '90+': 4000,
  },
]

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
  }).format(value)
}

export function DebtAging() {
  return (
    <div className='h-[400px] w-full'>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis tickFormatter={(value) => formatCurrency(value)} />
          <Tooltip formatter={(value) => formatCurrency(value as number)} />
          <Legend />
          <Bar dataKey='0-30' stackId='a' fill='#4ade80' name='0-30 días' />
          <Bar dataKey='31-60' stackId='a' fill='#facc15' name='31-60 días' />
          <Bar dataKey='61-90' stackId='a' fill='#f97316' name='61-90 días' />
          <Bar dataKey='90+' stackId='a' fill='#f87171' name='90+ días' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
