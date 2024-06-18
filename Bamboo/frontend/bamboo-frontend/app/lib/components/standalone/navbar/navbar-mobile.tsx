import NavbarLogo from '@/components/standalone/navbar/navbar-logo';
import { Menu } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/shadcn/ui/sheet';
import { Button } from '@/components/shadcn/ui/button';
import { useLocation } from '@remix-run/react';


export default function NavbarMobile(
  {
    children
  }:{
    children?:any
  }
){

  const location = useLocation()
  const closeButtonRef = useRef(null)

  const [locationLatch, setLocationLatch] = useState(location)

  useEffect(()=>{

    if(location!==locationLatch){
      setTimeout(()=>{
        // @ts-ignore
        closeButtonRef.current?.click()
      }, 250)
    }

  }, [location])

  return(
    <div className={`
    md:hidden
    bg-white
    px-gutter py-gutter
    flex flex-row justify-between items-center gap-y-8
    border-b border-solid border-px border-slate-300
    `}>

      <NavbarLogo />

      <Sheet>
        <SheetTrigger>
          <Menu />
        </SheetTrigger>
        <SheetContent>
          <div className={`
          flex flex-col justify-start items-stretch
          mt-8
          `}>
            {children}
          </div>
          <SheetClose asChild ref={closeButtonRef} className={`hidden`}>
            <Button>Close</Button>
          </SheetClose>
        </SheetContent>
      </Sheet>

    </div>
  )
}