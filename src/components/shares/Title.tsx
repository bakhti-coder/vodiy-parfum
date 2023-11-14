import Children from "@/types/children"


const Title = ({children}: Children) => {
  return (
    <h1 className="my-10 text-3xl font-bold">{children}</h1>
  )
}

export default Title