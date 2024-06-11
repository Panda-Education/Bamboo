

function HorizontalLine(){
  return(
    <div className={`
    w-full bg-slate-900 h-[1px] opacity-40
    `} />
  )
}


export default function TextHorizontalDivider(
  {children}:{children:any}
){


  return(
    <div className={`
    flex flex-row justify-center items-center
    gap-x-2
    text-slate-900
    opacity-30
    `}>
      <HorizontalLine />
      <span>{children}</span>
      <HorizontalLine />
    </div>
  )
}