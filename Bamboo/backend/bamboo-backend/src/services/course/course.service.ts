import { Global, Injectable } from '@nestjs/common';
import { DbPrismaService } from '../db/db-prisma/db-prisma.service';
import { Course } from '@prisma/client';

@Global()
@Injectable()
export class CourseService {

  constructor(
    private prismaService: DbPrismaService
  ) {
  }

  async createCourse(
    tutorId: string,
    courseTitle: string,
    courseDescription: string,
  ):Promise<Course>{

    return this.prismaService.prisma.course.create({
      data: {
        adminId: tutorId,
        title: courseTitle,
        description: courseDescription,
        tutors: {
          connect: {
            id: tutorId
          }
        }
      },
    })


  }

}
