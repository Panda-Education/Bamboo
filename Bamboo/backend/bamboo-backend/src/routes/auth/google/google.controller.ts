/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { GoogleAuthService } from './google.service';
import { GoogleOauthGuard } from 'src/dto/auth/guards/google-oauth.guard';
import { TodoAny } from '../../../types/_todo.types';

@Controller('')
export class GoogleController {
    constructor(private authService: GoogleAuthService) {}

    @Get('callback')
    @UseGuards(GoogleOauthGuard)
    async googleAuthCallback(@Req() req: TodoAny, @Res() res: Response) {
        try {
            const { jwt, loggingIn } = await this.authService.OAuthLogin(req.user);
            console.log(jwt, loggingIn)
            // Set the JWT token as a cookie
            if (!loggingIn) {
                res.cookie('jwt', jwt, { httpOnly: true, path: '/' });
                res.redirect(`http://localhost:5173/welcome?token=${jwt}`)
            } else {
                res.status(200)
                .cookie('jwt', jwt, { httpOnly: true, path: '/' })
                .header('authorization', `Bearer ${jwt}`)
                .send()
            }
        } catch (err) {
        res.status(500).send({ success: false, message: err.message });
        }
    }
}