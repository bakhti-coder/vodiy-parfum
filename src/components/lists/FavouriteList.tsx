'use client'

import useAddFavourite from "@/store/favourite"
import Title from "../shares/Title"
import ProductCard from "../card/ProductCard"
import Image from "next/image"
import Link from "next/link"

const FavouriteList = () => {

  const {favourite} = useAddFavourite()

  return (
    <div>
      {favourite.length === 0 ?
        <div className='flex flex-col items-center justify-center'>
       <Image src='/images/heartsno.webp' alt="nocart" height={100} width={200} />
       <h1 className="text-3xl my-3">{`Sizga yoqqanini qoʻshing`}</h1>
       <Link href='/products' className='underline my-1 text-blue-600 text-center'>{`Mahsulotdagi ♡ belgisini bosing. Barcha saralanganlar saqlanib qoladi`}</Link>
      </div> : 
      <>
      <Title>Sevimlilar</Title>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {favourite.map(el=> (
        <ProductCard key={el._id} {...el} />
      ))}
      </div>
      </>
    }
      
    </div>
  )
}

export default FavouriteList