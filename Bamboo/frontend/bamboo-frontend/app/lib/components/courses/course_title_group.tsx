import { H1 } from '@/components/shadcn/typography/typo-h1';
import { Lead } from '@/components/shadcn/typography/typo-lead';
import { H4 } from '@/components/shadcn/typography/typo-h4';
import { H3 } from '@/components/shadcn/typography/typo-h3';
import { H2 } from '@/components/shadcn/typography/typo-h2';


export function CourseTitleGroup(
  {
    title,
    description,
    isDraft,
    children
  }:{
    title:string
    description:string,
    isDraft:boolean,
    children?:any
  }
){

  return(
    <div className={`
    flex flex-row justify-between items-end
    border-b border-solid border-accent
    w-full mt-8
    p-gutter
    `}>
      <div className={`
      flex flex-col justify-start items-start
      gap-2
      `}>
        <H2>{title}</H2>
        <Lead>{description}</Lead>
      </div>
      {children}
    </div>
  )
}