/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Post, Res, UseInterceptors } from '@nestjs/common';
import { FormDataInterceptor } from 'nestjs-form-data/dist/interceptors/FormData.interceptor';
import { UserService } from '../../../services/user/user.service';
import {
  RegisterUserFromEmailPassword,
} from '../../../dto/auth/register-user-from-email-password/register-user-from-email-password';
import { Response } from 'express';
import { UserAccountTypes } from '../../../types/user.account.types';
import { PandaJwtService } from '../../../auth/panda-jwt/panda-jwt.service';
import { JwtPayload } from 'src/types/auth.jwt.types';

@Controller('')
export class RegisterController {

  constructor(
    private userService:UserService,
    private pandaJwtService: PandaJwtService
  ) {
  }

  /**
   * Endpoint for receiving Email and Password combinations
   * @param body
   * @param res
   */
  @Post()
  @UseInterceptors(FormDataInterceptor)
  async emailAndPassword(
    @Body() body: RegisterUserFromEmailPassword,
    @Res() res: Response
  ){
    try{
      const user = await this.userService.createUser(
        body.firstName,
        body.lastName,
        body.email,
        body.password
      )

      // Generate a JWT token for the user
      const payload: JwtPayload = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userType: UserAccountTypes.Uninitialised
      }
      
      const jwt = await this.pandaJwtService.sign(payload)
      
      res.cookie('jwt', jwt, { httpOnly: true, path: '/' });
      res.redirect(`http://localhost:5173/welcome?token=${jwt}`)
    } catch (e) {
      res.status(500).send({success: false, message: e.message})
    }
  }

}
