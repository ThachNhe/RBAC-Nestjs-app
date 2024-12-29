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

@Entity({ tableName: 'roles' })
export class Role {
  @PrimaryKey({ type: 'bigint' })
  @ApiProperty()
  id: string = genId()

  @Property()
  @ApiProperty()
  name: string

  @ManyToMany(() => User, (user) => user.roles)
  users = new Collection<User>(this)

  @Property({ type: 'timestamp' })
  @ApiProperty()
  createdAt: Date = new Date()

  @Property({ type: 'timestamp', onUpdate: () => new Date() })
  @ApiProperty()
  updatedAt: Date = new Date()
}
