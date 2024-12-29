import { Role } from '@/db/entities'
import { genId } from '@/shared/utils'
import { EntityManager } from '@mikro-orm/core'
import { Seeder } from '@mikro-orm/seeder'

export class RoleSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const roles = ['DOCTOR', 'PATIENT', 'RECEPTIONIST']

    for (const roleName of roles) {
      const role = em.create(Role, {
        id: genId(),
        name: roleName,
      })
      em.persist(role)
    }
  }
}
