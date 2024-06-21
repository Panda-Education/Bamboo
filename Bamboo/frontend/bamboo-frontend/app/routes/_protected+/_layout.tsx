import { Outlet } from '@remix-run/react';
import { useState } from 'react';


export default function ProtectedAuthGuard(){


  return(
    <>
      <Outlet />
    </>
  )
}