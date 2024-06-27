import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { PandaJwtService } from '../panda-jwt/panda-jwt.service';

// @ts-ignore idk why this was being flagged out as an error
@Injectable()
export class RolesGuard implements CanActivate {

  constructor(
    private reflector: Reflector,
    private pandaJwtService: PandaJwtService
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const roles = this.reflector.get<string[]>('roles', context.getHandler())
    if (!roles || roles.length===0) {
      return true
    }

    const request:Request = context.switchToHttp().getRequest()
    const cookies = request.cookies

    const jwt = await this.pandaJwtService.validate(cookies['jwt'])

    return roles.includes(jwt.userType)

  }
}
