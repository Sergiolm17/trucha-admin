import { HeatMapGrid } from 'react-grid-heatmap'
import { ResponsiveContainer } from 'recharts'

const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun']
const data = [
  [100, 80, 70, 65, 60, 55], // Cohorte Ene
  [100, 85, 75, 70, 65, 0], // Cohorte Feb
  [100, 82, 72, 68, 0, 0], // Cohorte Mar
  [100, 78, 68, 0, 0, 0], // Cohorte Abr
  [100, 75, 0, 0, 0, 0], // Cohorte May
  [100, 0, 0, 0, 0, 0], // Cohorte Jun
]

const getColor = (value: number) => {
  if (value === 0) return '#f1f5f9'
  if (value >= 90) return '#4ade80'
  if (value >= 80) return '#86efac'
  if (value >= 70) return '#fde047'
  if (value >= 60) return '#fdba74'
  return '#f87171'
}

export function RetentionCohort() {
  return (
    <div className='h-[300px] w-full'>
      <ResponsiveContainer width='100%' height='100%'>
        <HeatMapGrid
          data={data}
          xLabels={months}
          yLabels={months.map((m) => `Cohorte ${m}`)}
          cellHeight='40px'
          cellRender={(_x: number, _y: number, value: number) => (
            <div title={`${value}% retención`}>
              {value > 0 ? `${value}%` : ''}
            </div>
          )}
          cellStyle={(_x: number, _y: number, value: number) => ({
            background: getColor(value),
            fontSize: '11px',
            color: value >= 80 ? 'black' : 'white',
          })}
          xLabelsStyle={() => ({
            fontSize: '12px',
            textTransform: 'uppercase',
          })}
          yLabelsStyle={() => ({
            fontSize: '12px',
            textTransform: 'uppercase',
            width: '120px',
          })}
        />
      </ResponsiveContainer>
    </div>
  )
}
