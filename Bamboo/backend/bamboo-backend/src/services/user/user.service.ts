import { Injectable } from '@nestjs/common';
import {
  RegisterUserFromEmailPassword
} from '../../dto/auth/register-user-from-email-password/register-user-from-email-password';
import { DbPrismaService } from '../db/db-prisma/db-prisma.service';
import { PasswordService } from '../password/password.service';

@Injectable()
export class UserService {

  constructor(
    private prismaService: DbPrismaService,
    private passwordService: PasswordService
  ) {
  }

  async createUser(userEmail:string, userPassword:string){

    const password = await this.passwordService.hashPassword(userPassword)

    const newUser = await this.prismaService.prisma.user.create({
      data: {
        email: userEmail,
        password: password
      }
    })

    console.log(newUser)

  }

}
