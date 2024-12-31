import { Entity, Property, ManyToOne, PrimaryKey } from '@mikro-orm/core'
import { Patient } from './Patient'
import { Employee } from './Employee'

@Entity()
export class PatientRecord {
  @PrimaryKey()
  id!: number

  @Property()
  diagnosis!: string

  @Property()
  treatment!: string

  @Property()
  prescription!: string

  @Property()
  createdAt: Date = new Date()

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date()

  @ManyToOne(() => Patient, { fieldName: 'patient_id' })
  patient!: Patient

  @ManyToOne(() => Employee, { fieldName: 'doctor_id' })
  doctor!: Employee
}
