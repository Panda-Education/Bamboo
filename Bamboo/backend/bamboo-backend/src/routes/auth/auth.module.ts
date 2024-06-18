import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LoginModule } from './login/login.module';

@Module({
  controllers: [AuthController],
  imports: [LoginModule]
})
export class AuthModule {}
