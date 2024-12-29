import { User } from '@/db/entities'
import { genId } from '@/shared/utils'
import { faker } from '@faker-js/faker'
import { Factory } from '@mikro-orm/seeder'
import * as bcrypt from 'bcrypt'

const { SALT } = process.env

export class UserFactory extends Factory<User> {
  model = User

  definition(): Partial<User> {
    return {
      id: genId(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number(),
      password: bcrypt.hashSync('Pass@123', 10),
      firstName: faker.person.firstName(),
      pin: bcrypt.hashSync('1234', 10),
      lastName: faker.person.lastName(),
      biography: faker.lorem.paragraph(),
      dateOfBirth: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
      emailVerifiedAt: faker.date.recent(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  }
}
