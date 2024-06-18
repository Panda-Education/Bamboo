import Navbar from '@/components/standalone/navbar/navbar';
import { Outlet } from '@remix-run/react';
import NavbarElement from '@/components/standalone/navbar/navbar-element';
import { Folders, LayoutDashboardIcon, UserPlus2Icon, Users2Icon } from 'lucide-react';
import NavbarGroupContainer from '@/components/standalone/navbar/navbar-group-container';


export default function TutorLandingPage() {

  return(
    <div className={`
      flex 
      flex-col md:flex-row
      justify-start items-stretch
      min-h-screen max-w-screen
      `}>
      <Navbar>
        <NavbarElement url={"/tutor/"} icon={<LayoutDashboardIcon />}>Dashboard</NavbarElement>
        <NavbarElement url={"/tutor/courses"} icon={<Folders />}>Courses</NavbarElement>

        <NavbarGroupContainer name={"SRM"}>
          <NavbarElement url={"/tutor/my-students"} icon={<Users2Icon />}>Students</NavbarElement>
          <NavbarElement url={"/tutor/my-students/enroll"} icon={<UserPlus2Icon />}>Enroll Students</NavbarElement>
        </NavbarGroupContainer>
      </Navbar>
      <div className={`
      flex-grow-1
      `}>
        <Outlet />
      </div>
    </div>
  )
}