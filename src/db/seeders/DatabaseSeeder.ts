import { EntityManager } from '@mikro-orm/core'
import { Seeder } from '@mikro-orm/seeder'
import { RoleSeeder } from './RoleSeeder'
import { UserSeeder } from './UserSeeder'
import { PatientSeeder } from '@/db/seeders/PatientSeeder'
import { EmployeeSeeder } from '@/db/seeders/EmployeeSeeder'

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    await this.call(em, [RoleSeeder, UserSeeder, PatientSeeder, EmployeeSeeder])
  }
}
