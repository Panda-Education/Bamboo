import { useLocation, useNavigate, useSearchParams } from '@remix-run/react';
import { useEffect } from 'react';
import { useServices } from '~/services/provider';
import { JwtAtomSerialised } from '@/jotai/atoms/jwt-atom-serialised';
import { useAtom } from 'jotai';
import { JwtPayload, UserAccountTypes } from '~/types/auth/jwt.types';
import UrlScopeRestriction from '~/utils/url-scope-restriction';
import axios from 'axios';

export default function AuthGuard(
  {
    children
  }:{
    children?:any
  }
) {

  const nav = useNavigate()

  const { auth: {jwt} } = useServices()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [jwtString, setJwtString] = useAtom(JwtAtomSerialised)



  /**
   * Effect to update local storage if token is made present in the URL.
   */
  useEffect(() => {
    const urlToken = searchParams.get("token")
    if(urlToken && urlToken!==''){

      // Remove token from URL
      searchParams.delete("token")
      setSearchParams(searchParams)

      // Persists token if it is valid
      const updateStoredToken = async () => {
        const jwtPayload = await jwt.decode(urlToken)
        setJwtString(JSON.stringify(jwtPayload))
      }
      updateStoredToken().catch(console.error)
    }
  }, [searchParams])


  /**
   * Effect to ensure loaded routes align to JWT user type
   */
  useEffect(()=>{
  
    if(!jwtString || jwtString===''){
      return
    }

    (async ()=>{
      const currentUser = jwt.deserialise(jwtString)
      const currentPath = location.pathname
  
      switch (currentUser.userType){
        case UserAccountTypes.Tutor:
          UrlScopeRestriction(
            currentPath,
            ['/tutor'],
            ()=>{nav('/tutor')}
          )
          break
        case UserAccountTypes.Student:
          UrlScopeRestriction(
            currentPath, ['/student'],
            ()=>{nav('/student')}
          )
          break
        case UserAccountTypes.Uninitialised:
          UrlScopeRestriction(
            currentPath, ['/welcome'],
            ()=>{nav('/welcome')}
          )
          break
        default:
          UrlScopeRestriction(
            currentPath, ['/login', '/register'],
            ()=>{nav('/login')}
          )
          break
      }
    })()
  
  }, [location])


  //Function to clear cookies and jwt token
  const clearJwtCookie = async () => {
    // clear HTTPOnly cookie
    try {
      const response = await axios.get(`${process.env.BACKEND}/auth/cookies`, {withCredentials: true})
      if (response.status === 200) {
        //Token is expired and clear it from storage
        setJwtString('') // Clear the Jwt token
        nav('/login')
      }
    } catch (error) {
      console.error('Failed to clear JWT cookie',error)
    }
  }

  /**
   * Effect to redirect user when JWT has changed
   */
  useEffect(() => {

    // TODO PDB-90
    // console.log(jwtString)
    try{
    
    
      // User has logged out
      if(!jwtString){
        UrlScopeRestriction(location.pathname, ['/login', '/register'],
          ()=>{nav('/login')})
      }

      // Decode the token to access the exp claim
      const decodedToken = jwt.decode(jwtString) as JwtPayload

      if (decodedToken.exp && Date.now() >= decodedToken.exp * 1000) {
        clearJwtCookie()
        return
      }
      // User has JWT
      if(jwtString && jwtString!==''){
        const jwtPayload:JwtPayload = jwt.deserialise(jwtString)
        
        switch (jwtPayload.userType){
          case UserAccountTypes.Student:
            nav('/student')
            break
          case UserAccountTypes.Tutor:
            nav('/tutor')
            break
          case UserAccountTypes.Uninitialised:
            nav('/welcome')
            break
          default:
            console.log(jwtPayload)
            nav('/login')
            break
        }
    
      }
    } catch (e) {
      console.error(e)
    }

  }, [jwtString, nav, location.pathname, setJwtString]);



  return(
    <>{children}</>
  )

}