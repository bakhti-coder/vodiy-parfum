import { Category } from "@/types/category"
import crud from "./crud"

const useCategory = crud<Category>('category')

export default useCategory