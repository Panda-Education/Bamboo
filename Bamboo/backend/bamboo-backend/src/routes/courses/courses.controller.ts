import { Body, Controller, Post, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { Roles } from '../../auth/roles-guard/roles.decorator';
import { UserAccountTypes } from '../../types/user.account.types';
import { RolesGuard } from '../../auth/roles-guard/roles-guard.service';
import { FormDataInterceptor } from 'nestjs-form-data/dist/interceptors/FormData.interceptor';
import { CreateCourse } from '../../dto/courses/create-course';
import { JwtToken } from '../../auth/panda-jwt/panda-jwt.decorator';
import { Response } from 'express';
import { JwtPayload } from '../../types/auth.jwt.types';
import { CourseService } from '../../services/course/course.service';
import { TutorService } from '../../services/tutor/tutor.service';

@Controller('')
export class CoursesController {

  constructor(
    private courseService: CourseService,
    private tutorService: TutorService
  ){}


  @Post('/create')
  @Roles(UserAccountTypes.Tutor)
  @UseGuards(RolesGuard)
  @UseInterceptors(FormDataInterceptor)
  async createCourse(
    @Body() body: CreateCourse,
    @JwtToken() token: JwtPayload,
    @Res() res: Response
  ){

    try {

      const tutor = await this.tutorService.getTutor(token.email)

      if(!tutor){
        res.status(400).json({error:"Unable to find tutor with JWT/Email!"})
      }

      const course = await this.courseService.createCourse(
        tutor.id,
        body.title,
        body.description
      )

      res.json({
        course: {
          id: course.id
        }
      })


    } catch (e) {
      res.status(500).json({
        error: "Something went wrong creating course!"
      })
    }

  }


}
