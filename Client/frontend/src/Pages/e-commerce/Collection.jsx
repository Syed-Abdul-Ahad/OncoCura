import React, { useContext, useState, useEffect } from 'react';
import ShopContext from '../../context/ShopContext.js';
import Title from '../../components/shared/e-commerce/Title';
import ProductItem from '../../components/shared/e-commerce/ProductItem';
import SearchBar from '../../components/shared/e-commerce/SearchBar';

const Collection = () => {
  const { search, showSearch, products } = useContext(ShopContext);
  const [filterProducts, setFilterProducts] = useState([]);
  const [type, setType] = useState('');
  const [company, setCompany] = useState('');
  const [sortType, setSortType] = useState('relevant');

  const handleTypeInput = (e) => setType(e.target.value);
  const handleCompanyInput = (e) => setCompany(e.target.value);

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (type) {
      productsCopy = productsCopy.filter(
        (item) => item.type.toLowerCase() === type.toLowerCase()
      );
    }
    if (company) {
      productsCopy = productsCopy.filter(
        (item) => item.company && item.company.toLowerCase() === company.toLowerCase()
      );
    }

    setFilterProducts(productsCopy.reverse());
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    setFilterProducts(products);
  }, [products]);

  useEffect(() => {
    applyFilter();
  }, [type, company, search, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <>
      <h1 className='text-black font-semibold text-center text-4xl my-10'>Welcome to Estore!</h1>
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-2 bg-white rounded-xl border border-gray-200 shadow-xl">
        <div className="w-full bg-white px-12 py-6 mb-2">
          <div className="flex justify-between items-center mb-10">
            {/* Filters Section */}
            <div className="flex items-center gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium">Filter by Type</p>
              <input
                type="text"
                placeholder="Type (e.g., Medicine)"
                value={type}
                onChange={handleTypeInput}
                className="border border-gray-300 rounded-md px-2 py-1 text-sm"
              />
            </div>

              <div className="flex flex-col gap-1">
              <p className="text-sm font-medium">Filter by Company</p>
              <input
                type="text"
                placeholder="Company (e.g., PharmaCo)"
                value={company}
                onChange={handleCompanyInput}
                className="border border-gray-300 rounded-md px-2 py-1 text-sm"
              />
            </div>
          </div>
            <SearchBar />

            {/* Sort by Price Dropdown */}
            <select
              onChange={(e) => setSortType(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700"
            >
              <option value="relevant">Sort by Price: Relevant</option>
              <option value="low-high">Sort by Price: Low to High</option>
              <option value="high-low">Sort by Price: High to Low</option>
            </select>
          </div>
          {/* Title Section */}
          <Title text1="ALL" text2="PRODUCTS" />

          {/* Product Display */}
          <div className="grid grid-cols-2 px-6 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-8 mt-4">
            {filterProducts.map((item, index) => (
              <ProductItem
                key={index}
                id={item?._id}
                image={item?.images}
                name={item?.name}
                price={item?.price}
                type={item?.type}
                company={company?.company}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Collection;
