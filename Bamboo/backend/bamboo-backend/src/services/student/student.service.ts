/* eslint-disable prettier/prettier */
import { Global, Injectable } from '@nestjs/common';
import { DbPrismaService } from "../db/db-prisma/db-prisma.service";
import { JwtPayload } from "../../types/auth.jwt.types";
import { Student } from "@prisma/client";

@Global()
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

    async getStudent(email: string): Promise<Student> {
        return this.prismaService.prisma.student.findUnique({
            where: {
                email: email
            }
        });
    }
}