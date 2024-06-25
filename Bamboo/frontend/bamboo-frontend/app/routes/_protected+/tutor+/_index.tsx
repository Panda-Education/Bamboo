
import { UserAccountTypes } from '~/types/auth/jwt.types';
import { UseProtectedLoader } from '~/utils/loader-middleware/use-protected-loader';



export const loader = UseProtectedLoader([UserAccountTypes.Tutor])

export default function TutorIndexPage(){


  return(
    <>Tutor Index</>
  )
}