"use client";

import useAddCart from "@/store/cart";
import { Products } from "@/types/products";
import { Tooltip } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ _id, image, title, description, price }: Products) => {
  const { addToCart, cart,decreaseQuantity, increaseQuantity } = useAddCart();

  const productInCart = cart.find((pr) => pr._id === _id);
  

  return (
    <div className="hover:shadow-sm bg-gray flex flex-col  border border-lightGray p-6 rounded-lg w-full h-full relative ">
      <Image
        src="/images/heart.svg"
        alt="shopbag"
        height={24}
        width={24}
        className="absolute top-2 right-2 z-50 cursor-pointer"
      />
      <div className="h-full w-full relative flex-1">
        <Link href={`products/${_id}`}>
          <div className="relative h-52 w-full">
            <Image
              src={image?.url}
              alt="img"
              fill
              className="overflow-hidden hover:scale-105 transition-transform ease-out duration-200"
            />
          </div>
        </Link>
      </div>
      <div className="font-semibold items-center mt-4 mb-1">
        <p className="w-full truncate my-2">{title}</p>
        <p className="tracking-widest text-indigo-500 text-xs font-medium title-font">
          {price}
          {`so'm`}
        </p>
      </div>
      <div className="flex justify-between items-center ">
        <p className="leading-relaxed text-base line-clamp-2">{description}</p>
        {productInCart ? (
          <div className="custom-number-input">
            <div className="flex flex-row items-center w-full rounded-lg bg-transparent">
              <button onClick={() => decreaseQuantity(_id)} className=" bg-blue-600 text-white hover:bg-blue-800 px-5 py-[3px]  rounded-l cursor-pointer">
                <span className="m-auto text-lg font-thin">-</span>
              </button>
              <p className="px-1 text-lg font-bold">{productInCart.prQuantity}</p>
              <button onClick={() => increaseQuantity(_id)} className="bg-blue-600 text-white hover:bg-blue-800 px-5 py-[3px]  rounded-r cursor-pointer">
                <span className="m-auto text-lg font-thin">+</span>
              </button>
            </div>
          </div>
        ) : (
          <Tooltip title="Savatga qo'shish" onClick={() => addToCart(_id)}>
            <Image
              src="/images/shopbag.svg"
              alt="shopbag"
              height={24}
              width={24}
              className="rounded-full p-[2px] hover:bg-gray-200 border border-gray-500 w-auto cursor-pointer "
            />
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
