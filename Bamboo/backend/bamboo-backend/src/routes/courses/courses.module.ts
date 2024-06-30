import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { TutorService } from '../../services/tutor/tutor.service';
import { DbPrismaService } from '../../services/db/db-prisma/db-prisma.service';
import { CourseService } from '../../services/course/course.service';
import { UserService } from '../../services/user/user.service';
import { PasswordService } from '../../services/password/password.service';
import { StudentService } from '../../services/student/student.service';

@Module({
  imports: [
    NestjsFormDataModule,
  ],
  controllers: [CoursesController],
  providers: [UserService, DbPrismaService, PasswordService, StudentService, TutorService, CourseService]
})
export class CoursesModule {}
