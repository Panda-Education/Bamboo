/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './routes/auth/auth.module';
import { RouterModule } from '@nestjs/core';
import { RegisterModule } from './routes/auth/register/register.module';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { UserService } from './services/user/user.service';
import { DbPrismaService } from './services/db/db-prisma/db-prisma.service';
import { configDotenv } from 'dotenv';
import { PasswordService } from './services/password/password.service';
import * as process from 'node:process';
import { GoogleModule } from './routes/auth/google/google.module';
import { InitialiseModule } from './routes/auth/initialise/initialise.module';
import { PandaJwtService } from './auth/panda-jwt/panda-jwt.service';
import { PandaJwtModule } from './auth/panda-jwt/panda-jwt.module';

//// Load environment variables
configDotenv({
  path: `./.env.${process.env.NODE_ENV || 'local'}`,
});

@Module({
  imports: [
    NestjsFormDataModule,
    RegisterModule,
    InitialiseModule,
    GoogleModule,
    RouterModule.register([
      {
        path: 'auth',
        module: AuthModule,
        children: [
          {
            path: 'register',
            module: RegisterModule,
          },
          {
            path: 'google',
            module: GoogleModule 
          },
          {
            path: 'initialise',
            module: InitialiseModule
          }
        ],
      },
    ]),
    PandaJwtModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService, DbPrismaService, PasswordService],
})
export class AppModule {}
