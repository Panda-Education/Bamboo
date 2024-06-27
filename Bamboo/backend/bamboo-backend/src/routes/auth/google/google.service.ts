/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UserService } from '../../../services/user/user.service';

import { OAuthUserObject } from '../../../types/auth.oauth.types';
import { JwtPayload } from '../../../types/auth.jwt.types';
import { PandaJwtService } from '../../../auth/panda-jwt/panda-jwt.service';
import { UserAccountTypes } from '../../../types/user.account.types';

@Injectable()
export class GoogleAuthService {
    constructor(
        private usersService: UserService,
        private pandaJwtService: PandaJwtService
    ) {}

    async OAuthLogin(user: OAuthUserObject) {
        // Find or create a user based on the Google ID
        const { user: dbUser, loggingIn } = await this.usersService.findOrCreate(user);

        // Generate a JWT token for the user
        const payload:JwtPayload = {
            id: dbUser.id,
            email: dbUser.email,
            firstName: dbUser.firstName,
            lastName: dbUser.lastName,
            userType: UserAccountTypes.Uninitialised
        }

        return {
            jwt: await this.pandaJwtService.sign(payload),
            loggingIn
        };
    }
}