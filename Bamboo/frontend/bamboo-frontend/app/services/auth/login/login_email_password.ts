import { toast } from 'sonner';
import axios from 'axios';
import { DecodeJwt } from '../jwt/decode-jwt';

export async function LoginUserEmailPassword(
    endpoint:string,
    email:string,
    password:string
){
    try {
        //Create form
        const form = new FormData()
        form.append("email", email)
        form.append("password", password)

        const res = await axios.post(`${endpoint}/auth/login`, form, {withCredentials: true})

        console.log(res)

        toast.success(`Successfully logged in! Hello, ${email}!`)

        return DecodeJwt(res.headers['authorization'])
    } catch (e) {
        console.log(e)
        toast.error("Oops! Something went wrong.", {
        })
    }
}