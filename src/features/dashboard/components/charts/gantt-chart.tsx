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
    name: 'Lote A',
    start: new Date('2024-01-01').getTime(),
    end: new Date('2024-02-15').getTime(),
    status: 'completado',
  },
  {
    name: 'Lote B',
    start: new Date('2024-01-15').getTime(),
    end: new Date('2024-03-01').getTime(),
    status: 'en_proceso',
  },
  {
    name: 'Lote C',
    start: new Date('2024-02-01').getTime(),
    end: new Date('2024-04-15').getTime(),
    status: 'retrasado',
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completado':
      return '#4ade80'
    case 'en_proceso':
      return '#60a5fa'
    case 'retrasado':
      return '#f87171'
    default:
      return '#94a3b8'
  }
}

export function GanttChart() {
  return (
    <div className='h-[400px] w-full'>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart
          data={data}
          layout='vertical'
          barSize={20}
          margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis
            type='number'
            domain={['dataMin', 'dataMax']}
            tickFormatter={(value) => new Date(value).toLocaleDateString()}
          />
          <YAxis type='category' dataKey='name' />
          <Tooltip
            labelFormatter={(value) =>
              `Fecha: ${new Date(value).toLocaleDateString()}`
            }
            formatter={(value: any, name: string) => [
              new Date(value).toLocaleDateString(),
              name === 'start' ? 'Inicio' : 'Fin',
            ]}
          />
          <Legend />
          <Bar
            dataKey='start'
            stackId='a'
            fill={getStatusColor(data[0].status)}
            name='Inicio'
          />
          <Bar
            dataKey='end'
            stackId='a'
            fill={getStatusColor(data[0].status)}
            name='Fin'
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
