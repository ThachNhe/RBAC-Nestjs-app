import { Patient } from '@/db/entities'
import { Factory } from '@mikro-orm/seeder'
import { genId } from '@/shared/utils'
import { faker } from '@faker-js/faker'
export class PatientFactory extends Factory<Patient> {
  model = Patient

  definition(): Partial<Patient> {
    return {
      id: genId(),
      fullName: faker.person.fullName(),
      age: faker.number.int({ min: 18, max: 90 }),
      address: faker.location.streetAddress(),
      phoneNumber: faker.phone.number(),
    }
  }
}
