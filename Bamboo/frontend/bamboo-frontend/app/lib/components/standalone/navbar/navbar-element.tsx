import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from '@remix-run/react';


export default function NavbarElement(
  {
    url,
    icon="",
    children=""
  }:{
    url:string
    icon?:any
    children?:any
  }
){

  const location = useLocation()
  const [matches, setMatches] = useState<boolean>(false)

  useEffect(() => {

    const strippedPath = url.replace(/\/$/, '')
    const matchRegex = new RegExp(`^${strippedPath}/?$`)
    setMatches(matchRegex.test(location.pathname))


  }, [url, location]);


  return(
    <Link to={url} className={``}>
      <div className={`
      transition-all
      rounded-[6px]
      flex flex-row justify-start items-center
      gap-x-2
      p-3
      text-slate-700 
      ${matches?'bg-slate-100':'bg-white md:hover:bg-slate-50'}
      `}>
        {icon && <span>{icon}</span>}
        {children && <span>{children}</span>}
      </div>
    </Link>
  )
}