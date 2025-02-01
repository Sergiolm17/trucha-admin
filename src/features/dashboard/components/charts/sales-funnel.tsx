import {
  ResponsiveContainer,
  FunnelChart,
  Funnel,
  LabelList,
  Tooltip,
} from 'recharts'

const data = [
  {
    name: 'Producción',
    value: 100,
    fill: '#60a5fa',
  },
  {
    name: 'Ventas Generadas',
    value: 80,
    fill: '#4ade80',
  },
  {
    name: 'Ventas Pagadas',
    value: 65,
    fill: '#f87171',
  },
]

export function SalesFunnel() {
  return (
    <div className='h-[400px] w-full'>
      <ResponsiveContainer width='100%' height='100%'>
        <FunnelChart>
          <Tooltip />
          <Funnel data={data} dataKey='value' nameKey='name' labelLine={false}>
            <LabelList
              position='right'
              fill='#1e293b'
              stroke='none'
              dataKey='name'
            />
            <LabelList
              position='right'
              fill='#1e293b'
              stroke='none'
              dataKey='value'
              formatter={(value: number) => `${value}%`}
            />
          </Funnel>
        </FunnelChart>
      </ResponsiveContainer>
    </div>
  )
}
