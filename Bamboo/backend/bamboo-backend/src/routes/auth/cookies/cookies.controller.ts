/* eslint-disable prettier/prettier */
import { Controller, Res, Get } from "@nestjs/common";
import { Response } from 'express';

@Controller('')
export class CookieController {
    @Get()
    async resetCookie(
        @Res() res: Response,
    ){
        try {
            res.status(200)
            .cookie('jwt', '', { httpOnly: true, path: '/', expires: new Date(0) })
            .setHeader('authorization', `Bearer ${""}`)
            .send()
        } catch (e) {
            res.status(500).send({success: false, message: e.message})
        }
    }
}