"use client";

import useAddCart from "@/store/cart";
import cleanPrice from "@/utils/CleanedPrice";
import { Button, Tooltip } from "@mui/material";
import Image from "next/image";

const CartProducts = ({
  _id,
  image,
  title,
  description,
  price,
  prQuantity,
  quantity,
  handlePurchase,
}: any) => {
  const { decreaseQuantity, increaseQuantity, deleteProductInCart } =
    useAddCart();

  const priceProduct = prQuantity * +price;
  const cleanedPrice = cleanPrice(priceProduct);


  return (
    <div className="my-5 items-center flex flex-col bg-white border border-gray-200 rounded-lg shadow md:flex-row ">
      <div className="relative w-64 h-52">
        <Image
          src={image?.url}
          className="rounded-t-lg md:rounded-none md:rounded-l-lg"
          alt="image"
          fill
        />
      </div>
      <div className="flex-1 flex-col justify-between leading-normal">
        <div className="flex justify-between items-center pr-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
            {title}
          </h5>
          <Button
            className="flex items-center"
            onClick={() => deleteProductInCart(_id)}
          >
            <Image
              src="/images/delete-button-svgrepo-com.svg"
              alt="deleteicon"
              width={24}
              height={24}
            />
            <p className="text-black text-sm normal-case ml-2">{`Yo'q qilish`}</p>
          </Button>
        </div>

        <p className="mb-3 font-normal text-gray-700 ">{description}</p>

        <div className="flex justify-between items-center pr-5">
          <p>
            {`qoldi:`}
            {quantity} ta
          </p>
          <div className="flex flex-row items-center border border-gray-400 rounded-md bg-transparent">
            <button
              onClick={() => decreaseQuantity(_id)}
              disabled={prQuantity === 1 ? true : false}
              className={`bg-transparent  px-5 py-[3px]  rounded-l cursor-pointer ${
                prQuantity === 1 ? "text-gray-500" : "text-black"
              }`}
            >
              <span className="text-center text-2xl font-thin ">
                {" "}
                <i
                  className={` ${
                    prQuantity === 1 ? "bg-gray-500" : "bg-black"
                  } block h-[2px] w-3 m-auto`}
                ></i>{" "}
              </span>
            </button>
            <p className="px-1 text-md ">{prQuantity}</p>

            <button
              onClick={() => increaseQuantity(_id)}
              disabled={prQuantity === quantity ? true : false}
              className={`bg-transparent  px-5 py-[3px] rounded-r cursor-pointer ${
                prQuantity === quantity ? "text-gray-500" : "text-black"
              }`}
            >
              {prQuantity === quantity ? (
                <Tooltip
                  title={`Sotuvda faqat ${prQuantity} ta mahsulot bor`}
                  placement="top"
                >
                  <span className="text-center text-2xl font-thin "> + </span>
                </Tooltip>
              ) : (
                <span className="text-center text-2xl font-thin "> + </span>
              )}
            </button>
          </div>
          <p className="font-bold text-lg">
            {cleanedPrice}
            {` so'm`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartProducts;
