import { Type } from 'class-transformer'
import { IsNotEmpty, IsString } from 'class-validator'

export class UserIdDto {
  @Type(() => String)
  @IsNotEmpty()
  @IsString()
  id: string
}
