import {
  Entity,
  PrimaryKey,
  Property,
  Collection,
  ManyToMany,
} from '@mikro-orm/core'
import { ApiProperty } from '@nestjs/swagger'
import { genId } from '@/shared/utils'
import { User } from '@/db/entities/User'

@Entity({ tableName: 'Role' })
export class Role {
  @PrimaryKey({ type: 'bigint' })
  @ApiProperty()
  id: number

  @Property()
  @ApiProperty()
  name: string

  @ManyToMany(() => User, (user) => user.roles, { nullable: true })
  users = new Collection<User>(this)

  @Property({ type: 'datetime' })
  @ApiProperty()
  createdAt: Date = new Date()

  @Property({ type: 'datetime', onUpdate: () => new Date() })
  @ApiProperty()
  updatedAt: Date = new Date()
}
