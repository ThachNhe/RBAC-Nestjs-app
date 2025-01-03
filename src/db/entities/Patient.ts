import {
  Entity,
  PrimaryKey,
  Property,
  Collection,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from '@mikro-orm/core'
import { ApiProperty } from '@nestjs/swagger'
import { genId } from '@/shared/utils'
import { PatientRecord, User } from '@/db/entities'

@Entity({ tableName: 'Patient' })
export class Patient {
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
  phoneNumber: string

  @ManyToOne(() => User, { nullable: true, fieldName: 'user_id' })
  user: User

  @Property({ type: 'datetime' })
  @ApiProperty()
  createdAt: Date = new Date()

  @Property({ type: 'datetime', onUpdate: () => new Date(), nullable: true })
  @ApiProperty()
  updatedAt: Date = new Date()

  @OneToMany(() => PatientRecord, (record) => record.patient)
  medical_records!: Collection<PatientRecord>
}
