import { Category } from '@/types/category'
import React from 'react'

const CategoryCard = ({ _id, name, image }: Category) => {
  return (
    <div className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden mx-auto">
    <img className="w-full h-56 object-cover object-center" src={image.url} alt={name} />
    <div className="py-4 px-6">
      <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
      <div className="mt-2 flex items-center justify-between">
        <button className="text-sm text-indigo-500 hover:text-indigo-600">Batafsil</button>
      </div>
    </div>
  </div>
  )
}

export default CategoryCard