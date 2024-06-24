

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
  userType: UserAccountTypes
}

export type JwtString = string