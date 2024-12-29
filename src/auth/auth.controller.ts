import { Body, Controller, Post, UseInterceptors } from '@nestjs/common'

import { AuthService } from '@/auth/auth.service'
import { ApiOkResponseDto } from '@/shared/decorators'
import { AuditLogEnum } from '@/shared/enum'
import { ApiTags } from '@nestjs/swagger'
import { PinoLogger } from 'nestjs-pino'
import { AuthUser, CreateUserDto } from './auth.dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private logger: PinoLogger,
  ) {
    this.logger.setContext(AuthController.name)
  }

  @ApiOkResponseDto({
    data: AuthUser,
  })
  @Post('register')
  async register(@Body() body: CreateUserDto) {
    return await this.authService.register(body)
  }
}
