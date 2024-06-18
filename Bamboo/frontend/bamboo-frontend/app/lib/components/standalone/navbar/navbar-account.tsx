import { Avatar, AvatarFallback, AvatarImage } from '@/components/shadcn/ui/avatar';
import { Button } from '@/components/shadcn/ui/button';
import { Ellipsis } from 'lucide-react';


export default function NavbarAccount(){

  return(
    <div className={`
    flex flex-row justify-start items-center gap-x-3
    w-full
    `}>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <span className={`w-full text-small text-slate-900`}>Johnnyboi</span>
      <Button variant={"link"} className={`p-2 -mr-2`}>
        <Ellipsis />
      </Button>
    </div>
  )

}