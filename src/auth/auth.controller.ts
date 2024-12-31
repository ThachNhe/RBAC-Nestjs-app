import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common'

import { LocalAuthGuard } from '@/auth/auth.guard'
import { AuthService } from '@/auth/auth.service'
import { ApiOkResponseDto } from '@/shared/decorators'
import { ApiTags } from '@nestjs/swagger'
import { FastifyReply } from 'fastify'
import { PinoLogger } from 'nestjs-pino'
import { AuthLocalDto, AuthRequest, AuthUser } from './auth.dto'

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
  @UseGuards(LocalAuthGuard)
  @Post('local')
  async login(
    @Req() req: AuthRequest,
    @Body() _body: AuthLocalDto,
    @Res({ passthrough: true }) res: FastifyReply,
  ) {
    return this.authService.getAuthUser(req.user, res)
  }
}
