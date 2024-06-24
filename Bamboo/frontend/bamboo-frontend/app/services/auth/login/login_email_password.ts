import { toast } from 'sonner';
import axios from 'axios';

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

        const res = await axios.post(`${endpoint}/auth/login`, form)

        console.log(res)

        toast.success(`Successfully logged in! Hello, ${email}!`)
    } catch (e) {
        toast.error("Oops! Something went wrong.", {
        })
    }
}