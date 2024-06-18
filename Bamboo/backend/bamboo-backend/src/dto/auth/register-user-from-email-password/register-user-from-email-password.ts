import { IsEmail, isNotEmpty, IsNotEmpty, IsString, Matches } from 'class-validator';
import { Expose } from 'class-transformer';

export class RegisterUserFromEmailPassword {

  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z\s]+$/)
  @Expose()
  readonly firstName: string

  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z\s]+$/)
  @Expose()
  readonly lastName: string

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Expose()
  readonly email: string

  @IsNotEmpty()
  @IsString()
  @Expose()
  readonly password: string

}
