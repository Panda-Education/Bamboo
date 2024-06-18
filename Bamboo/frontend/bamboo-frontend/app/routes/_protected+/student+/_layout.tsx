import Navbar from '@/components/standalone/navbar/navbar';
import { Outlet } from '@remix-run/react';
import NavbarElement from '@/components/standalone/navbar/navbar-element';
import { Folders, LayoutDashboardIcon, UserPlus2Icon, Users2Icon } from 'lucide-react';
import NavbarGroupContainer from '@/components/standalone/navbar/navbar-group-container';


export default function StudentLayout() {

  return(
    <div className={`
      flex 
      flex-col md:flex-row
      justify-start items-stretch
      min-h-screen max-w-screen
      `}>
      <Navbar>
        <NavbarElement url={"/student/"} icon={<LayoutDashboardIcon />}>Dashboard</NavbarElement>
        <NavbarElement url={"/student/courses"} icon={<Folders />}>Courses</NavbarElement>
      </Navbar>
      <div className={`
      flex-grow-1
      `}>
        <Outlet />
      </div>
    </div>
  )
}