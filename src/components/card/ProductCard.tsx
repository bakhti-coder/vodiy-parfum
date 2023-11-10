import { Products } from "@/types/products";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ _id, image, title, description, price }: Products) => {
  return (
    <div className="hover:shadow-sm bg-gray flex flex-col lg:mx-0 mx-5  border border-lightGray p-6 rounded-lg  h-full relative ">
      <Image
        src="/images/heart.svg"
        alt="shopbag"
        height={24}
        width={24}
        className="absolute top-4 right-4 z-50 cursor-pointer"
      />
      <div className="h-full w-full relative flex-1">
        <Link href={`products/${_id}`}>
          <div className="relative h-72 w-full">
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
        <Image
          src="/images/shopbag.svg"
          alt="shopbag"
          height={24}
          width={24}
          className="rounded-full p-[2px] hover:bg-gray-200 border border-gray-500 w-auto cursor-pointer "
        />
      </div>
    </div>
  );
};

export default ProductCard;
