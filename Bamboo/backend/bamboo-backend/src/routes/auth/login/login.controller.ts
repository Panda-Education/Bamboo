/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Res, UseInterceptors } from '@nestjs/common';
import { PandaJwtService } from 'src/auth/panda-jwt/panda-jwt.service';
import { UserService } from 'src/services/user/user.service';
import { FormDataInterceptor } from 'nestjs-form-data/dist/interceptors/FormData.interceptor';
import { Response } from 'express';
import { LoginUserFromEmailPassword } from 'src/dto/auth/login-user-from-email-password/register-user-from-email-password';
import { UserAccountTypes } from 'src/types/user.account.types';
import { StudentService } from 'src/services/student/student.service';
import { TutorService } from 'src/services/tutor/tutor.service';

@Controller('')
export class LoginController {

    constructor(
        private userService:UserService,
        private studentService: StudentService,
        private tutorService: TutorService,
        private pandaJwtService: PandaJwtService
    ) {}

    @Post()
    @UseInterceptors(FormDataInterceptor)
    async emailAndPassword(
        @Body() body: LoginUserFromEmailPassword,
        @Res() res: Response
    ){
        try{
            const user = await this.userService.getUser(
                body.email,
                body.password
            )

            let account = await this.studentService.getStudent(user.email)
            let accountType = UserAccountTypes.Student
            if (!account) {
                account = await this.tutorService.getTutor(user.email)
                accountType = UserAccountTypes.Tutor
            }

            const jwt = await this.pandaJwtService.sign({
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                userType: accountType
            })
    
            res.status(200)
            .cookie('jwt', jwt, { httpOnly: true, path: '/' })
            .setHeader('authorization', `Bearer ${jwt}`)
            .send()
        } catch (e) {
            res.status(500).send({ success: false, message: e.message });
        }
        return {message:"ok"}
    }
}