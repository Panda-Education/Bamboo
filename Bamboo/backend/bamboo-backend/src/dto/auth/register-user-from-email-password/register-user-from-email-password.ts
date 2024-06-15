import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class RegisterUserFromEmailPassword {

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
