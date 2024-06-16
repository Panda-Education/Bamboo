import { toast } from 'sonner';
import axios from 'axios';


export async function RegisterUserEmailPassword(
  firstName:string,
  lastName:string,
  email:string,
  password:string
){

  try {

    toast(email)

    // const res = await axios.post("")

  } catch (e) {
    toast.error("Oops! Something went wrong.", {
    })
  }

}