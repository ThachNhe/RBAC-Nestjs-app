import { User } from '@/db/entities'
import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: EntityRepository<User>,
  ) {}
}
