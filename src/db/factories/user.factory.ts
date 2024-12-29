import { User } from '@/db/entities'
import { genId } from '@/shared/utils'
import { faker } from '@faker-js/faker'
import { Factory } from '@mikro-orm/seeder'

export class UserFactory extends Factory<User> {
  model = User

  definition(): Partial<User> {
    return {
      id: genId(),
      username: faker.internet.userName(),
      password: faker.internet.password(),
    }
  }
}
