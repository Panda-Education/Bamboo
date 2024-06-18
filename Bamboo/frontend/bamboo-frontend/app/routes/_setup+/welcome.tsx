import GradientLayout from '@/components/layouts/gradient-layout';
import CardHeader from '@/components/card-title';
import SelectChunky from '@/components/standalone/select-chunky/select-chunky';
import { SelectChunkyOptionType } from '@/components/standalone/select-chunky/select-chunky.type';
import { useState } from 'react';
import { Button } from '@/components/shadcn/ui/button';


export default function SetupWelcomePage(){

  const [selectState, setSelectState] = useState<string>("")

  const options:SelectChunkyOptionType[] = [
    {
      label: "Student",
      value: "student",
      description: "Access personalised learning and connect with top tutors."
    },
    {
      label: "Tutor",
      value: "tutor",
      description: "Showcase your expertise and help students succeed."
    }
  ]

  const callback = (val:string) => {
    setSelectState(val)
  }

  const handleButtonClick = () => {
    if(selectState){
      console.log(`SUBMIT RESPONSE HERE!, ${selectState}`)
    }
  }

  return(
    <GradientLayout>
      <div className={`flex flex-col justify-start items-stretch gap-y-6 md:w-[45ch] max-w-full`}>
        <CardHeader title={"Set up your account"} subtitle={"Choose your account type to get started"} />
        <SelectChunky options={options} callback={callback} active={selectState} />
        <Button type={"submit"} variant={"default"} onClick={handleButtonClick}>
          Next
        </Button>
      </div>
    </GradientLayout>
)
}