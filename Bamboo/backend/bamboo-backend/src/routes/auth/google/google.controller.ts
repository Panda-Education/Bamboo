/* eslint-disable prettier/prettier */
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { GoogleAuthService } from './google.service';
import { GoogleOauthGuard } from 'src/dto/auth/guards/google-oauth.guard';

@Controller('')
export class GoogleController {
    constructor(private authService: GoogleAuthService) {}

    @Get('callback')
    @UseGuards(GoogleOauthGuard)
    async googleAuthCallback(@Req() req, @Res() res: Response) {
        try {
            console.log(req)
            const token = await this.authService.oAuthLogin(req.user);
            // res.redirect(`http://localhost:5173/oauth?token=${token.jwt}`);
            console.log("Successful Google sign in")
            console.log(token.jwt)
        } catch (err) {
        res.status(500).send({ success: false, message: err.message });
        }
    }
}