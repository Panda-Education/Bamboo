/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { DbPrismaService } from "../db/db-prisma/db-prisma.service";
import { JwtPayload } from "../../types/auth.jwt.types";
import { Student } from "@prisma/client";

@Injectable()
export class StudentService {
    constructor(
        private prismaService: DbPrismaService,
    ) {}

    async createStudent(
        jwt: JwtPayload
    ): Promise<Student>{
        return this.prismaService.prisma.student.create({
            data: {
                email: jwt.email,
            }
        });
    }
}