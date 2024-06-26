

function redirectBuilder(endpoint:string){
  return new Response(null, {
    status: 302,
    headers: {
      'Location': endpoint
    }
  })
}


export const RedirectStudentHome = redirectBuilder('/student')
export const RedirectTutorHome = redirectBuilder('/tutor')
export const RedirectGlobalHome = redirectBuilder('/')