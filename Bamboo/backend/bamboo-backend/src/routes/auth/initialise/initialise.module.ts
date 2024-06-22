/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { InitialiseController } from "./initialise.controller";
import { UserService } from "../../../services/user/user.service";
import { DbPrismaService } from "../../../services/db/db-prisma/db-prisma.service";
import { NestjsFormDataModule } from "nestjs-form-data";
import { PasswordService } from "src/services/password/password.service";
import { InitialiseService } from "./initialise.service";
import { JwtService } from "@nestjs/jwt";
import { StudentService } from "src/services/student/student.service";
import { TutorService } from "src/services/tutor/tutor.service";

@Module({
    imports: [
        NestjsFormDataModule,
    ],
    controllers: [InitialiseController],
    providers: [UserService, StudentService, TutorService, DbPrismaService, PasswordService, InitialiseService, JwtService]
})
export class InitialiseModule {}