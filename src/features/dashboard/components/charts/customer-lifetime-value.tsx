import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

const data = [
  { name: 'Mercado Central', frecuencia: 24, clv: 280000, promedio: 12000 },
  { name: 'Supermercado Wong', frecuencia: 48, clv: 520000, promedio: 15000 },
  { name: 'Rest. El Pez Dorado', frecuencia: 12, clv: 150000, promedio: 8000 },
  { name: 'Distribuidora Norte', frecuencia: 36, clv: 420000, promedio: 14000 },
  { name: 'Pescadería Mar Azul', frecuencia: 18, clv: 220000, promedio: 10000 },
  {
    name: 'Rest. La Trucha Feliz',
    frecuencia: 15,
    clv: 180000,
    promedio: 9000,
  },
]

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
  }).format(value)
}

export function CustomerLifetimeValue() {
  return (
    <div className='h-[400px] w-full'>
      <ResponsiveContainer width='100%' height='100%'>
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis
            type='number'
            dataKey='frecuencia'
            name='Frecuencia'
            unit=' compras/año'
          />
          <YAxis
            type='number'
            dataKey='clv'
            name='CLV'
            tickFormatter={formatCurrency}
          />
          <Tooltip
            formatter={(value: any, name: string) => {
              if (name === 'clv') return formatCurrency(value)
              if (name === 'frecuencia') return `${value} compras/año`
              return value
            }}
          />
          <Legend />
          <Scatter
            name='Clientes'
            data={data}
            fill='#60a5fa'
            shape='circle'
            legendType='circle'
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}
