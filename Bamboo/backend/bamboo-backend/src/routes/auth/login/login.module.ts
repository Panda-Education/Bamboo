/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { DbPrismaService } from 'src/services/db/db-prisma/db-prisma.service';
import { UserService } from 'src/services/user/user.service';
import { PasswordService } from 'src/services/password/password.service';
import { StudentService } from 'src/services/student/student.service';
import { TutorService } from 'src/services/tutor/tutor.service';

@Module({
  imports : [
    NestjsFormDataModule
  ],
  controllers: [LoginController],
  providers: [UserService, DbPrismaService, PasswordService, StudentService, TutorService]
})
export class LoginModule {}
