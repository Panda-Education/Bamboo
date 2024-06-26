import { JwtPayload, JwtString } from '~/types/auth/jwt.types';
import { jwtDecode } from "jwt-decode"


export function DecodeJwt(token:JwtString):JwtPayload{
  return jwtDecode<JwtPayload>(token)
}