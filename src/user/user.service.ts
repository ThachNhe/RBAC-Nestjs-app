import { User } from '@/db/entities'
import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityManager } from '@mikro-orm/postgresql'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UserService {
  constructor(
    private em: EntityManager,
    @InjectRepository(User) private userRepo: EntityRepository<User>,
  ) {}
}
