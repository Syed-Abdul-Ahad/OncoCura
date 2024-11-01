import React, { useContext, useState } from 'react';
import ShopContext from '../../context/ShopContext';
import Title from '../../components/shared/e-commerce/Title';
import { useEffect } from 'react';
import ProductItem from '../../components/shared/e-commerce/ProductItem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [type, setType] = useState('');
  const [company, setCompany] = useState('');
  const [sortType, setSortType] = useState('relevant');

  const handleTypeInput = (e) => {
    setType(e.target.value);
  };

  const handleCompanyInput = (e) => {
    setCompany(e.target.value);
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (type) {
      productsCopy = productsCopy.filter(item => item.type.toLowerCase() === type.toLowerCase());
    }

    if (company) {
      productsCopy = productsCopy.filter(item => item.company && item.company.toLowerCase() === company.toLowerCase());
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
        break;

      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    setFilterProducts(products);
  }, []);

  useEffect(() => {
    applyFilter();
  }, [type, company, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      
      <div className='min-w-60'>
        <p className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS</p>
        
        {/* Type Input Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <input 
              type="text"
              placeholder="Type (e.g., Medicine)"
              value={type}
              onChange={handleTypeInput}
              className="border border-gray-300 px-2 py-1 text-sm"
            />
          </div>

          {/* Company Input Filter */}
          <p className='mt-4 mb-3 text-sm font-medium'>COMPANY</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <input 
              type="text"
              placeholder="Company (e.g., PharmaCo)"
              value={company}
              onChange={handleCompanyInput}
              className="border border-gray-300 px-2 py-1 text-sm"
            />
            <button
              onClick={applyFilter}
              className="mt-2 bg-blue-500 text-white px-3 py-1 text-sm"
            >
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'PRODUCTS'} />
          
          {/* Product Sort */}
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2 py-0'>
            <option value="relevant">Sort by Price: Relevant</option>
            <option value="low-high">Sort by Price: Low to high</option>
            <option value="high-low">Sort by Price: High to low</option>
          </select>
        </div>

        {/* Map products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filterProducts.map((item, index) => (
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} type={item.type} />
          ))}
        </div>
      </div>

    </div>
  );
};

export default Collection;
