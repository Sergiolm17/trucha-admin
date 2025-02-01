import { faker } from '@faker-js/faker'
import { Sale } from './schema'

const sizes = ['S', 'M', 'L', 'XL', 'XXL'] as const
const locations = ['Sede A', 'Sede B', 'Sede C'] as const
const statuses = ['Pendiente', 'Completado', 'Cancelado'] as const
const clients = [
  'Mercado Central',
  'Distribuidora Marina',
  'Restaurante El Pescador',
  'Marisquería El Puerto',
  'Pescados y Mariscos S.A.',
  'Comercial Pesquera',
  'Mercado Mayorista',
  'Distribuidora del Norte',
]

const getPriceBySize = (size: string) => {
  const basePrice =
    size === 'S'
      ? 8
      : size === 'M'
        ? 12
        : size === 'L'
          ? 15
          : size === 'XL'
            ? 20
            : 25
  // Añadir una pequeña variación al precio base
  return basePrice + faker.number.int({ min: 0, max: 3 })
}

export function generateSale(): Sale {
  const numDetails = faker.number.int({ min: 2, max: 4 })
  const details = Array.from({ length: numDetails }, () => {
    const size = faker.helpers.arrayElement(sizes)
    return {
      id: faker.string.uuid(),
      size,
      quantity: faker.number.int({ min: 100, max: 500 }),
      price: getPriceBySize(size),
    }
  })

  const total = details.reduce(
    (acc, detail) => acc + detail.quantity * detail.price,
    0
  )

  const date = faker.date.between({
    from: '2024-01-01',
    to: '2024-02-01',
  })

  return {
    id: faker.string.uuid(),
    client: faker.helpers.arrayElement(clients),
    date,
    location: faker.helpers.arrayElement(locations),
    total,
    status: faker.helpers.arrayElement(statuses),
    mortality: faker.datatype.boolean(),
    details,
    created_at: date,
  }
}

export const sales = Array.from({ length: 10 }, generateSale)

export { sizes, locations, statuses, clients }
