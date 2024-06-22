import { toast } from 'sonner';
import axios from 'axios';


export async function InitialiseAccountType(
    endpoint:string,
    accountType:string,
    jwt:string
){
    try {
        const form = new FormData()
        form.append("accountType", accountType)
        form.append("jwt", jwt)
        
        const res = await axios.post(`${endpoint}/auth/initialise`, form)

        console.log(res)

        toast.success(`Hello, ${accountType}!`)
    } catch (e) {
        toast.error("Oops! Something went wrong.", {
        })
    }
}