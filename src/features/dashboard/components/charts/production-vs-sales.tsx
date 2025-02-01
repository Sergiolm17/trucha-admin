import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const data = [
  {
    name: 'Ene',
    produccion: 4000,
    ventas: 3800,
  },
  {
    name: 'Feb',
    produccion: 4500,
    ventas: 4200,
  },
  {
    name: 'Mar',
    produccion: 5000,
    ventas: 4800,
  },
  {
    name: 'Abr',
    produccion: 4800,
    ventas: 5200,
  },
  {
    name: 'May',
    produccion: 5500,
    ventas: 5100,
  },
  {
    name: 'Jun',
    produccion: 5200,
    ventas: 5400,
  },
]

export function ProductionVsSales() {
  return (
    <div className='h-[300px] w-full'>
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type='monotone'
            dataKey='produccion'
            stroke='#60a5fa'
            strokeWidth={2}
            name='Producción'
          />
          <Line
            type='monotone'
            dataKey='ventas'
            stroke='#f87171'
            strokeWidth={2}
            name='Ventas'
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
