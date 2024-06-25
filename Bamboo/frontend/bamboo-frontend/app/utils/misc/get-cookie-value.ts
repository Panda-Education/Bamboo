import { JwtPayload } from '~/types/auth/jwt.types';


export function GetCookieValue(cookies:string, name:string):string | null {
  const cookieArr = cookies.split(';');
  for (let cookie of cookieArr) {
    cookie = cookie.trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring((name + '=').length, cookie.length);
    }
  }
  return null;
}