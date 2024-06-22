import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { GoogleAuthService } from './google.service';
import { GoogleOauthGuard } from 'src/dto/auth/guards/google-oauth.guard';
import { TodoAny } from '../../../types/_todo.types';
import { JWT_HEADER_NAME } from '../../../types/auth.jwt.types';

@Controller('')
export class GoogleController {
    constructor(private authService: GoogleAuthService) {}

    @Get('callback')
    @UseGuards(GoogleOauthGuard)
    async googleAuthCallback(@Req() req: TodoAny, @Res() res: Response) {
        try {
            const { jwt } = await this.authService.OAuthLogin(req.user);
            res.redirect(`http://localhost:5173/welcome`)
        } catch (err) {
        res.status(500).send({ success: false, message: err.message });
        }
    }
}