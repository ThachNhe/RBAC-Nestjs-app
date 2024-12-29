import { MedicalRecord, User } from '@/db/entities'
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

@Entity({ tableName: 'employees' })
export class Employee {
  @PrimaryKey({ type: 'bigint' })
  @ApiProperty()
  id: string = genId()

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

  @ManyToOne(() => User)
  user!: User

  @OneToMany(() => MedicalRecord, (record) => record.doctor)
  medicalRecords = new Collection<MedicalRecord>(this)

  @Property({ type: 'timestamp' })
  @ApiProperty()
  createdAt: Date = new Date()

  @Property({ type: 'timestamp', onUpdate: () => new Date() })
  @ApiProperty()
  updatedAt: Date = new Date()
}
