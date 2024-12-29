import { Role } from '@/db/entities/Role'
import { UserFactory } from '@/db/factories'
import { RoleEnum } from '@/shared/enum'
import type { EntityManager } from '@mikro-orm/core'
import { Seeder } from '@mikro-orm/seeder'

export class UserSeeder extends Seeder {
  async run(em: EntityManager) {
    const adminRole = await em.findOne(Role, { name: RoleEnum.ADMIN })
    const userRole = await em.findOne(Role, { name: RoleEnum.USER })

    new UserFactory(em).make(1, {
      // email: 'admin@example.com',
      // role: adminRole,
    })
    new UserFactory(em).make(1, {
      // email: 'user@example.com',
      // role: userRole,
    })
    new UserFactory(em).make(10, {
      // role: userRole,
    })
  }
}
