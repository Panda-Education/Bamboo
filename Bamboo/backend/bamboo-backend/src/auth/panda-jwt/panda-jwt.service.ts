import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, JwtString } from '../../types/auth.jwt.types';



@Injectable()
export class PandaJwtService {

  constructor(
    private jwtService: JwtService
  ){}

  async sign(payload:JwtPayload):Promise<JwtString> {
    return this.jwtService.sign(payload)
  }

  async validate(token:string):Promise<JwtPayload> {
    return this.jwtService.verifyAsync<JwtPayload>(token)
  }


}
