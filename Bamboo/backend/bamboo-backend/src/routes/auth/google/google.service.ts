/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UserService } from '../../../services/user/user.service';

import { OAuthUserObject } from '../../../types/auth.oauth.types';
import { JwtPayload } from '../../../types/auth.jwt.types';
import { PandaJwtService } from '../../../auth/panda-jwt/panda-jwt.service';
import { UserAccountTypes } from '../../../types/user.account.types';
import { StudentService } from 'src/services/student/student.service';
import { TutorService } from 'src/services/tutor/tutor.service';

@Injectable()
export class GoogleAuthService {
    constructor(
        private usersService: UserService,
        private pandaJwtService: PandaJwtService,
        private studentService: StudentService,
        private tutorService: TutorService
    ) {}

    async OAuthLogin(user: OAuthUserObject) {
        // Find or create a user based on the Google ID
        const dbUser = await this.usersService.findOrCreate(user);

        let payload:JwtPayload;
        if (!dbUser.initialised){
            payload = {
                id: dbUser.id,
                email: dbUser.email,
                firstName: dbUser.firstName,
                lastName: dbUser.lastName,
                userType: UserAccountTypes.Uninitialised
            }
        } else {
            let dbAccount = await this.studentService.getStudent(dbUser.email);
            if (dbAccount){
                payload = {
                    id: dbUser.id,
                    email: dbUser.email,
                    firstName: dbUser.firstName,
                    lastName: dbUser.lastName,
                    userType: UserAccountTypes.Student
                }
            } else {
                dbAccount = await this.tutorService.getTutor(dbUser.email);
                payload = {
                    id: dbUser.id,
                    email: dbUser.email,
                    firstName: dbUser.firstName,
                    lastName: dbUser.lastName,
                    userType: UserAccountTypes.Tutor
                }
            }
        }
        // Generate a JWT token for the user

        return {
            jwt: await this.pandaJwtService.sign(payload),
            userType: payload.userType
        };
    }
}