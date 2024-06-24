import { JwtPayload, JwtString } from '~/types/auth/jwt.types';
import { jwtDecode } from "jwt-decode"


export async function DecodeJwt(token:JwtString):Promise<JwtPayload>{
  return jwtDecode<JwtPayload>(token)
}