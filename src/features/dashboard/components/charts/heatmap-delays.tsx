import { HeatMapGrid } from 'react-grid-heatmap'
import { ResponsiveContainer } from 'recharts'

const xLabels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun']
const yLabels = ['Trucha Arcoiris', 'Trucha Salmón', 'Trucha Dorada']

const data = [
  [0, 3, 1, 4, 2, 1],
  [2, 1, 4, 3, 1, 2],
  [1, 2, 3, 0, 4, 2],
]

const getColor = (value: number) => {
  const colors = ['#dcfce7', '#86efac', '#4ade80', '#22c55e', '#f87171']
  return colors[value] || colors[0]
}

export function HeatmapDelays() {
  return (
    <div className='h-[300px] w-full'>
      <ResponsiveContainer width='100%' height='100%'>
        <HeatMapGrid
          data={data}
          xLabels={xLabels}
          yLabels={yLabels}
          cellHeight='40px'
          cellRender={(_x: number, _y: number, value: number) => (
            <div title={`${value} días de retraso`}>{value}</div>
          )}
          cellStyle={(_x: number, _y: number, value: number) => ({
            background: getColor(value),
            fontSize: '11px',
            color: value > 2 ? 'white' : 'black',
          })}
          xLabelsStyle={() => ({
            fontSize: '12px',
            textTransform: 'uppercase',
          })}
          yLabelsStyle={() => ({
            fontSize: '12px',
            textTransform: 'uppercase',
            width: '150px',
          })}
        />
      </ResponsiveContainer>
    </div>
  )
}
