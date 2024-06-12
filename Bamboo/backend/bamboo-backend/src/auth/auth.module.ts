import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { RegisterModule } from './register/register.module';

@Module({
  imports: [RegisterModule],
  controllers: [AuthController]
})
export class AuthModule {}
