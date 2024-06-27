/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LoginModule } from './login/login.module';
import { GoogleModule } from './google/google.module';
import { VerifyModule } from './verify/verify.module';

@Module({
  controllers: [AuthController],
  imports: [LoginModule,GoogleModule, VerifyModule],
  providers: [],
})
export class AuthModule { }
