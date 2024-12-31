import { PatientRecord, User } from '@/db/entities'
import { genId } from '@/shared/utils'
import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core'
import { ApiProperty } from '@nestjs/swagger'

@Entity({ tableName: 'Employee' })
export class Employee {
  @PrimaryKey({ type: 'bigint' })
  @ApiProperty()
  id: number

  @Property()
  @ApiProperty()
  fullName: string

  @Property()
  @ApiProperty()
  age: number

  @Property()
  @ApiProperty()
  address: string

  @Property()
  @ApiProperty()
  degree: string

  @Property()
  @ApiProperty()
  specialist: string

  @ManyToOne(() => User, { nullable: true })
  user!: User

  @Property({ type: 'datetime' })
  @ApiProperty()
  createdAt: Date = new Date()

  @Property({ type: 'datetime', onUpdate: () => new Date() })
  @ApiProperty()
  updatedAt: Date = new Date()

  @OneToMany(() => PatientRecord, (record) => record.doctor)
  patient_records!: Collection<PatientRecord>
}
