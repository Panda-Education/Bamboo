/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { DbPrismaService } from '../db/db-prisma/db-prisma.service';
import { PasswordService } from '../password/password.service';

import { OAuthUserObject } from '../../types/auth.oauth.types';
import { User } from '@prisma/client';
import { JwtPayload } from 'src/types/auth.jwt.types';

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
    userPassword?:string,
  ):Promise<User>{

    return this.prismaService.prisma.user.create({
      data: {
        firstName: userFirstName,
        lastName: userLastName,
        email: userEmail,
        password: userPassword?await this.passwordService.hashPassword(userPassword):undefined
      }
    });


  }

  async findOrCreate(user: OAuthUserObject): Promise<User> {
    const existingUser = await this.prismaService.prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });
  
    if (!existingUser) {
      return this.createUser(user.firstName, user.lastName, user.email, undefined)
    }

    return existingUser
  
  }

  async initialiseAccount(accountType: string, jwt: JwtPayload){
    // change initialise to true
    await this.prismaService.prisma.user.update(
      {
        where: {
          email: jwt.email
        },
        data:{
          initialised: true
        }
      }
    )

    let account = null
    if (accountType === 'student') {
      account = await this.prismaService.prisma.student.create({
        data: {
          name: `${jwt.firstName} ${jwt.lastName}`,
          email: jwt.email,
          password: '',
        }
      })
    }

    if (accountType === 'tutor') {
      account = await this.prismaService.prisma.tutor.create({
        data: {
          name: `${jwt.firstName} ${jwt.lastName}`,
          email: jwt.email,
          password: '',
        }
      })
    }

    return account
  }
}
