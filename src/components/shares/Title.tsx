import Children from "@/types/children"


const Title = ({children, className}: any) => {
  return (
    <h1 className={`my-10 text-3xl font-bold ${className}`}>{children}</h1>
  )
}

export default Title