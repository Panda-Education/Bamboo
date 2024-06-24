/* eslint-disable prettier/prettier */
import { Controller, Post, Body, UseInterceptors, Res, Req } from '@nestjs/common';
import { FormDataInterceptor } from "nestjs-form-data/dist/interceptors/FormData.interceptor";
import jwt from 'jsonwebtoken';
import { JwtPayload } from "src/types/auth.jwt.types";
import { InitialiseService } from "./initialise.service";
import { TodoAny } from '../../../types/_todo.types';
import { Request, Response } from 'express';
import { PandaJwtService } from '../../../auth/panda-jwt/panda-jwt.service';

@Controller('')
export class InitialiseController {
    constructor (
        private initialiseService: InitialiseService,
        private pandaJwtService: PandaJwtService
    ) {
    }

    @Post()
    @UseInterceptors(FormDataInterceptor)
    async initialiseAccountType(
        @Body() body: TodoAny,
        @Req() req: Request,
        @Res() res: Response
    ){
        const decoded: JwtPayload = await this.pandaJwtService.validate(body.jwt)
        try {

            // console.log(body)
            // console.log(req.headers)

            const { accountJwt } = await this.initialiseService.initialiseAccount(
                body.accountType.toUpperCase(),
                decoded
            )


            console.log(res.getHeaders())

            res.status(200)
            .cookie('jwt', accountJwt, { httpOnly: true, path: '/' })
            .setHeader('authorization', `Bearer ${accountJwt}`)
            .send()
        } catch (err) {
            res.status(500).send({ success: false, message: err.message });
        }
        return {message:"ok"}
    }
}