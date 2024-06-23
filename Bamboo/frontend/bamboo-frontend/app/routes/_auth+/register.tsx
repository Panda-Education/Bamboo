import GradientLayout from '@/components/layouts/gradient-layout';
import { MetaFunction } from '@remix-run/node';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CardHeader from '@/components/card-title';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/shadcn/ui/form';
import { Input } from '@/components/shadcn/ui/input';
import { Button } from '@/components/shadcn/ui/button';
import { Link, useLoaderData } from '@remix-run/react';
import React, { useState } from 'react';
import TextHorizontalDivider from '@/components/text-horizontal-divider';
import { RegisterUserEmailPassword } from '~/services/auth/register/register_email_password';
import { RegisterGoogle } from '~/services/auth/register/register_google';
import { useServices } from '~/services/provider';
import * as process from 'node:process';


export const meta: MetaFunction = () => {
  return [
    {
      title: "Register for Bamboo"
    },
    {
      property: "og:title",
      content: "Register Bamboo Learn, learning made simple"
    },
    {
      property: "description",
      content: `Register for our LMS tailored for private tutors in Singapore. Sign up now to manage your tutoring sessions, track student progress, and access a wealth of teaching resources. Join our community of educators and enhance your tutoring business with our comprehensive, user-friendly platform.`
    },
  ]
}

export async function loader(){

  const BACKEND:string = process.env.BACKEND || ""

  return {
    BACKEND
  }

}


export default function RegisterRoute(){

  const {BACKEND} = useLoaderData<{
    BACKEND:string
  }>()

  const { auth } = useServices()
  const [loading, setLoading] = useState<boolean>(false)

  const nameRegex = /^[a-zA-Z\s]+$/

  const registerFormSchema = z.object({

    firstName: z.string()
      .min(1, "Required")
      .regex(nameRegex, "First names can only contain letters and spaces"),

    lastName: z.string()
      .min(1, "Required")
      .regex(nameRegex, "Last names can only contain letters and spaces"),

    email: z.string()
      .min(1, "Required")
      .email("Invalid email format")
      .refine(email => !email.includes('+'), {
        message: "Alias emails are not allowed"
      }),

    password: z.string()
      .min(1, "Required")
      .min(8, "Passwords must be at least 8 characters long"),

    confirmPassword: z.string()
      .min(1, "Required"),

  }).refine(
    (val) => {return val.confirmPassword === val.password},
    (val) => {
      return {
        message: "Passwords do not match",
        path: ['confirmPassword']
      }
    }
  )

  type RegisterFormType = z.infer<typeof registerFormSchema>

  const form = useForm<RegisterFormType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  })

  const submitForm = (data:RegisterFormType) => {
    if(!loading){
      console.log(data)
      setLoading(true)
      auth.register.emailAndPassword(
        BACKEND,
        data.firstName, data.lastName,
        data.email, data.password
      ).then(()=>{setLoading(false)})
    }
  }

  const submitGoogleForm = () => {
    if (!loading) {
      setLoading(true);
      auth.register.google(
        BACKEND
      ).then(() => {
        setLoading(false);
      });
    }
  };

  return(
    <GradientLayout>
      <div className={`flex flex-col justify-start items-stretch gap-y-6 md:w-[45ch] max-w-full`}>
        <CardHeader title={"Sign up"} subtitle={"Enter your information to create an account"} />
        <Form {...form}>
          <form className={`grid grid-cols-2 gap-2`} onSubmit={form.handleSubmit(submitForm)}>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className={`col-span-1`}>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className={`col-span-1`}>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className={`col-span-2`}>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className={`flex flex-col justify-start items-stretch gap-y-2 col-span-2`}>
              <Button loading={loading} type={'submit'} variant={'default'} className={`col-span-2 mt-2`}>Create an account</Button>
              <TextHorizontalDivider>
                or
              </TextHorizontalDivider>
              <Button type={"button"} variant={'outline'} onClick={submitGoogleForm}>Continue with Google</Button>
            </div>
          </form>
        </Form>


        <div className={`w-full text-center text-slate-900 dark:text-white`}>
          <span>Already have an account? </span>
          <span className={`decoration-1 underline underline-offset-4`}><Link to={"/login"}>Login</Link></span>
        </div>
      </div>
    </GradientLayout>
  )
}