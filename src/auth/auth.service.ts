import { CreateUserDto } from '@/auth/auth.dto'
import { User } from '@/db/entities'
import { Role } from '@/db/entities/Role'
import { MailService } from '@/mail/mail.service'
import { RoleEnum } from '@/shared/enum'
import { genId } from '@/shared/utils'
import { EntityRepository, wrap } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityManager } from '@mikro-orm/postgresql'
import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import _ from 'lodash'
import { PinoLogger } from 'nestjs-pino'

const { CLIENT_APP_URL, SALT } = process.env

@Injectable()
export class AuthService {
  private readonly oneDay = 24 * 60 * 60 * 1000
  constructor(
    private logger: PinoLogger,
    private em: EntityManager,
    private jwtService: JwtService,
    private mailService: MailService,

    @InjectRepository(User) private userRepo: EntityRepository<User>,
    @InjectRepository(Role) private roleRepo: EntityRepository<Role>,
  ) {
    this.logger.setContext(AuthService.name)
  }

  public async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepo.findOne({
      email: username,
      deletedAt: null,
    })

    if (
      user &&
      bcrypt.compareSync(password, user.password) &&
      user.emailVerifiedAt &&
      !user.deletedAt
    ) {
      return wrap(user).toObject()
    }

    return null
  }

  public async register(body: CreateUserDto) {
    const user = await this.userRepo.findOne({ email: body.email })

    if (user) {
      throw new BadRequestException('User with that email already exists')
    }

    const role = await this.roleRepo.findOne({ name: RoleEnum.USER })

    if (!role) {
      throw new BadRequestException('Default role not found')
    }

    const newUser = this.userRepo.create({
      ...body,
      id: genId(),
      password: bcrypt.hashSync(body.password, Number(SALT)),
    })

    await this.em.persistAndFlush(newUser)

    return this.userToJson(newUser)
  }

  async userToJson(user: User) {
    const plainUser = (user as any).toJSON()
    return _.omit(plainUser, [
      'guardianDocs',
      'wills',
      'trusts',
      'guardianDocs',
      'playlist',
    ])
  }

  getAccessToken(
    userId: string,
    role: string,
    email: string,
    expiresIn: string | number = '30m',
  ) {
    return this.jwtService.sign(
      {
        sub: userId,
        role,
        email,
      },
      { expiresIn },
    )
  }
}
