import React, { useContext, useEffect, useState } from 'react'
import ShopContext from '../../context/ShopContext';
import Title from '../../components/shared/e-commerce/Title';
import { assets } from '../assets/assets';
import CartTotal from '../../components/shared/e-commerce/CartTotal';

const Cart = () => {
  const {products, cartItems, currency, updateQuantity, navigate} = useContext(ShopContext);
  const [cartData,setCartData]=useState([]);

  useEffect(() => {
    const tempData = [];
    if (products.length >0) {
      // Iterate over cartItems directly
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        tempData.push({
          _id: itemId,
          quantity: cartItems[itemId],
        });
      }
    }
  
    setCartData(tempData);
    }
  
  }, [cartItems, products]);
  

  return (
    <div className='border-t pt-14 '>
      <div className='text-2xl mb-3'>
        <Title text1={"YOUR"} text2={"CART"}/>
      </div>
      <div className=''>
        {cartData.map((item,index)=>{
          const productData= products.find((product)=>product._id ===item._id);

          return (
            <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center  gap-4'>
              <div className='flex items-start gap-6 '>
                <img className='w-16 sm:w-20' src={productData.image[0]} alt=""/>
                <p className='text-xs sm:text-lg font-medium '>{productData.name}</p>
                <div className='flex items-center gap-5 mt-2'>
                  <p>{currency}{productData.price}</p>
                </div>
              </div>
                   {/* Update quantity based on user input */}
                   <input
                onChange={(e) => {
                  const value = e.target.value === '' ? '' : Math.max(1, Number(e.target.value)); // Minimum of 1
                  updateQuantity({ itemId: item._id, quantity: value === '' ? 1 : value });
                }}
                onBlur={(e) => {
                  if (e.target.value === '' || e.target.value === '0') {
                    updateQuantity({ itemId: item._id, quantity: 0 }); // Remove item if empty or zero
                  }
                }}
                className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1'
                type="number"
                min={1}
                defaultValue={item.quantity}
              />
              <img
                onClick={() => { updateQuantity({ itemId: item._id, quantity: 0 }); }}
                className='w-5 mr-4 cursor-pointer'
                src={assets.bin_icon}
                alt="Remove item"
              />
              {/* <input onChange={(e)=>e.target.value==='' || e.target.value==='0' ? null : updateQuantity(item._id,Number(e.target.value))} className='border max-w-10  sm:max-w-20 px-1 sm:px-2 py-1 ' type="number" min={1} defaultValue={item.quantity} />
              <img onClick={()=>{updateQuantity(item._id,0)}} className='w-5 mr-4 cursor-pointer' src={bin_img} alt="" /> */}
            </div>
          )
        })}
      </div>
      <div className='flex justify-end my-20 '>
        <div className='w-full sm:w-[450px]'>
          <CartTotal/>
          <div className='w-full text-end'>
            <button onClick={()=>navigate('/place-order')} className='bg-black text-white text-sm my-8 px-8 py-3'>
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart 
