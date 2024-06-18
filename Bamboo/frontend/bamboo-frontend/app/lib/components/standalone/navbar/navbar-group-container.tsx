

export default function NavbarGroupContainer(
  {
    name="",
    children=undefined
  }:{
    name?:string
    children?:any
  }
){

  return(
    <>
      <span className={`
      p-3 pt-8 text-sm opacity-50
      `}>{name}</span>
      {children}
    </>
  )
}