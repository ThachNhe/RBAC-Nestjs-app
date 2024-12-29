import { Employee, Patient } from '@/db/entities'
import { Factory } from '@mikro-orm/seeder'
import { genId } from '@/shared/utils'
import { faker } from '@faker-js/faker'

export class EmployeeFactory extends Factory<Employee> {
  model = Employee

  definition(): Partial<Employee> {
    return {
      fullName: faker.person.fullName(),
      age: faker.number.int({ min: 25, max: 65 }),
      address: faker.location.streetAddress(),
      degree: faker.helpers.arrayElement(['MD', 'PhD', 'MS']),
      specialist: faker.helpers.arrayElement([
        'Cardiology',
        'Neurology',
        'Pediatrics',
      ]),
    }
  }
}
