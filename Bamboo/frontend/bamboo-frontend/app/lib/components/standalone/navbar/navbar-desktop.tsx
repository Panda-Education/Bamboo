import NavbarLogo from '@/components/standalone/navbar/navbar-logo';
import NavbarAccount from '@/components/standalone/navbar/navbar-account';


export default function NavbarDesktop(
  {
    children
  }:{
    children?:any
  }
){

  return(
    <div className={`
    relative
    hidden md:flex
    flex-col justify-start items-start
    p-3 h-full w-[20ch] max-w-full
    border-r border-solid border-px border-slate-300
    `}>
      <NavbarLogo />
      <div className={`
      flex flex-col justify-start items-stretch
      w-full
      `}>
        {children}
      </div>
      <div className={`
      bg-white bg-opacity-50
      absolute left-0 bottom-0 right-0
      p-gutter backdrop-blur-lg
      `}>
        <NavbarAccount />
      </div>
    </div>

  )
}