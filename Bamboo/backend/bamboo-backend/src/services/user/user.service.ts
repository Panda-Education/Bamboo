/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import {
  RegisterUserFromEmailPassword
} from '../../dto/auth/register-user-from-email-password/register-user-from-email-password';
import { DbPrismaService } from '../db/db-prisma/db-prisma.service';
import { PasswordService } from '../password/password.service';
import { oAuthUserObject } from '../../routes/auth/google/oAuthType';

@Injectable()
export class UserService {

  constructor(
    private prismaService: DbPrismaService,
    private passwordService: PasswordService
  ) {
  }

  async createUser(
    userFirstName:string,
    userLastName:string,
    userEmail:string,
    userPassword:string,
  ){

    const password = await this.passwordService.hashPassword(userPassword)

    const newUser = await this.prismaService.prisma.user.create({
      data: {
        firstName: userFirstName,
        lastName: userLastName,
        email: userEmail,
        password: password
      }
    })

    console.log(newUser)

  }

  async findOrCreate(user: oAuthUserObject) {
    const existingUser = await this.prismaService.prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });
  
    if (!existingUser) {
      const names = user.name.split(' ');
      const firstName = names[0];
      const lastName = names[1];

      this.createUser(firstName, lastName, user.email, '')
    }
  
    return user;
  }
}
