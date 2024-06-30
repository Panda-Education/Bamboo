import { UseProtectedLoader } from '~/utils/loader-middleware/use-protected-loader';
import { UserAccountTypes } from '~/types/auth/jwt.types';
import { Button } from '@/components/shadcn/ui/button';
import CreateCourseDialogButton from '@/components/courses/create_course_button';
import { json, useLoaderData } from '@remix-run/react';
import * as process from 'node:process';


type PageData = {
  endpoint: string
}

export const loader = UseProtectedLoader([UserAccountTypes.Tutor], async() => {
  return json({
    endpoint: process.env.BACKEND
  })
})


export default function TutorCoursesPage(){

  const data = useLoaderData<PageData>()

  return(
    <div>
      Courses
      <CreateCourseDialogButton endpoint={data.endpoint}/>
    </div>
  )
}