import {
  Entity,
  PrimaryKey,
  Property,
  Collection,
  ManyToMany,
  ManyToOne,
} from '@mikro-orm/core'
import { ApiProperty } from '@nestjs/swagger'
import { genId } from '@/shared/utils'
import { Employee, Patient } from '@/db/entities'
@Entity({ tableName: 'medical_records' })
export class MedicalRecord {
  @PrimaryKey({ type: 'bigint' })
  @ApiProperty()
  id: string = genId()

  @ManyToOne(() => Patient)
  patient: Patient

  @ManyToOne(() => Employee)
  doctor: Employee

  @Property({ type: 'text' })
  @ApiProperty()
  diagnosis: string

  @Property({ type: 'text' })
  @ApiProperty()
  treatment: string

  @Property({ type: 'timestamp' })
  @ApiProperty()
  createdAt: Date = new Date()

  @Property({ type: 'timestamp', onUpdate: () => new Date() })
  @ApiProperty()
  updatedAt: Date = new Date()
}
