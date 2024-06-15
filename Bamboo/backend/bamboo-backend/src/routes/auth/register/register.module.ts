import { Module } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { UserService } from '../../../services/user/user.service';
import { DbPrismaService } from '../../../services/db/db-prisma/db-prisma.service';
import { PasswordService } from '../../../services/password/password.service';

@Module({
  imports: [
    NestjsFormDataModule
  ],
  controllers: [RegisterController],
  providers: [UserService, DbPrismaService, PasswordService]
})
export class RegisterModule {}
