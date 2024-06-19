/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module, RequestMethod } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { GoogleController } from './google.controller';
import { GoogleAuthService } from './google.service';
import { LoginModule } from '../login/login.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuardStrategy } from '../../../dto/auth/strategies/jwt-auth.strategy';
import { JwtGuard } from '../../../dto/auth/guards/jwt-auth.guard';
import { GoogleOauthGuard } from '../../../dto/auth/guards/google-oauth.guard';
import { GoogleStrategy } from '../../../dto/auth/strategies/google-oauth.strategy';
import { UserService } from '../../../services/user/user.service';
import { DbPrismaService } from '../../../services/db/db-prisma/db-prisma.service';
import { PasswordService } from '../../../services/password/password.service';

@Module({
    controllers: [GoogleController],
    imports: [
        JwtModule.registerAsync({
        useFactory: () => ({
            secret: process.env.JWT_SECRET,
            signOptions: {
            expiresIn: '3d',
            },
            global: true,
        })
        }),
    ],
    providers: [GoogleAuthService, JwtGuardStrategy, JwtGuard, GoogleStrategy,UserService, DbPrismaService, PasswordService],
    })
export class GoogleModule { }
