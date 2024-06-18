import NavbarLogo from '@/components/standalone/navbar/navbar-logo';


export default function NavbarDesktop(
  {
    children
  }:{
    children?:any
  }
){

  return(
    <div className={`
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
    </div>
  )
}