import { User } from '@/db/entities'
import { EntityManager } from '@mikro-orm/core'
import { Seeder } from '@mikro-orm/seeder'
import { EmployeeFactory } from '../factories'

export class EmployeeSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    // Get all doctor users
    const doctorUsers = await em.find(User, {
      roles: { name: 'DOCTOR' },
    })

    // Create employee records for doctors
    await Promise.all(
      doctorUsers.map(async (user) => {
        return new EmployeeFactory(em).create(10, { user })
      }),
    )

    // Get all receptionist users
    const receptionistUsers = await em.find(User, {
      roles: { name: 'RECEPTIONIST' },
    })

    // Create employee records for receptionists
    await Promise.all(
      receptionistUsers.map(async (user) => {
        return new EmployeeFactory(em).create(10, { user })
      }),
    )
  }
}
