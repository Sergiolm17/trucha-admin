import { Row } from '@tanstack/react-table'
import { IconPlus, IconFileSpreadsheet } from '@tabler/icons-react'
import * as XLSX from 'xlsx'
import { Button } from '@/components/ui/button'
import { useSale } from '../context/sales-context'
import { Sale } from '../data/schema'

export function SalePrimaryButtons() {
  const { setOpen, table } = useSale()

  const handleDownloadReport = () => {
    if (!table) return

    // Obtener los datos filtrados y ordenados
    const rows = table.getFilteredRowModel().rows

    // Transformar los datos para el Excel
    const data = rows.map((row: Row<Sale>) => {
      const rowData = row.original
      return {
        Cliente: rowData.client,
        Fecha: new Date(rowData.date).toLocaleDateString(),
        Sede: rowData.location,
        Total: `S/. ${rowData.total.toFixed(2)}`,
        Estado: rowData.status,
        Mortalidad: rowData.mortality ? 'Sí' : 'No',
      }
    })

    // Crear el libro de Excel
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(data)
    XLSX.utils.book_append_sheet(wb, ws, 'Ventas')

    // Descargar el archivo
    XLSX.writeFile(
      wb,
      `reporte-ventas-${new Date().toISOString().split('T')[0]}.xlsx`
    )
  }

  return (
    <div className='flex items-center space-x-2'>
      <Button onClick={() => setOpen('add')}>
        <IconPlus className='mr-2 h-4 w-4' />
        Nueva Venta
      </Button>
      <Button variant='outline' onClick={handleDownloadReport}>
        <IconFileSpreadsheet className='mr-2 h-4 w-4' />
      </Button>
    </div>
  )
}
