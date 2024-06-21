import { toast } from 'sonner';


export async function RegisterGoogle(
    endpoint:string,
    ){

    try {
        window.location.href = `${endpoint}/auth/google/callback`
        console.log("Redirecting to Google")
    } catch (e) {
        console.error(e)
        toast.error("Oops! Something went wrong.", {
        })
    }
}