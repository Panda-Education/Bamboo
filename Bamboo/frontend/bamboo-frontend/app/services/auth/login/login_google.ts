import axios from 'axios';
import { toast } from 'sonner';
import { DecodeJwt } from '../jwt/decode-jwt';

export async function LoginGoogle(
    endpoint: string,
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