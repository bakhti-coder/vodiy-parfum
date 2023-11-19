"use client";

import useAddCart from "@/store/cart";
import useAddFavourite from "@/store/favourite";
import { Products } from "@/types/products";
import cleanPrice from "@/utils/CleanedPrice";
import Image from "next/image";
import Link from "next/link";
import { Tooltip } from "@mui/material";

const ProductCard = ({ _id, image, title, description, price }: Products) => {
  const { addToCart, cart } = useAddCart();
  const productInCart = cart.find((pr) => pr._id === _id);
  const cleanedPrice = cleanPrice(price);

  const { addTofavourite, deleteProductInFavourite, favourite } = useAddFavourite();

  const isInFavourite = favourite.some((pr) => pr._id === _id);

  const handleFavouriteClick = () => {
    if (isInFavourite) {
      deleteProductInFavourite(_id);
    } else {
      addTofavourite(_id);
    }
  };

  return (
    <div  className="hover:shadow-sm bg-gray flex flex-col  border border-lightGray p-6 rounded-lg w-full h-full relative ">
      <div onClick={handleFavouriteClick}>
      <Image
        src={isInFavourite ? `/images/heartsfill.png` : '/images/heart.svg'}
        alt="shopbag"
        height={24}
        width={24}
        className="absolute top-2 right-2 z-50 cursor-pointer"
        
      />
      </div>
      <div className="h-full w-full relative flex-1">
        <Link href={`/products/${_id}`}>
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
          {cleanedPrice}
          {`so'm`}
        </p>
      </div>
      <div className="flex justify-between items-center ">
        <p className="leading-relaxed text-base line-clamp-2">{description}</p>
        {productInCart ? (
          <Tooltip title="Savatga qo'shildi" onClick={() => addToCart(_id)}>
            <Image
              src="/images/succesaddcart.png"
              alt="shopbag"
              height={24}
              width={24}
              className="rounded-full p-[2px] w-auto cursor-pointer "
            />
          </Tooltip>
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
