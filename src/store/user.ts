import crud from "./crud";
import { UserType } from "@/types/user";

const useUser = crud<UserType>('user')

export default useUser