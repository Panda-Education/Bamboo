import { SelectChunkyOptionType } from '@/components/standalone/select-chunky/select-chunky.type';
import SelectChunkyOption from '@/components/standalone/select-chunky/select-chunky-option';


export default function SelectChunky(
  {
    options,
    active="",
    callback=(arg0:string)=>{}
  }:{
    options:SelectChunkyOptionType[],
    active?:string,
    callback: (arg0: string)=>void
  }
){


  return(
    <div className={`
    w-full flex flex-col justify-start items-stretch gap-y-5
    `}>
      {
        options.map(opt => {
          return(
            <SelectChunkyOption option={opt} current={active} callback={callback} key={opt.value} />
          )
        })
      }
    </div>
  )

}