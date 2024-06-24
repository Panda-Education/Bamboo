import { createContext, useContext } from 'react';
import { RegisterUserEmailPassword } from '~/services/auth/register/register_email_password';
import { RegisterGoogle } from '~/services/auth/register/register_google';
import { InitialiseAccountType } from './initialise/initialise_account_type';
import { DecodeJwt } from '~/services/auth/jwt/decode-jwt';
import { DeserialiseJwtJson } from '~/services/auth/jwt/deserialise-jwt-json';


const services = {
  auth: {
    register: {
      emailAndPassword: RegisterUserEmailPassword,
      google: RegisterGoogle
    },
    jwt: {
      deserialise: DeserialiseJwtJson,
      decode: DecodeJwt,
    },
    state: {

    }
  },
  account: {
    initialise: {
      accountType: InitialiseAccountType
    },
  }
}

const ServiceContext = createContext<typeof services>(services)


export function ServiceProvider({ children }:{ children?:any }){

  return(
    <ServiceContext.Provider value={services}>
      {children}
    </ServiceContext.Provider>
  )
}


export const useServices = () => {
  return useContext(ServiceContext)
}