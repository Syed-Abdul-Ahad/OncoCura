import React, { useContext, useState } from 'react';
import ShopContext from '../../../context/ShopContext';
import { assets } from '../../../../public/assets';

const SearchBar = () => {
  const { search, setSearch } = useContext(ShopContext);
  const [inputValue, setInputValue] = useState(search); // Local state for input

  const handleSearch = () => {
    setSearch(inputValue); // Set the context state only when the search icon is clicked
  };

  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm font-medium">Search</p>
      <div className='flex items-center border-b border-gray-300 gap-28 rounded-none'>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} // Update local state
          className='flex-1 outline-none bg-inherit text-sm py-1'
          type='text'
          placeholder='Enter Name'
        />
        <img 
          src={assets.search_icon} 
          alt="search icon" 
          className="w-5 cursor-pointer" 
          onClick={handleSearch} // Trigger search on icon click
        />
      </div>
    </div>
  );
}

export default SearchBar;
