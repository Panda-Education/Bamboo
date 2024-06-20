/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../../services/user/user.service';
import { oAuthUserObject } from './oAuthType';

@Injectable()
export class GoogleAuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
    ) {}

    async oAuthLogin(user: oAuthUserObject) {
        // Find or create a user based on the Google ID
        const dbUser = await this.usersService.findOrCreate(user);

        // Generate a JWT token for the user
        const payload = { username: dbUser.email, name: dbUser.name };
        return {
            jwt: this.jwtService.sign(payload),
        };
    }
}