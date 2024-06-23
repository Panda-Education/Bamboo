import { cn } from '@/components/utils';


export default function CardHeader(
  {
    title,
    subtitle="",
    className=""
  }:{
    title:string,
    subtitle?:string,
    className?:string
  }
){
  return(
    <div className={cn(`
    flex flex-col justify-start items-stretch
    gap-y-2
    `, className)}>
      <h1 className={`
      text-3xl font-semibold 
      tracking-tight 
      transition-colors
      first:mt-0
      text-slate-900 dark:text-white
      `}>{title}</h1>
      <span className={`
      leading-7
      text-slate-900 dark:text-white
      opacity-50
      `}>{subtitle}</span>
    </div>
  )
}