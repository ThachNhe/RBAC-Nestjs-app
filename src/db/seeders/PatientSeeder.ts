import { User } from '@/db/entities'
import { EntityManager } from '@mikro-orm/core'
import { Seeder } from '@mikro-orm/seeder'
import { PatientFactory } from '../factories'

export class PatientSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const patientUsers = await em.find(
      User,
      { roles: { name: 'PATIENT' } },
      { populate: ['roles'] },
    )

    for (const user of patientUsers) {
      const patient = new PatientFactory(em).make(1, {
        user, // Associate each patient with a user
      })
      em.persist(patient)
    }

    await em.flush() // Save all changes to database
  }
}
