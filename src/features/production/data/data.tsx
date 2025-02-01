import { faker } from '@faker-js/faker'
import { Production, sizes } from './schema'

const locations = ['Sede A', 'Sede B', 'Sede C']

export function generateProduction(): Production {
  return {
    id: faker.string.uuid(),
    date: faker.date.recent(),
    location: faker.helpers.arrayElement(locations),
    details: [
      {
        id: faker.string.uuid(),
        size: '600gr',
        quantity: 20,
        error_margin: faker.number.int({ min: 0, max: 5 }),
      },
      {
        id: faker.string.uuid(),
        size: '3x kg',
        quantity: 200,
        error_margin: faker.number.int({ min: 0, max: 10 }),
      },
      {
        id: faker.string.uuid(),
        size: '4x kg',
        quantity: 80,
        error_margin: faker.number.int({ min: 0, max: 8 }),
      },
      {
        id: faker.string.uuid(),
        size: '5x kg',
        quantity: 20,
        error_margin: faker.number.int({ min: 0, max: 5 }),
      },
    ],
    created_at: faker.date.recent(),
  }
}

export const productions = Array.from({ length: 10 }, generateProduction)

export { sizes, locations }
