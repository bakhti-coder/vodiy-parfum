"use client";

import useAddCart from "@/store/cart";
import CartProducts from "../card/CartProducts";
import cleanPrice from "@/utils/CleanedPrice";
import React, { useState } from "react";
import request from "@/server";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const PaymenCart = () => {
  const router = useRouter()
  const { cart } = useAddCart();
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const totalPriceQuanity = cart.reduce(
    (acc: number, pr: any) => acc + pr.price * pr.prQuantity,
    0
  );
  const handlePurchase = async () => {
    const cartData = {
      cart: cart.map((item) => ({ product: item._id, quantity: item.prQuantity })),
      comment,
    };
    try {
      setLoading(true)
      const {data} = await request.post('payment', cartData)
      toast.success(data.msg, { autoClose: 1000 })
      router.push('/orders')
     } finally {
      setLoading(false)
    }
  };
  
  const cleanedPrice = cleanPrice(totalPriceQuanity);

  return (
    <div>
      {cart.length === 0 ? (
       <div className='flex flex-col items-center justify-center'>
       <Image src='/images/shopocat.webp' alt="nocart" height={100} width={200} />
       <h1 className="text-3xl my-3">{`Savatda mahsulot yo'q`}</h1>
       <Link href='/products' className='underline my-1 text-blue-600 text-center'>Xarid qilish</Link>
     </div>
      ) : (
        <div className="w-full">
           <h1 className="text-3xl font-extrabold">
            Savatingiz,
        <span className="text-gray-400 font-normal">
          {cart.length} mahsulot
        </span>
        </h1>
          {cart.map((pr) => (
            <CartProducts key={pr._id} {...pr} handlePurchase={handlePurchase} />
          ))}
          <div className="flex items-center justify-between">
            <div>
              <textarea
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                rows={3}
                cols={50}
                className="border p-2 rounded-md w-full"
                placeholder="Izoh qoldiring..."
              />
            </div>
            <div className="flex items-center">
              {loading ? <button
              disabled={true}
              type="button"
              className="bg-orange-600 py-2 px-4 rounded-lg"
            >
              <svg
                aria-hidden="true"
                role="status"
                className="inline mr-3 w-4 h-4 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                ></path>
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                ></path>
              </svg>
              Loading...
            </button> : <button
                onClick={handlePurchase}
                className="bg-orange-600 py-2 px-4 rounded-lg"
              >
                Sotib olish
              </button>}
              
              <p className="text-indigo-800 font-bold text-2xl ml-3">
                {cleanedPrice}som
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymenCart;
