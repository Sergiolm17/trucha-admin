import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps'
import { ResponsiveContainer } from 'recharts'

const geoUrl =
  'https://raw.githubusercontent.com/deldersveld/topojson/master/countries/peru/peru-departments.json'

const markers: Array<{
  name: string
  coordinates: [number, number]
  value: number
}> = [
  { name: 'Lima', coordinates: [-77.0428, -12.0464], value: 150000 },
  { name: 'Arequipa', coordinates: [-71.5375, -16.409], value: 80000 },
  { name: 'Trujillo', coordinates: [-79.03, -8.1116], value: 60000 },
  { name: 'Cusco', coordinates: [-71.9675, -13.5319], value: 45000 },
  { name: 'Chiclayo', coordinates: [-79.8408, -6.7711], value: 35000 },
]

export function SalesMap() {
  return (
    <div className='h-[500px] w-full'>
      <ResponsiveContainer width='100%' height='100%'>
        <ComposableMap
          projection='geoMercator'
          projectionConfig={{
            scale: 2500,
            center: [-75, -10],
          }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill='#e2e8f0'
                  stroke='#94a3b8'
                  style={{
                    default: { outline: 'none' },
                    hover: { fill: '#cbd5e1', outline: 'none' },
                    pressed: { outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>
          {markers.map(({ name, coordinates, value }) => (
            <Marker key={name} coordinates={coordinates}>
              <circle
                r={Math.sqrt(value) / 50}
                fill='#60a5fa'
                stroke='#3b82f6'
                strokeWidth={2}
                style={{
                  opacity: 0.8,
                }}
              />
              <text
                textAnchor='middle'
                y={-10}
                style={{
                  fontFamily: 'system-ui',
                  fontSize: '10px',
                  fill: '#1e293b',
                }}
              >
                {name}
              </text>
            </Marker>
          ))}
        </ComposableMap>
      </ResponsiveContainer>
    </div>
  )
}
