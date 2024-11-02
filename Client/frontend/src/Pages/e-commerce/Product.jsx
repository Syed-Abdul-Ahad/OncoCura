import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ShopContext from '../../context/ShopContext';
import RelatedProducts from '../../components/shared/e-commerce/RelatedProducts';

const Product = () => {
  const { id } = useParams(); // Changed to 'id' to match the route parameter
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null); // Default to null instead of false
  const [image, setImage] = useState('');

  useEffect(() => {
    const fetchProductData = () => {
      const item = products.find((product) => product._id === id);
      if (item) {
        setProductData(item);
        setImage(item.images[0]); // Assuming images[0] is the main image
      }
    };

    if (products.length) fetchProductData(); // Ensure products are loaded before fetching product data
  }, [id, products]);

  return productData ? (
    <div className='pt-16 transition-opacity ease-in duration-500 opacity-100 p-16 mt-10 bg-white rounded-xl border border-gray-200 shadow-xl'>
      {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row '>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productData.images.map((item, index) => (
              <img onClick={() => setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
            ))}
          </div>
          <div className='w-full sm:w-[80%] '>
            <img className='w-full h-auto ' src={image} alt="" />
          </div>
        </div>
        {/* Product info */}
        <div className='flex-1'>
          <h1 className='font-semibold text-3xl  mt-2 '>{productData.name}</h1>
          <p className='mt-5 text-base font-medium'>Company: {productData.company}</p>
          <p className='mt-4 text-base font-medium'>Type: <span className='border border-gray-400 px-2 py-1 rounded-full'>{productData.type}</span></p>
          <p className='mt-5 text-3xl text-[#0251CE] font-medium'>{currency} {productData.price}</p>
          <p className='mt-4 mb-5 text-gray-500 text-sm md:w-4/5 '>{productData.description}</p>
          <button onClick={() => addToCart(productData._id, 1)} className='bg-[#004DFF] text-white px-8 py-3 text-sm rounded-md active:bg-gray-700'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original Product</p>
            <p>Cash on delivery is available for the product.</p>
            <p>Easy return and exchange policy within 4 days.</p>
          </div>
        </div>
      </div>
      {/* Description Section */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500 '>
            <p>{productData.description}</p>
          </div>
        </div>
      </div>
      {/* Related Product */}
      <RelatedProducts type={productData.type} />
    </div>
  ) : (
    <div className='opacity-0'>Loading...</div> // Optional: show loading until product data is loaded
  );
}

export default Product;
