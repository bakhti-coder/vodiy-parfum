import { create } from "zustand";

import Cookies from "js-cookie";
import { TOKEN, USER } from "@/constants";
import { UserType } from "@/types/user";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface AuthTypes {
  isAuthenticated: boolean;
  user: UserType | null;
  setIsAuthenticated: (user: UserType) => void;
  logOut: (router: AppRouterInstance) => void;
}

const isLocalStorageAvailable = typeof localStorage !== "undefined";
const userJson = isLocalStorageAvailable ? localStorage.getItem('user') : null;
const user = userJson ? JSON.parse(userJson) : null

const useAuth = create<AuthTypes>((set, get) => ({
  isAuthenticated: Boolean(Cookies.get(TOKEN)),
  user,
  setIsAuthenticated: (user) => {
    const { isAuthenticated } = get();
    set({ isAuthenticated: !isAuthenticated, user });
  },
  logOut: (router) => {
    Cookies.remove(TOKEN)
    localStorage.removeItem(USER)
    set({ isAuthenticated: false, user: null });
    router.push('/')
  }
}));

export default useAuth;
