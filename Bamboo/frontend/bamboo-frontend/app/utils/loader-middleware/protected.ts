import { GetCookieValue } from '~/utils/misc/get-cookie-value';
import { JwtPayload, UserAccountTypes } from '~/types/auth/jwt.types';
import { DecodeJwt } from '~/services/auth/jwt/decode-jwt';


export function Protected(req:Request, ...roles:UserAccountTypes[]):boolean{
  const jwtString:string|null = GetCookieValue(req.headers.get('cookie') || "", "jwt")

  if(!jwtString || jwtString===''){
    return false
  }

  const jwt:JwtPayload = DecodeJwt(jwtString)

  return roles.includes(jwt.userType)



}