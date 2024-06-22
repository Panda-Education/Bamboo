/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/services/user/user.service';
import { StudentService } from 'src/services/student/student.service';
import { TutorService } from 'src/services/tutor/tutor.service';
import { AccountJwtPayload } from 'src/types/auth.account.types';
import { JwtPayload } from 'src/types/auth.jwt.types';

@Injectable()
export class InitialiseService {
    constructor(
        private usersService: UserService,
        private studentService: StudentService,
        private tutorService: TutorService,
        private jwtService: JwtService,
    ) {}

    async initialiseAccount(accountType: string, jwt: JwtPayload){
        await this.usersService.initialiseAccount(
            jwt
        )
        
        let account = null
        switch (accountType) {
            case "student":
                account = await this.studentService.createStudent(jwt)
                break;
            case "tutor":
                account = await this.tutorService.createTutor(jwt)
                break;
        }
        // Generate a new JWT token with the updated account
        const firstName = account.name.split(' ')[0]
        const lastName = account.name.split(' ')[1]

        const accountPayload:AccountJwtPayload = {
            email: account.email,
            firstName: firstName,
            lastName: lastName,
            accountType: accountType,
        }

        return {
            accountJwt: this.jwtService.sign(accountPayload),
        }
    }
}