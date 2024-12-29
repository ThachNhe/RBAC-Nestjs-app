import {
  Entity,
  PrimaryKey,
  Property,
  Collection,
  ManyToMany,
} from '@mikro-orm/core'
import { ApiProperty } from '@nestjs/swagger'
import { genId } from '@/shared/utils'
import { Role } from '@/db/entities'

@Entity({ tableName: 'users' })
export class User {
  @PrimaryKey({ type: 'bigint' })
  @ApiProperty()
  id: string = genId()

  @Property({ unique: true })
  @ApiProperty()
  username: string

  @Property()
  @ApiProperty()
  password: string

  @ManyToMany(() => Role)
  roles = new Collection<Role>(this)

  @Property({ type: 'timestamp' })
  @ApiProperty()
  createdAt: Date = new Date()

  @Property({ type: 'timestamp', onUpdate: () => new Date() })
  @ApiProperty()
  updatedAt: Date = new Date()
}
