import {
  Dialog,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shadcn/ui/dialog';
import { Button } from '@/components/shadcn/ui/button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/shadcn/ui/form';
import { Input } from '@/components/shadcn/ui/input';
import { Textarea } from '@/components/shadcn/ui/textarea';
import { useServices } from '~/services/provider';
import { useNavigate } from '@remix-run/react';
import { toast } from 'sonner';


export default function CreateCourseDialogButton(
  {
    endpoint=""
  }:{
    endpoint?:string
  }
){

  const { course: {createCourse} } = useServices()

  const nav = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)

  const createCourseFormSchema = z.object({
    title: z.string().min(1, 'Required'),
    description: z.string(),
  })

  type CreateCourseFormType = z.infer<typeof createCourseFormSchema>

  const form = useForm<CreateCourseFormType>({
    resolver: zodResolver(createCourseFormSchema),
    defaultValues: {
      title: "",
      description: ""
    }
  })

  const submitCreateForm = (data:CreateCourseFormType) => {
    if(!endpoint){
      console.warn("[CreateCourseButton] Endpoint not specified!")
    }

    if(!loading){
      setLoading(true)
      createCourse(endpoint, data.title, data.description)
        .then((id) => {
          nav(`/tutor/courses/${id}`)
          toast.success("Course Created!")
        })
        .catch(()=>{toast.error(
          "Oops! Something went wrong!",
          {description: "An unexpected error occurred while trying to create your new course."})}
        )
        .finally(()=>{setLoading(false)})
    }

  }


  return(
    <Dialog>

      {/*Button element rendered on screen*/}
      <DialogTrigger asChild>
        <Button>Create course</Button>
      </DialogTrigger>

      {/*Dialog screen (modal popup)*/}
      <DialogContent className={`max-w-[45ch]`}>

        {/*Header content and descriptive text*/}
        <DialogHeader>
          <DialogTitle>
            Create new course
          </DialogTitle>
          <DialogDescription>
            Fill in the details below to set up your course. Add a title and description to get started.
          </DialogDescription>
        </DialogHeader>

        {/*Main body form content*/}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitCreateForm)}
            className={`
            flex flex-col justify-start items-stretch
            gap-y-2
            `}>

            {/*Title*/}
            <FormField
            control={form.control}
            name="title"
            render={({field}) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder={"Course title"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />

            {/*Description*/}
            <FormField
              control={form.control}
              name="description"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea className={`max-h-[50dvh]`} placeholder={"Description"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/*Footer*/}
            <DialogFooter className={`mt-4`}>
              <Button loading={loading} type={'submit'} variant={'default'}>Create course</Button>
            </DialogFooter>
          </form>
        </Form>

      </DialogContent>
    </Dialog>
  )

}