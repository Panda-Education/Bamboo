import { UseProtectedLoader } from '~/utils/loader-middleware/use-protected-loader';
import { UserAccountTypes } from '~/types/auth/jwt.types';
import { Button } from '@/components/shadcn/ui/button';
import CreateCourseDialogButton from '@/components/courses/create_course_button';


export const loader = UseProtectedLoader([UserAccountTypes.Tutor])


export default function TutorCoursesPage(){

  return(
    <div>
      Courses
      <CreateCourseDialogButton />
    </div>
  )
}