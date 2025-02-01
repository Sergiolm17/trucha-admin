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
  {
    name: 'Trucha Arcoiris',
    produccion: 5000,
    ventas: 4800,
    margen: 0.25,
  },
  {
    name: 'Trucha Salmón',
    produccion: 4200,
    ventas: 4000,
    margen: 0.3,
  },
  {
    name: 'Trucha Dorada',
    produccion: 3800,
    ventas: 3500,
    margen: 0.2,
  },
  {
    name: 'Trucha Ahumada',
    produccion: 2500,
    ventas: 2800,
    margen: 0.35,
  },
  {
    name: 'Trucha Fileteada',
    produccion: 3000,
    ventas: 2900,
    margen: 0.28,
  },
]

const formatNumber = (value: number) => {
  return new Intl.NumberFormat('es-PE').format(value)
}

const formatPercent = (value: number) => {
  return `${(value * 100).toFixed(1)}%`
}

export function ProductionVsSalesScatter() {
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
            dataKey='produccion'
            name='Producción'
            tickFormatter={formatNumber}
          />
          <YAxis
            type='number'
            dataKey='ventas'
            name='Ventas'
            tickFormatter={formatNumber}
          />
          <Tooltip
            formatter={(value: any, name: string) => {
              if (name === 'margen') return formatPercent(value)
              return formatNumber(value)
            }}
          />
          <Legend />
          <Scatter
            name='Productos'
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
