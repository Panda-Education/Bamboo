/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { InitialiseController } from "./initialise.controller";
import { UserService } from "../../../services/user/user.service";
import { DbPrismaService } from "../../../services/db/db-prisma/db-prisma.service";
import { NestjsFormDataModule } from "nestjs-form-data";
import { PasswordService } from "src/services/password/password.service";
import { InitialiseService } from "./initialise.service";
import { JwtService } from "@nestjs/jwt";

@Module({
    imports: [
        NestjsFormDataModule,
    ],
    controllers: [InitialiseController],
    providers: [UserService, DbPrismaService, PasswordService, InitialiseService, JwtService]
})
export class InitialiseModule {}