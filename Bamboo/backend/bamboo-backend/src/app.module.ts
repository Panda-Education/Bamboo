/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './routes/auth/auth.module';
import { RouterModule } from '@nestjs/core';
import { RegisterModule } from './routes/auth/register/register.module';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { UserService } from './services/user/user.service';
import { DbPrismaService } from './services/db/db-prisma/db-prisma.service';
import { configDotenv } from 'dotenv';
import { PasswordService } from './services/password/password.service';
import * as process from 'node:process';
import { GoogleModule } from './routes/auth/google/google.module';
import { InitialiseModule } from './routes/auth/initialise/initialise.module';
import { PandaJwtService } from './auth/panda-jwt/panda-jwt.service';
import { PandaJwtModule } from './auth/panda-jwt/panda-jwt.module';
import { LoginModule } from './routes/auth/login/login.module';
import { RolesGuardModule } from './auth/roles-guard/roles-guard.module';
import { CoursesModule } from './routes/courses/courses.module';
import { CourseService } from './services/course/course.service';
import { TutorService } from './services/tutor/tutor.service';
import { StudentService } from './services/student/student.service';
import { CookieModule } from './routes/auth/cookies/cookies.module';
//// Load environment variables
configDotenv({
  path: `./.env.${process.env.NODE_ENV || 'local'}`,
});

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'auth',
        module: AuthModule,
        children: [
          {
            path: 'register',
            module: RegisterModule,
          },
          {
            path: 'google',
            module: GoogleModule
          },
          {
            path: 'initialise',
            module: InitialiseModule
          },
          {
            path: 'login',
            module: LoginModule
          },
          {
            path: 'cookies',
            module: CookieModule
          }
        ],
      },
      {
        path: 'courses',
        module: CoursesModule
      }
    ]),
    NestjsFormDataModule,
    RegisterModule,
    InitialiseModule,
    LoginModule,
    GoogleModule,
    PandaJwtModule,
    RolesGuardModule,
    CoursesModule,
    CookieModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UserService,
    DbPrismaService,
    PasswordService,
    CourseService,
    TutorService,
    StudentService
  ],
  exports: [
    AppService,
    UserService,
    DbPrismaService,
    PasswordService,
    CourseService,
    TutorService,
    StudentService
  ],
})
export class AppModule {}
