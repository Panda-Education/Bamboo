/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { DbPrismaService } from '../db/db-prisma/db-prisma.service';
import { PasswordService } from '../password/password.service';

import { OAuthUserObject } from '../../types/auth.oauth.types';
import { User } from '@prisma/client';
import { JwtPayload } from 'src/types/auth.jwt.types';
import { UserAccountTypes } from '../../types/user.account.types';

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

  async findOrCreate(user: OAuthUserObject): Promise<{user: User, loggingIn: boolean}> {
    let loggingIn:boolean;
    const existingUser = await this.prismaService.prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });
  
    if (!existingUser) {
      loggingIn = false;
      const newUser = await this.createUser(user.firstName, user.lastName, user.email, undefined)
      return { user: newUser, loggingIn };
    } else {
      loggingIn = true;
    }

    return { user: existingUser, loggingIn };
  
  }

  async initialiseAccount(jwt: JwtPayload){
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
  }

  async getUser(email: string, password: string): Promise<User> {
    const user = await this.prismaService.prisma.user.findUnique({
      where: {
        email: email,
      },
    })

    if (!user) {
      throw new Error("User not found")
    }

    if (!await this.passwordService.validatePassword(user.password, password)) {
      throw new Error("Password does not match")
    }

    return user
  }
}
