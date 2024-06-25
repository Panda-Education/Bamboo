import { UserAccountTypes } from '../../types/user.account.types';
import { SetMetadata } from '@nestjs/common';


export const Roles = (...roles: UserAccountTypes[]) => {
  return SetMetadata('roles', roles)
}