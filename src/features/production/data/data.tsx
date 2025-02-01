import { faker } from '@faker-js/faker'
import { Production } from './schema'

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const locations = ['Sede A', 'Sede B', 'Sede C']

export function generateProduction(): Production {
  return {
    id: faker.string.uuid(),
    date: faker.date.recent(),
    location: faker.helpers.arrayElement(locations),
    details: Array.from(
      { length: faker.number.int({ min: 1, max: 4 }) },
      () => ({
        id: faker.string.uuid(),
        size: faker.helpers.arrayElement(sizes),
        quantity: faker.number.int({ min: 10, max: 1000 }),
        error_margin: faker.number.int({ min: 0, max: 50 }),
      })
    ),
    created_at: faker.date.recent(),
  }
}

export const productions = Array.from({ length: 10 }, generateProduction)

export { sizes, locations }
