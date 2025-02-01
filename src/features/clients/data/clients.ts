import { faker } from '@faker-js/faker'

export const clients = Array.from({ length: 20 }, () => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  return {
    id: faker.string.uuid(),
    firstName,
    lastName,
    email: faker.internet.email({ firstName }).toLowerCase(),
    phoneNumber: faker.phone.number({ style: 'international' }),
    company: faker.company.name(),
    status: faker.helpers.arrayElement([
      'active',
      'inactive',
      'pending',
      'blocked',
    ]),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  }
}) 