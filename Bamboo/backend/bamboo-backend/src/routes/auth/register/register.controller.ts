import { Body, Controller, Post, Req, Res, UseInterceptors } from '@nestjs/common';
import { FormDataInterceptor } from 'nestjs-form-data/dist/interceptors/FormData.interceptor';
import { UserService } from '../../../services/user/user.service';
import {
  RegisterUserFromEmailPassword
} from '../../../dto/auth/register-user-from-email-password/register-user-from-email-password';

@Controller('')
export class RegisterController {

  constructor(
    private userService:UserService
  ) {
  }

  /**
   * Endpoint for receiving Email and Password combinations
   * @param body
   */
  @Post()
  @UseInterceptors(FormDataInterceptor)
  async emailAndPassword(
    @Body() body: RegisterUserFromEmailPassword
  ){

    await this.userService.createUser(
      body.firstName,
      body.lastName,
      body.email,
      body.password
    )
    return {message:"ok"}
  }

}
