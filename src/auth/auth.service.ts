import { User } from '@/db/entities'
import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { ForbiddenException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { FastifyReply } from 'fastify'

const { CLIENT_APP_URL, SALT } = process.env

@Injectable()
export class AuthService {
  private readonly oneDay = 24 * 60 * 60 * 1000
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepo: EntityRepository<User>,
  ) {}

  async getAuthUser(user: User, res: FastifyReply) {
    const accessToken = this.getAccessToken(user.id, 'DOCTOR', '1d')

    return { ...user, accessToken }
  }

  public async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepo.findOne({
      username,
      password,
    })

    if (!user) {
      throw new ForbiddenException('Invalid username or password')
    }

    return null
  }

  getAccessToken(
    userId: number,
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
