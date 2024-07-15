

export enum UserAccountTypes {
  Uninitialised="UNINITIALISED",
  Student="STUDENT",
  Tutor="TUTOR"
}


export type JwtPayload = {
  id: string,
  email: string,
  firstName: string,
  lastName: string,
  userType: UserAccountTypes,
  iat: number,
  exp: number
}

export type JwtString = string