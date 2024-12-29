import {
  Entity,
  PrimaryKey,
  Property,
  Collection,
  ManyToMany,
} from '@mikro-orm/core'
import { ApiProperty } from '@nestjs/swagger'
import { Role } from '@/db/entities'

@Entity({ tableName: 'User' })
export class User {
  @PrimaryKey({ type: 'bigint' })
  @ApiProperty()
  id: number

  @Property({ unique: true })
  @ApiProperty()
  username: string

  @Property()
  @ApiProperty()
  password: string

  @ManyToMany(() => Role, 'users', {
    pivotTable: 'User_Role',
    owner: true,
  })
  roles = new Collection<Role>(this)

  @Property({ type: 'datetime' })
  @ApiProperty()
  createdAt: Date = new Date()

  @Property({ type: 'datetime', onUpdate: () => new Date() })
  @ApiProperty()
  updatedAt: Date = new Date()
}
