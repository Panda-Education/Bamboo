import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Roles } from '../../../auth/roles-guard/roles.decorator';
import { AllUserAccountTypes } from '../../../types/user.account.types';
import { RolesGuard } from '../../../auth/roles-guard/roles-guard.service';
import { Response } from 'express';
import { PandaJwtService } from '../../../auth/panda-jwt/panda-jwt.service';

@Controller('')
export class VerifyController {

  constructor(
    private pandaJwtService: PandaJwtService
  ) {
  }

  @Get()
  @Roles(...AllUserAccountTypes)
  @UseGuards(RolesGuard)
  async validateJwtPair(
    @Req() req,
    @Res() res: Response
  ){

    console.log(req.cookies['jwt'])
    console.log(req.headers['Authorization'])

    const jwtString = req.cookies['jwt']
    const jwt = this.pandaJwtService.validate(jwtString)

    res.json({
      jwt: jwt
    })

  }

}
