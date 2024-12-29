import { Role } from '@/db/entities'
import type { EntityManager } from '@mikro-orm/core'
import { Seeder } from '@mikro-orm/seeder'
import { RoleEnum } from '@/shared/enum'

export class RoleSeeder extends Seeder {
  async run(em: EntityManager) {
    const adminRole = em.create(Role, { name: RoleEnum.ADMIN })
    const userRole = em.create(Role, { name: RoleEnum.USER })
    await em.persistAndFlush([adminRole, userRole])
  }
}
