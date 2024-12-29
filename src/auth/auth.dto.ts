import { FastifyRequest } from 'fastify'

import { User } from '@/db/entities'
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator'

export interface AuthRequest extends FastifyRequest {
  user: User
}

export class CreateUserDto {
  @ApiProperty()
  @Type(() => String)
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty()
  @Type(() => String)
  @MinLength(8)
  @IsNotEmpty()
  password: string

  @ApiProperty()
  @Type(() => String)
  @IsNotEmpty()
  firstName: string

  @ApiProperty()
  @Type(() => String)
  @IsNotEmpty()
  lastName: string
}

export class AuthLocalDto {
  @ApiProperty({ example: 'admin@example.com' })
  @Type(() => String)
  @IsEmail()
  @IsNotEmpty()
  username: string

  @ApiProperty({ example: 'Pass@123' })
  @Type(() => String)
  @MinLength(8)
  @IsNotEmpty()
  password: string
}

export class PasswordResetRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string
}

export class PasswordResetDto {
  @ApiProperty()
  @Type(() => String)
  @MinLength(8)
  @IsNotEmpty()
  newPassword: string
}

export class ChangePasswordDto extends PasswordResetDto {
  @ApiProperty()
  @Type(() => String)
  @IsNotEmpty()
  oldPassword: string
}

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['email'] as const),
) {}

export class AuthUser extends OmitType(User, ['password'] as const) {
  @ApiProperty()
  public accessToken: string
}

export class PinDto {
  @ApiProperty()
  @IsString()
  @Length(4, 6)
  pin: string
}
