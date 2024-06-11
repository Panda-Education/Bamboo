import GradientLayoutCircle from '@/components/layouts/gradient-layout-circle';


export default function GradientLayout(
  {
    children
  }:{
    children:any
  }
){

  return(
    <div className={`
    w-full h-full
    min-h-[100dvh]
    flex 
    flex-col justify-start
    items-stretch
    md:flex-row md:justify-center 
    `}>

      {/*Children elements*/}
      <div className={`
      w-full bg-white dark:bg-slate-950
      flex-shrink-0
      max-w-full md:max-w-prose
      px-gutter
      md:p-gutter
      flex flex-col justify-start items-stretch
      md:justify-center md:items-center
      md:shadow-lg
      `}>
        {children}
      </div>

      {/*Gradient portion*/}
      <div className={`
      hidden md:block
      md:relative flex-grow
      blur-3xl opacity-100
      -z-50
      w-full md:min-h-[100dvh]
      `}>
        <GradientLayoutCircle className={`top-[50%] left-[50%] w-[500px] h-[500px] bg-slate-50`} />
        <GradientLayoutCircle className={`top-[25%] left-[25%] w-[400px] h-[400px] bg-slate-200`} />
        <GradientLayoutCircle className={`top-[70%] left-[50%] w-[450px] h-[450px] bg-slate-300`} />
        <GradientLayoutCircle className={`top-[55%] left-[80%] w-[450px] h-[450px] bg-slate-300`} />
        <GradientLayoutCircle className={`top-[10%] left-[10%] w-[400px] h-[400px] bg-slate-200`} />
        <GradientLayoutCircle className={`top-[30%] left-[90%] w-[350px] h-[350px] bg-slate-200`} />
        <GradientLayoutCircle className={`top-[30%] left-[90%] w-[350px] h-[350px] bg-slate-200`} />
        <GradientLayoutCircle className={`top-[90%] left-[10%] w-[200px] h-[200px] bg-slate-200`} />
        <GradientLayoutCircle className={`top-[70%] left-[20%] w-[400px] h-[400px] bg-slate-100`} />
        <GradientLayoutCircle className={`top-[50%] left-[50%] w-[80%] h-[80%] bg-slate-50 opacity-30`} />
      </div>

    </div>
  )
}