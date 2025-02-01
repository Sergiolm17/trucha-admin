import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun']
const clients = [
  {
    name: 'Mercado Central',
    sales: [15000, 18000, 12000, 20000, 16000, 22000],
  },
  {
    name: 'Supermercado Wong',
    sales: [25000, 22000, 28000, 24000, 26000, 30000],
  },
  {
    name: 'Restaurante El Pez Dorado',
    sales: [8000, 10000, 9000, 12000, 11000, 13000],
  },
  {
    name: 'Distribuidora Norte',
    sales: [18000, 20000, 19000, 22000, 21000, 23000],
  },
]

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
  }).format(value)
}

export function ClientsHistory() {
  return (
    <div className='w-full overflow-auto'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='min-w-[200px]'>Cliente</TableHead>
            {months.map((month) => (
              <TableHead key={month} className='min-w-[100px] text-right'>
                {month}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.name}>
              <TableCell className='font-medium'>{client.name}</TableCell>
              {client.sales.map((sale, index) => (
                <TableCell key={index} className='text-right'>
                  {formatCurrency(sale)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
