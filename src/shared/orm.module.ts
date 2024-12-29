import { User } from '@/db/entities'
import { Role } from '@/db/entities/Role'
import dbConfig from '@/mikro-orm.config'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Global, Module } from '@nestjs/common'

@Global()
@Module({
  imports: [
    MikroOrmModule.forRoot(dbConfig),
    MikroOrmModule.forFeature({
      entities: [Role, User],
    }),
  ],
  exports: [MikroOrmModule],
})
export class OrmModule {}
