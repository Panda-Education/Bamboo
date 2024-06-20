/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';  
import { configDotenv } from 'dotenv';
import { Profile } from 'passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';

configDotenv();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL,
        scope: ['profile', 'email'],
        });
    }

    async validate(
        _accessToken: string,
        _refreshToken: string,
        profile: Profile,
        done: VerifyCallback,
    ): Promise<void> {
        const { id, name, emails, photos } = profile;

        const user = {
        provider: 'google',
        providerId: id,
        email: emails[0].value,
        name: `${name.givenName} ${name.familyName}`,
        picture: photos[0].value,
        };

        done(null, user);
    }
}