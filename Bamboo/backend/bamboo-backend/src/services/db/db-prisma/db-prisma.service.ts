/* eslint-disable prettier/prettier */
import { Global, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Global()
@Injectable()
export class DbPrismaService {

  public prisma: PrismaClient = new PrismaClient()

}
