import GradientLayout from '@/components/layouts/gradient-layout';
import CardHeader from '@/components/card-title';
import SelectChunky from '@/components/standalone/select-chunky/select-chunky';
import { SelectChunkyOptionType } from '@/components/standalone/select-chunky/select-chunky.type';
import { useState } from 'react';
import { json, useLoaderData } from '@remix-run/react';
import { Button } from '@/components/shadcn/ui/button';
import { LoaderFunction } from '@remix-run/node';
import { parse } from 'cookie';
import jwt from 'jsonwebtoken';
import { useServices } from '~/services/provider';
import { useAtom } from 'jotai';
import { JwtAtomSerialised } from '@/jotai/atoms/jwt-atom-serialised';
import { toast } from 'sonner';

// //Loader function for cookies
export const loader: LoaderFunction = async ({request}) => {

  const BACKEND = process.env.BACKEND || ""

  const cookieHeader = request.headers.get('Cookie')
  const cookies = parse(cookieHeader || "")
  const token = cookies['jwt']

  // Return JWT to make it available in the component
  return json({jwt: token, BACKEND})
}


export default function SetupWelcomePage(){

  const { jwt, BACKEND } = useLoaderData<{
    jwt: string,
    BACKEND: string
  }>()

  const { account } = useServices()
  const [selectState, setSelectState] = useState<string>("")

  const [loading, setLoading] = useState<boolean>(false)

  const [_, setUserJwt] = useAtom(JwtAtomSerialised)

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
    if(selectState && !loading){
      setLoading(true)
      console.log(jwt)
      account.initialise.accountType(
        BACKEND,
        selectState,
        jwt
      )
        .then(j => {
          setUserJwt(JSON.stringify(j))
          setLoading(false)
          console.log(j)
          toast(`Hello, ${j.firstName}!`)
        })
        .catch((e)=>{
          console.error(e)
          toast.error('Oops! Something went wrong!', {
            description: "Something went wrong while trying to set up your account."
          })
        })
    }
  }

  return(
    <GradientLayout>
      <div className={`flex flex-col justify-start items-stretch gap-y-6 md:w-[45ch] max-w-full`}>
        <CardHeader title={"Set up your account"} subtitle={"Choose your account type to get started"} />
        <SelectChunky options={options} callback={callback} active={selectState} />
        <Button type={"submit"} variant={"default"} loading={loading} onClick={handleButtonClick}>
          Next
        </Button>
      </div>
    </GradientLayout>
)
}