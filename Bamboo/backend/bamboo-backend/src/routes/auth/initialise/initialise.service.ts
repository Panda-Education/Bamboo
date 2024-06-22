/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/services/user/user.service';
import { StudentService } from 'src/services/student/student.service';
import { TutorService } from 'src/services/tutor/tutor.service';
import { AccountJwtPayload } from 'src/types/auth.account.types';
import { JwtPayload } from 'src/types/auth.jwt.types';
import { UserAccountTypes } from '../../../types/user.account.types';
import { PandaJwtService } from '../../../auth/panda-jwt/panda-jwt.service';

@Injectable()
export class InitialiseService {
    constructor(
        private usersService: UserService,
        private studentService: StudentService,
        private tutorService: TutorService,
        private pandaJwtService: PandaJwtService
    ) {}

    async initialiseAccount(accountType: UserAccountTypes, jwt: JwtPayload){

        let account = null
        switch (accountType) {
            case UserAccountTypes.Student:
                account = await this.studentService.createStudent(jwt)
                break;
            case UserAccountTypes.Tutor:
                account = await this.tutorService.createTutor(jwt)
                break;
            default:
                throw "Unable to initialise account!"
        }

        await this.usersService.initialiseAccount(
            jwt
        )

        const accountPayload:JwtPayload = {
            id: account.id,
            email: account.email,
            firstName: account.firstName,
            lastName: account.lastName,
            userType: accountType,
        }

        return {
            accountJwt: await this.pandaJwtService.sign(accountPayload),
        }
    }
}