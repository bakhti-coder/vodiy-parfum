"use client";

import { ProductsImage } from "@/types/products";
import Image from "next/image";
import { FC, useState } from "react";

interface Props {
  image: ProductsImage;
  fill?: boolean;
}

const CustomImage: FC<Props> = ({ image, fill }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {fill ? (
        <Image
          src={image?.url}
          alt="img"
          fill
          className={`object-contain duration-700 ease-in-out group-hover:opacity-75 ${
            isLoading
              ? "scale-110 blur-2xl grayscale"
              : "scale-100 blur-0 grayscale-0"
          }}`}
          onLoadingComplete={() => setIsLoading(false)}
        />
      ) : (
        <Image
          src={image?.url}
          alt="img"
          className={`object-contain duration-700 ease-in-out group-hover:opacity-75  ${
            isLoading
              ? "scale-110 blur-2xl grayscale"
              : "scale-100 blur-0 grayscale-0"
          }}`}
        />
      )}
    </>
  );
};

export default CustomImage;
