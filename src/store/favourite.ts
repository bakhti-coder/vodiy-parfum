import { create } from "zustand";
import { Products } from "@/types/products";
import { FAVOURITE } from "@/constants";
import request from "@/server";

interface FavouriteTypes {
  favourite: Products[] | [];
  addTofavourite: (id: string) => void;
  deleteProductInFavourite: (id: string) => void;
}

const isLocalStorageAvailable = typeof localStorage !== "undefined";
const productFav = isLocalStorageAvailable
  ? localStorage.getItem(FAVOURITE)
  : null;
const favourite = productFav ? JSON.parse(productFav) : [];

const useAddFavourite = create<FavouriteTypes>((set, get) => ({
  favourite,
  addTofavourite: async (id) => {
    try {
      const { favourite } = get();
      const { data } = await request.get<Products>(`product/${id}`);
      
      let newFavourite;
      newFavourite = [...favourite, data];

      set({ favourite: newFavourite });
      localStorage.setItem(FAVOURITE, JSON.stringify(newFavourite));
    } finally {  
    }
    
  },
  deleteProductInFavourite: (id) => {
    const { favourite } = get();
    let newFavourite;
    newFavourite = favourite.filter((pr: any) => pr._id !== id);
    set({ favourite: newFavourite });
    localStorage.setItem(FAVOURITE, JSON.stringify(newFavourite));
  },
}));

export default useAddFavourite;
