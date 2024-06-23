import { JwtPayload } from '~/types/auth/jwt.types';


export function DeserialiseJwtJson(jwtString:string):JwtPayload {
  return JSON.parse(jwtString) as JwtPayload
}