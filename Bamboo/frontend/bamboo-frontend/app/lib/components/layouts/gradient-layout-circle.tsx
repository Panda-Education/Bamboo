import { cn } from '@/components/utils';


export default function GradientLayoutCircle(
  {
    className=""
  }:{
    className?:string
  }
){


  return(
    <div className={cn(`
    rounded-full absolute 
    w-[100px] h-[100px]
    bg-slate-500
    top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
    `, className)}/>
  )

}