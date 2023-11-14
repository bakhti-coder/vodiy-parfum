'use client'

import useAddFavourite from "@/store/favourite"
import Title from "../shares/Title"
import ProductCard from "../card/ProductCard"

const FavouriteList = () => {

  const {favourite} = useAddFavourite()

  return (
    <div>
      <Title>Sevimlilar</Title>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {favourite.map(el=> (
          <ProductCard key={el._id} {...el} />
        ))}
      </div>
    </div>
  )
}

export default FavouriteList