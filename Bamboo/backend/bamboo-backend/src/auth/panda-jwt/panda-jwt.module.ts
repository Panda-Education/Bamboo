/* eslint-disable prettier/prettier */
import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PandaJwtService } from './panda-jwt.service';
import * as process from 'node:process';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: ()=>({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: "1d",
        }
      })
    }),
  ],
  providers: [PandaJwtService],
  exports: [PandaJwtService]
})
export class PandaJwtModule {}
