import { createContext, useContext } from 'react';
import { RegisterUserEmailPassword } from '~/services/auth/register_email_password';
import { RegisterGoogle } from '~/services/auth/register_google';


const services = {
  auth: {
    register: {
      emailAndPassword: RegisterUserEmailPassword,
      google: RegisterGoogle
    }
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