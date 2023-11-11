import { create } from "zustand";

import { Products } from "@/types/products";
import { CART } from "@/constants";
import request from "@/server";

interface CartTypes {
  cart: Products[] | [];
  addToCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
}

const isLocalStorageAvailable = typeof localStorage !== "undefined";
const productCard = isLocalStorageAvailable ? localStorage.getItem(CART) : null;
const cart = productCard ? JSON.parse(productCard) : [];

const useAddCart = create<CartTypes>((set, get) => ({
  cart,
  addToCart: async (id) => {
    try {
      const { cart } = get();
      const { data } = await request.get(`product/${id}`);
      let newCart;

      // productInCart boshlang'ich qiymati
      let productInCart: any = cart.find((pr: any) => pr._id === id);

      if (productInCart) {
        // prQuantity aniqlanmagan bo'lsa uni 0 qilib ishlatish
        const prQuantity = productInCart.prQuantity || 0;

        newCart = cart.map((pr: any) => {
          if (pr._id === id) {
            pr.prQuantity = prQuantity + 1;
          }
          return pr;
        });
      } else {
        // data prQuantity qo'shish
        data.prQuantity = 1;
        newCart = [...cart, data];
      }
      set({ cart: newCart });
      localStorage.setItem(CART, JSON.stringify(newCart));
    } finally {
    }
  },
  increaseQuantity: (id) => {
    const { cart } = get();
    const newCart = cart.map((pr: any) => {
      if (pr._id === id) {
        pr.prQuantity++;
      }
      return pr;
    });
    set({ cart: newCart });
    localStorage.setItem(CART, JSON.stringify(newCart));
  },
  decreaseQuantity: (id) => {
    const { cart } = get();
    let newCart;

    let productInCart: any = cart.find((pr: any) => pr._id === id);
    console.log(productInCart);

    if (productInCart.prQuantity > 1) {
      newCart = cart.map((pr: any) => {
        if (pr._id === id) {
          pr.prQuantity--;
        }
        return pr;
      });
    } else {
      newCart = cart.filter((pr: any) => pr._id !== id);
    }
    set({ cart: newCart });
    localStorage.setItem(CART, JSON.stringify(newCart));
  },
}));

export default useAddCart;
