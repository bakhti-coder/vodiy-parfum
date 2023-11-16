import { SearchIcon } from 'lucide-react'
import React from 'react'

const SearchInput = ({handleSearch, search}: any) => {
  return (
    <div className="relative w-full my-2">
    <input
      type="text"
      placeholder="Search..."
      onChange={handleSearch}
      value={search}
      className="border rounded-md px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
    />
    <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
      <SearchIcon />
    </span>
  </div>
  )
}

export default SearchInput