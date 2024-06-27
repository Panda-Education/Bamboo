/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { UserService } from "src/services/user/user.service";
import { PandaJwtService } from "src/auth/panda-jwt/panda-jwt.service";
import { RegisterUserFromEmailPassword } from "src/dto/auth/register-user-from-email-password/register-user-from-email-password";
import { JwtPayload } from "src/types/auth.jwt.types";
import { UserAccountTypes } from "src/types/user.account.types";

@Injectable()
export class RegisterService {
    constructor(
        private userService: UserService,
        private pandaJwtService: PandaJwtService,
    ) {}

    async registerUser(body: RegisterUserFromEmailPassword) {
        const user = await this.userService.createUser(
            body.firstName,
            body.lastName,
            body.email,
            body.password
        )

        // Generate a JWT token for the user
        const userPayload: JwtPayload = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            userType: UserAccountTypes.Uninitialised
        }

        return {
            userJwt: await this.pandaJwtService.sign(userPayload),
        }
    }
}