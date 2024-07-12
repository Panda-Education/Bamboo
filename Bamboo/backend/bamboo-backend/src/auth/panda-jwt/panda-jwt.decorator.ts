/* eslint-disable prettier/prettier */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../../types/auth.jwt.types';
import { jwtDecode } from 'jwt-decode';

export const JwtToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): JwtPayload => {
    const req = ctx.switchToHttp().getRequest();
    return jwtDecode<JwtPayload>(req.cookies['jwt']);
  },
);
