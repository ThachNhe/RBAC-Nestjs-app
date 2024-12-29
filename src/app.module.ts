import { LoggerModule } from 'nestjs-pino'
import { loggerConfig } from '@/app.config'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { OrmModule } from '@/shared/orm.module'
import { TerminusModule } from '@nestjs/terminus'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { MailModule } from './mail/mail.module'
import { UserModule } from './user/user.module'
import { RedisModule } from '@nestjs-modules/ioredis'
import { RolesGuard } from '@/auth/roles.guard'

const { REDIS_HOST, REDIS_PORT } = process.env

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule.forRoot(loggerConfig),
    RedisModule.forRoot({
      type: 'single',
      url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
    }),
    TerminusModule,
    AuthModule,
    OrmModule,
    MailModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, RolesGuard],
})
export class AppModule {}
