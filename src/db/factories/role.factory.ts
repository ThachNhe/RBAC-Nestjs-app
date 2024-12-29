import { Role } from '@/db/entities'
import { genId } from '@/shared/utils'
import { Factory } from '@mikro-orm/seeder'
import { faker } from '@faker-js/faker'

export class RoleFactory extends Factory<Role> {
  model = Role

  definition(): Partial<Role> {
    return {
      id: genId(),
      name: faker.helpers.arrayElement(['DOCTOR', 'PATIENT', 'RECEPTIONIST']),
    }
  }
}
