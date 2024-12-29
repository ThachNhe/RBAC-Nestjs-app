import { Role, User } from '@/db/entities'
import { UserFactory } from '../factories'
import { EntityManager } from '@mikro-orm/core'
import { Seeder } from '@mikro-orm/seeder'

export class UserSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const doctorRole = await em.findOne(Role, { name: 'DOCTOR' })
    const patientRole = await em.findOne(Role, { name: 'PATIENT' })
    const receptionistRole = await em.findOne(Role, { name: 'RECEPTIONIST' })

    // Create users with roles
    const createUserWithRole = async (roleEntity: Role, count: number = 1) => {
      return new UserFactory(em)
        .each((user) => {
          user.roles.add(roleEntity)
        })
        .create(count)
    }

    await createUserWithRole(doctorRole, 5) // 5 doctors
    await createUserWithRole(patientRole, 20) // 20 patients
    await createUserWithRole(receptionistRole, 2) // 2 receptionists
  }
}
