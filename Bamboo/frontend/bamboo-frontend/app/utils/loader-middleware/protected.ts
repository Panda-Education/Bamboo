import { GetCookieValue } from '~/utils/misc/get-cookie-value';
import { JwtPayload, UserAccountTypes } from '~/types/auth/jwt.types';
import { DecodeJwt } from '~/services/auth/jwt/decode-jwt';


export function Protected(req:Request, ...roles:UserAccountTypes[]){
  const jwtString:string|null = GetCookieValue(req.headers.get('cookie') || "", "jwt")

  if(!jwtString || jwtString===''){throw "JWT string not found in cookie!"}

  const jwt:JwtPayload = DecodeJwt(jwtString)

  if(!roles.includes(jwt.userType)){throw "User not permitted!"}

}