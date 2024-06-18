import NavbarDesktop from '@/components/standalone/navbar/navbar-desktop';
import NavbarMobile from '@/components/standalone/navbar/navbar-mobile';


export default function Navbar(
  {
    children
  }:{
    children?:any
  }
) {

  return(
    <div className={`
    `}>
      <NavbarDesktop>{children}</NavbarDesktop>
      <NavbarMobile>{children}</NavbarMobile>
    </div>
  )

}