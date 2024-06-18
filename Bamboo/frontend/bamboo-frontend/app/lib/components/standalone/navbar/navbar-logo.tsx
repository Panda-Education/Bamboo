

export default function NavbarLogo(){

  return(
    <span className={`
    md:w-full
    md:p-3 md:mb-9
    `}>
      <img src="/logo/Bamboo.svg" alt="Bamboo" className={`
      text-slate-900
      w-[12ch]
      md:w-full md:max-w-[12ch] 
      `}/>
    </span>
  )
}