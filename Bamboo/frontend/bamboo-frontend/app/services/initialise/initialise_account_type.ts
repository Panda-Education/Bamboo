import { toast } from 'sonner';
import axios from 'axios';
import { useServices } from '~/services/provider';
import { DecodeJwt } from '~/services/auth/jwt/decode-jwt';
import { useAtom } from 'jotai';
import { JwtAtomSerialised } from '@/jotai/atoms/jwt-atom-serialised';


export async function InitialiseAccountType(
    endpoint:string,
    accountType:string,
    jwt_token:string
){

    const form = new FormData()
    form.append("accountType", accountType)
    form.append("jwt", jwt_token)

    const res = await axios.post(`${endpoint}/auth/initialise`, form, {withCredentials: true})

    return DecodeJwt(res.headers['authorization'])

}