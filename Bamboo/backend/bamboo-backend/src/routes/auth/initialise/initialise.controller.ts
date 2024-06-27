/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { FormDataInterceptor } from 'nestjs-form-data/dist/interceptors/FormData.interceptor';
import { JwtPayload } from 'src/types/auth.jwt.types';
import { InitialiseService } from './initialise.service';
import { TodoAny } from '../../../types/_todo.types';
import { Request, Response } from 'express';
import { PandaJwtService } from '../../../auth/panda-jwt/panda-jwt.service';
import { Roles } from '../../../auth/roles-guard/roles.decorator';
import { UserAccountTypes } from '../../../types/user.account.types';
import { RolesGuard } from '../../../auth/roles-guard/roles-guard.service';

@Controller('')
export class InitialiseController {
    constructor (
        private initialiseService: InitialiseService,
        private pandaJwtService: PandaJwtService
    ) {
    }

    @Post()
    @Roles(UserAccountTypes.Uninitialised)
    @UseGuards(RolesGuard)
    @UseInterceptors(FormDataInterceptor)
    async initialiseAccountType(
        @Body() body: TodoAny,
        @Req() req: Request,
        @Res() res: Response
    ){
        const decoded: JwtPayload = await this.pandaJwtService.validate(body.jwt)
        try {

            const { accountJwt } = await this.initialiseService.initialiseAccount(
                body.accountType.toUpperCase(),
                decoded
            )

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