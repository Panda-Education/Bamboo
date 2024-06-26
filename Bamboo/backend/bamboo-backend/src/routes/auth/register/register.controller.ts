/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Post, Req, Res, UseInterceptors } from '@nestjs/common';
import { FormDataInterceptor } from 'nestjs-form-data/dist/interceptors/FormData.interceptor';
import {
  RegisterUserFromEmailPassword,
} from '../../../dto/auth/register-user-from-email-password/register-user-from-email-password';
import { Response } from 'express';
import { RegisterService } from './register.service';

@Controller('')
export class RegisterController {

  constructor(
    private registerService: RegisterService,
  ) {
  }

  /**
   * Endpoint for receiving Email and Password combinations
   * @param body
   * @param res
   * @param req
   */
  @Post()
  @UseInterceptors(FormDataInterceptor)
  async emailAndPassword(
    @Body() body: RegisterUserFromEmailPassword,
    @Res() res: Response,
    @Req() req: Request
  ){
    try{
      const { userJwt } = await this.registerService.registerUser(body);

      console.log(userJwt)
      console.log(res.getHeaders())
      
      res.status(200)
      .cookie('jwt', userJwt, { httpOnly: true, path: '/' })
      .setHeader('authorization', `Bearer ${userJwt}`)
      .send()
      
    } catch (e) {
      res.status(500).send({success: false, message: e.message})
    }
  }

}
