import { UseProtectedLoader } from '~/utils/loader-middleware/use-protected-loader';
import { UserAccountTypes } from '~/types/auth/jwt.types';
import { LoaderFunctionArgs } from '@remix-run/node';
import { json, useLoaderData } from '@remix-run/react';


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
    <>Course ID: {data.id}</>
  )

}