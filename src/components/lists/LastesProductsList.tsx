"use client";
import { Products } from "@/types/products";
import ProductCard from "../card/ProductCard";
import { useState } from "react";
import { Button } from "@mui/material";

interface MyComponentProps {
  data: Products[];
}

const LastesProductsList: React.FC<MyComponentProps> = ({ data }) => {
  const [showProducts, setShowProducts] = useState(10);

  return (
    <>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {data.slice(0, showProducts).map((product, index) => (
        <ProductCard key={index} {...product} />
      ))}
        </div>
        <div className='max-w-708 w-92 m-auto my-8'>
        {data.length > showProducts ?  
            <Button variant="outlined" size="large" className="w-full" onClick={() => setShowProducts(showProducts + 5)}>Yana ko'rsatish 5</Button>
         : <Button variant="outlined" size="large" className="w-full" href="/products">Barcha mahsulotlar</Button>}
         </div>
     
    </>
  );
};

export default LastesProductsList;
