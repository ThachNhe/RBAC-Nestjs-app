import { Patient, User } from '@/db/entities'
import { PatientFactory } from '../factories'
import { EntityManager } from '@mikro-orm/core'
import { Seeder } from '@mikro-orm/seeder'

export class PatientSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const patientUsers = await em.find(User, {
      roles: { name: 'PATIENT' },
    })

    for (const user of patientUsers) {
      const patient = new PatientFactory(em).make(10, {
        user, // Associate each patient with a user
      })
      em.persist(patient)
    }

    await em.flush() // Save all changes to database
  }
}
