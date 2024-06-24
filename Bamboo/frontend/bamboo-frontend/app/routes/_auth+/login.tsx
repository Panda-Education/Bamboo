import GradientLayout from '@/components/layouts/gradient-layout';
import { MetaFunction } from '@remix-run/node';
import CardHeader from '@/components/card-title';
import { Button } from '@/components/shadcn/ui/button';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shadcn/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { Input } from '@/components/shadcn/ui/input';
import { Link, useLoaderData } from '@remix-run/react';
import * as process from 'node:process';
import { useServices } from '~/services/provider';

export const meta: MetaFunction = () => {
  return [
    {
      title: "Login to Bamboo"
    },
    {
      property: "og:title",
      content: "Login to Bamboo Learn, learning made simple"
    },
    {
      property: "description",
      content: `Login to our LMS for private tutors in Singapore. Manage your classes, track student progress, and access teaching resources. Streamline your tutoring business with our user-friendly platform. Secure and efficient learning management for tutors and students.`
    },
  ]
}

export async function loader() {

  const BACKEND:string = process.env.BACKEND || ""

  return {
    BACKEND
  }
}

export default function LoginRoute(){

  const {BACKEND} = useLoaderData<{
    BACKEND:string
  }>()

  const { auth } = useServices()
  const [loading, setLoading] = useState<boolean>(false)

  const loginFormSchema = z.object({
    email: z.string(),
    password: z.string()
  })

  type LoginFormType = z.infer<typeof loginFormSchema>

  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const submitForm = (data:LoginFormType) => {
    if (!loading){
      console.log(data)
      setLoading(true)
      auth.login.emailAndPassword(
        BACKEND,
        data.email,
        data.password
      ).then(() =>{
        setLoading(false);
      })
    }
  }

  const submitGoogleForm = () => {
    if (!loading){
      setLoading(true)
      auth.login.google(BACKEND).then(() =>{
        setLoading(false);
      })
    }
  }

  return(
    <GradientLayout>
      <div className={`flex flex-col justify-start items-stretch gap-y-6 md:w-[45ch] max-w-full`}>
        <CardHeader title={"Login"} subtitle={"Enter your email below to login to your account"}/>
        <Form {...form}>
          <form className={`grid grid-cols-2 gap-2`} onSubmit={form.handleSubmit(submitForm)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className={`col-span-2`}>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className={`col-span-2`}>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className={`flex flex-col justify-start items-stretch mt-4 gap-y-2 col-span-2`}>
              <Button loading={loading} type={'submit'} variant={'default'} className={``}>Login</Button>
              <Button type={'button'} variant={'outline'} onClick={submitGoogleForm}>Login with Google</Button>
            </div>
          </form>
        </Form>
        <div className={`w-full text-center text-slate-900 dark:text-white`}>
          <span>Don't have an account? </span>
          <span className={`decoration-1 underline underline-offset-4`}><Link to={"/register"}>Sign up</Link></span>
        </div>
      </div>
    </GradientLayout>
  )
}