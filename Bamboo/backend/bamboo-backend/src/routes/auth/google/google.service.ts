/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../../services/user/user.service';

import { OAuthUserObject } from '../../../types/auth.oauth.types';
import { JwtPayload } from '../../../types/auth.jwt.types';

@Injectable()
export class GoogleAuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
    ) {}

    async OAuthLogin(user: OAuthUserObject) {
        // Find or create a user based on the Google ID
        const dbUser = await this.usersService.findOrCreate(user);

        // Generate a JWT token for the user
        const payload:JwtPayload = {
            email: dbUser.email,
            firstName: dbUser.firstName,
            lastName: dbUser.lastName,
        }

        // TODO JWT generation should be done outside of GoogleAuthService
        // JWT logic should be handled on the route endpoint itself

        return {
            jwt: this.jwtService.sign(payload),
        };
    }
}