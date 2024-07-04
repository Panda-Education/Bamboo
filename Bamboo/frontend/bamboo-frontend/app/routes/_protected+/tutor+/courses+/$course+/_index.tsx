import { UseProtectedLoader } from '~/utils/loader-middleware/use-protected-loader';
import { UserAccountTypes } from '~/types/auth/jwt.types';
import { LoaderFunctionArgs } from '@remix-run/node';
import { json, Link, useLoaderData } from '@remix-run/react';
import { CourseTitleGroup } from '@/components/courses/course_title_group';
import { Button } from '@/components/shadcn/ui/button';


type CourseIdPageContent = {
  id: string
}


export const loader = UseProtectedLoader<CourseIdPageContent>([UserAccountTypes.Tutor], async (p:LoaderFunctionArgs) => {

  
  return json({
    id: p.params.course as string
  })
})




export default function CourseIdPage(){

  const data = useLoaderData<CourseIdPageContent>()

  return(
    <div className={`w-full`}>
      {/*Course ID: {data.id}*/}
      <CourseTitleGroup title={"[Secondary 2] Biology Made Easy"} description={'Some long description'} isDraft={true}>
        <Link to={`/tutor/courses/${data.id}/edit`}>
          <Button variant={'outline'}>Edit</Button>
        </Link>
      </CourseTitleGroup>
    </div>
  )

}