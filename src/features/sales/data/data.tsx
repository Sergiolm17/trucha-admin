import { faker } from '@faker-js/faker'
import { Sale } from './schema'

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const locations = ['Sede A', 'Sede B', 'Sede C']
const statuses = ['Pendiente', 'Completado', 'Cancelado'] as const
const clients = [
  'Cliente A',
  'Cliente B',
  'Cliente C',
  'Cliente D',
  'Cliente E',
]

export function generateSale(): Sale {
  const details = Array.from(
    { length: faker.number.int({ min: 1, max: 4 }) },
    () => ({
      id: faker.string.uuid(),
      size: faker.helpers.arrayElement(sizes),
      quantity: faker.number.int({ min: 10, max: 1000 }),
      price: faker.number.int({ min: 5, max: 50 }),
    })
  )

  const total = details.reduce(
    (acc, detail) => acc + detail.quantity * detail.price,
    0
  )

  return {
    id: faker.string.uuid(),
    client: faker.helpers.arrayElement(clients),
    date: faker.date.recent(),
    location: faker.helpers.arrayElement(locations),
    total,
    status: faker.helpers.arrayElement(statuses),
    mortality: faker.datatype.boolean(),
    details,
    created_at: faker.date.recent(),
  }
}

export const sales = Array.from({ length: 10 }, generateSale)

export { sizes, locations, statuses, clients }
