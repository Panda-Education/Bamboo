import { UseProtectedLoader } from '~/utils/loader-middleware/use-protected-loader';
import { UserAccountTypes } from '~/types/auth/jwt.types';


export const loader = UseProtectedLoader([UserAccountTypes.Tutor])


export default function TutorMyStudentsEnroll(){
  return(
    <>Enroll Student</>
  )
}