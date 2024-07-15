/* eslint-disable prettier/prettier */


import { UserAccountTypes } from './user.account.types';

export type JwtPayload = {
  id: string,
  email: string,
  firstName: string,
  lastName: string,
  userType: UserAccountTypes,
}

export type JwtString = string
