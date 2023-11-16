import { Products } from "@/types/products";
import crud from "./crud";

const useProducts = crud<Products>('product')

export default useProducts