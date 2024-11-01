import React, { useState } from 'react'
import { useContext } from 'react';
import {useParams} from 'react-router-dom'
import ShopContext from '../../context/ShopContext';
import { useEffect } from 'react';
import RelatedProducts from '../../components/shared/e-commerce/RelatedProducts';

const Product = () => {

  const {productId} = useParams();
  const {products, currency, addToCart} = useContext(ShopContext);
  const [productData, setProductData] = useState(false) 
  const [image, setImage] = useState('')
  
  const fetchProductData = async () => {
    products.map((item)=>{
      if(item._id===productId){
        setProductData(item)
        setImage(item.image[0])                
        return null;
      }
    })
  }

  useEffect(()=>{
    fetchProductData();
  },[productId])

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row '>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item, index)=>(
                <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt=""/>
              ))
            }
          </div>
          <div className='w-full sm:w-[80%] '>
              <img className='w-full h-auto ' src={image} alt="" />
          </div>
        </div>
        {/* Product info */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl  mt-2 '>{productData.name}</h1>
          <p className='mt-5 text-3xl font-medium'>{productData.company}</p>
          <p className='mt-5 text-3xl font-medium'>{productData.type}</p>
          <p className='mt-5 text-3xl font-medium'>{currency} {productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5 '>{productData.description}</p>
          <button onClick={()=>addToCart(productData._id)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700  '>ADD TO CART</button>
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
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo optio quam quidem assumenda deleniti minus ad fugit, a ut iure animi fuga, commodi omnis culpa illum architecto. Aspernatur praesentium accusantium repellat modi alias, enim et quaerat sequi! Neque mollitia adipisci aliquam est asperiores odio reiciendis laboriosam molestiae nesciunt libero! Eius, veniam. Officia nostrum excepturi odit, amet ad dicta autem omnis fugit sit, odio mollitia velit eos, inventore quos expedita eaque cupiditate officiis consequatur delectus minus voluptas. Quae odio, adipisci voluptatum officiis, esse consequuntur eos quibusdam quod totam sequi, neque fuga optio ea hic repellat eligendi. Debitis, quisquam sapiente. Ipsum, ullam?</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt obcaecati corrupti necessitatibus suscipit molestias quam hic dicta, id esse illo impedit, perspiciatis, unde aliquam.</p>
          </div>
        </div>
      </div>
      {/* Related Product */}
      <RelatedProducts type={productData.type}/>
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product
