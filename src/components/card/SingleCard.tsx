"use client";

import useAddCart from "@/store/cart";
import useAddFavourite from "@/store/favourite";
import cleanPrice from "@/utils/CleanedPrice";
import Image from "next/image";
import { Button, Tooltip } from "@mui/material";
import { Products } from "@/types/products";
import { useState } from "react";
import request from "@/server";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const SingleCard = ({sold, _id, title, price, description, image, quantity, category}: Products) => {
  const router = useRouter()
  const [purchaseQuantitiy, setPurchaseQuantity] = useState(1)
  const [loading, setLoading] = useState(false)

  const { addTofavourite, deleteProductInFavourite, favourite } =
    useAddFavourite();

  const {
    addToCart,
    cart,
  } = useAddCart();

  const productInCart = cart.find((pr) => pr._id === _id);

  const allPrice = price * purchaseQuantitiy
  const cleanedPrice = cleanPrice(allPrice);
  const isInFavourite = favourite.some((pr) => pr._id === _id);

  const handleFavouriteClick = () => {
    if (isInFavourite) {
      deleteProductInFavourite(_id);
    } else {
      addTofavourite(_id);
    }
  };

  async function handlePurchase() {
    const purchaseProduct = {
      cart: [
        {
          product: _id,
          quantity: purchaseQuantitiy
        }
      ]
    }
    try {
      setLoading(true)
      const {data} = await request.post('payment', purchaseProduct)
      toast.success(data.msg, { autoClose: 1000 })
      router.push('/orders')
     } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-start flex-wrap md:flex-nowrap mt-10">
      <div data-aos="fade-up" className="max-w-[600px]">
        <Image src={image?.url} width={1000} height={400} alt="img" />
      </div>
      <div className="md:pt-0 pt-5 ml-0 md:ml-20 w-full">
        <div className="flex justify-between mb-3">
          <p className="text-gray-500 text-sm">{sold} ta buyurtma</p>
          <div
            onClick={handleFavouriteClick}
            className="flex items-center gap-2"
          >
            <span className="font-extralight">Istaklarga</span>
            <Image
              src={
                isInFavourite ? `/images/heartsfill.png` : "/images/heart.svg"
              }
              alt="shopbag"
              height={24}
              width={24}
              className="cursor-pointer"
            />
          </div>
        </div>
        <div>
          <p className="mt-5 text-sm">Mahsulot haqida: {description}</p>
        </div> 
        <h1 className="text-[24px]">{title}</h1>

        <hr className="h-px my-8 bg-gray-400 border-0" />

        <div className="flex items-center">
          <div className="flex flex-row items-center border border-gray-400 rounded-md bg-transparent w-32">
            <button
              onClick={() => setPurchaseQuantity(purchaseQuantitiy - 1)}
              disabled={purchaseQuantitiy === 1 ? true : false}
              className={`bg-transparent  px-5 py-[3px]  rounded-l cursor-pointer ${
                purchaseQuantitiy === 1 ? "text-gray-500" : "text-black"
              }`}
            >
              <span className="text-center text-2xl font-thin ">
                <i
                  className={` ${
                    purchaseQuantitiy === 1 ? "bg-gray-500" : "bg-black"
                  } block h-[2px] w-3 m-auto`}
                ></i>
              </span>
            </button>
            <p className="px-1 text-md ">{quantity === 0 ? quantity : purchaseQuantitiy}</p>

            <button
              onClick={() => setPurchaseQuantity(purchaseQuantitiy + 1)}
              disabled={purchaseQuantitiy >= quantity ? true : false}
              className={`bg-transparent  px-5 py-[3px] rounded-r cursor-pointer ${
                purchaseQuantitiy >= quantity
                  ? "text-gray-500"
                  : "text-black"
              }`}
            >
              {purchaseQuantitiy >= quantity ? (
                <Tooltip
                  title={`Sotuvda faqat ${quantity} ta mahsulot bor`}
                  placement="top"
                >
                  <span className="text-center text-2xl font-thin "> + </span>
                </Tooltip>
              ) : (
                <span className="text-center text-2xl font-thin "> + </span>
              )}
            </button>
          </div>
          <p className="text-[#00A645] text-sm font-light ml-3">
            Sotuvda {quantity} dona bor
          </p>
        </div>

        <div className="flex flex-col my-4">
          <p>Narx:</p>
          <span className="font-bold text-[26px]">
            {cleanedPrice} {`so'm`}
          </span>
        </div>

        <div className="flex flex-col items-center gap-5">
          {loading ? <Button variant="outlined" className="w-full mb-5" size="large" disabled>Loading...</Button> : <Button variant="outlined" className="w-full mb-5" size="large" onClick={handlePurchase}>Tugmani bir bosishda xarid qilish</Button>}
            
            <Button variant="contained" className="w-full" size="large" onClick={() => addToCart(_id)} disabled={productInCart ? true : false}> {productInCart ? 'Savatga qo\'shildi' : 'Savatga qo\'shish'} </Button>
        </div>
      </div>
    </div>
  );
};

export default SingleCard;
