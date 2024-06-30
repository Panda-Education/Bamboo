import axios from 'axios';



type CreateCourseResponse = {
  course: {
    id: string
  }
}


export async function CreateCourse(
  endpoint:string,
  title:string,
  description:string
):Promise<string>{

  const res = await axios.post<CreateCourseResponse>(
    `${endpoint}/courses/create`,
    { title, description },
    { withCredentials: true }
  )

  return res.data.course.id

}