import { SelectChunkyOptionType } from '@/components/standalone/select-chunky/select-chunky.type';


export default function SelectChunkyOption(
  {
    option,
    current,
    callback
  }:{
    option:SelectChunkyOptionType,
    current:string,
    callback:(arg0:string)=>void
  }
){

  return(
    <button type={"button"} onClick={()=>{callback(option.value)}}
    className={`
    transition-all
    bg-white
    p-6 rounded-[6px] border border-solid border-px
    shadow
    ${current===option.value?"border-slate-900":"border-slate-300"}
    `}
    >
      <div className={`
      flex flex-row justify-start items-start
      gap-x-6
      `}>
        <span>
          <div className={`
          flex flex-row justify-center items-center
          rounded-full
          border-[2px] border-slate-900 border-solid
          w-6 h-6
          `}>
            <div className={`
            transition-all
            bg-slate-900 rounded-full
            w-[14px] h-[14px]
            ${current===option.value?"opacity-100":"opacity-0"}
            `}/>
          </div>
        </span>
        <div className={`
        flex flex-col justify-start items-stretch text-left
        text-slate-900
        gap-y-2
        `}>
          <span className={`font-bold text-xl leading-none`}>{option.label}</span>
          <span className={`opacity-50`}>{option.description}</span>
        </div>
      </div>
    </button>
  )

}
