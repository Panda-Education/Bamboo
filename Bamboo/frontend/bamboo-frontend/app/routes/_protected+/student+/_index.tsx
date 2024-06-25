import { UseProtectedLoader } from '~/utils/loader-middleware/use-protected-loader';
import { UserAccountTypes } from '~/types/auth/jwt.types';


export const loader = UseProtectedLoader([UserAccountTypes.Student])


export default function StudentIndexPage(){

  return(
    <>Student default page</>
  )
}