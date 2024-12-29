import { CreateUserDto } from '@/auth/auth.dto'
import { User } from '@/db/entities'
import { Role } from '@/db/entities/Role'
import { RoleEnum } from '@/shared/enum'
import { genId } from '@/shared/utils'
import { EntityRepository, wrap } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import _ from 'lodash'
import { PinoLogger } from 'nestjs-pino'

const { CLIENT_APP_URL, SALT } = process.env

@Injectable()
export class AuthService {
  private readonly oneDay = 24 * 60 * 60 * 1000
  constructor() {}
}
