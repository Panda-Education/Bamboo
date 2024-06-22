/* eslint-disable prettier/prettier */
import { Controller, Post, Body, UseInterceptors, Res } from "@nestjs/common";
import { FormDataInterceptor } from "nestjs-form-data/dist/interceptors/FormData.interceptor";
import jwt from 'jsonwebtoken';
import { JwtPayload } from "src/types/auth.jwt.types";
import { InitialiseService } from "./initialise.service";

@Controller('')
export class InitialiseController {
    constructor (
        private initialiseService: InitialiseService
    ) {
    }

    @Post()
    @UseInterceptors(FormDataInterceptor)
    async initialiseAccountType(
        @Body() body,
        @Res() res
    ){
        const decoded: JwtPayload = jwt.decode(body.jwt) as JwtPayload;
        try {
            const { accountJwt } = await this.initialiseService.initialiseAccount(
                body.accountType,
                decoded
            )
            res.cookie('accountJwt', accountJwt, { httpOnly: true, path: '/' })
            //where to redirect to after account is initialised
            console.log(accountJwt)
        } catch (err) {
            res.status(500).send({ success: false, message: err.message });
        }
        return {message:"ok"}
    }
}