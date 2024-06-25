import { toast } from 'sonner';
import axios from 'axios';
import { DecodeJwt } from '../jwt/decode-jwt';

export async function RegisterUserEmailPassword(
  endpoint:string,
  firstName:string,
  lastName:string,
  email:string,
  password:string
){

  try {


    // Creates form
    const form = new FormData()
    form.append("firstName", firstName)
    form.append("lastName", lastName)
    form.append("email", email)
    form.append("password", password)

    const res = await axios.post(`${endpoint}/auth/register`, form)

    console.log(res)

    return DecodeJwt(res.headers['authorization'])
  } catch (e) {
    toast.error("Oops! Something went wrong.", {
    })
  }

}