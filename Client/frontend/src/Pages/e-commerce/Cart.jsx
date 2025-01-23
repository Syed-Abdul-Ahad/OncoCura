// import React, { useContext, useEffect, useState } from "react";
// import ShopContext from "../../context/ShopContext";
// import Title from "../../components/shared/e-commerce/Title";
// import { assets } from "../../../public/assets";
// import CartTotal from "../../components/shared/e-commerce/CartTotal";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// const Cart = () => {
//   const { products, cartItems, currency, updateQuantity, removeFromCart } =
//     useContext(ShopContext);
//   const navigate = useNavigate()

//   return (
//     <div className="border-t mt-12 py-16 px-20 bg-white rounded-xl border border-gray-200 shadow-xl">
//       <div className="text-2xl mb-3">
//         <Title text1="YOUR" text2="CART" />
//       </div>
//       <div>
//         {cartItems.length > 0 ? (
//           cartItems.map((item, index) => {
//             const productData = products.find((product) => product._id === item.product._id);

//             if (!productData) {
//               console.error(`Product not found for cart item: ${item.product._id}`);
//               return null;
//             }

//             return (
//               <div key={index} className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
//                 <div className="h-20 flex items-start gap-6">
//                   <img className="w-16 sm:w-20" src={productData.images[0]} alt={productData.name} />
//                   <div className="flex flex-col">
//                     <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
//                     <div className="flex text-lg text-blue-700 items-center gap-5 mt-2">
//                       <p>{currency}{productData.price}</p>
//                     </div>
//                   </div>
//                 </div>
//                 <input
//                   type="number"
//                   value={item.quantity}
//                   min="1"
//                   onChange={(e) => {
//                     const quantity = parseInt(e.target.value);
//                     if (quantity > 0) {
//                       updateQuantity({ itemId: item.product._id, quantity });
//                     }
//                   }}
//                   className="border border-gray-300 rounded p-1 text-center w-16"
//                 />
//                 <button onClick={() => removeFromCart(item.product._id)} className="text-red-500">Remove</button>
//               </div>
//             );
//           })
//         ) : (
//           <p>Your cart is empty.</p>
//         )}

//       </div>
//       <div className="flex justify-end my-20">
//         <div className="w-full sm:w-[450px]">
//           <CartTotal />
//           <div className="w-full text-end">
//             <button
//               onClick={() => navigate("/placeorder")}
//               className="bg-[#0251CE] rounded-md text-white text-sm my-8 px-8 py-3"
//             >
//               PROCEED TO CHECKOUT
//             </button>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;

// import React, { useContext, useEffect, useState } from "react";
// import ShopContext from "../../context/ShopContext";
// import Title from "../../components/shared/e-commerce/Title";
// import CartTotal from "../../components/shared/e-commerce/CartTotal";
// import { Link, useNavigate } from "react-router-dom";

// const Cart = () => {
//   const { products, cartItems, currency, updateQuantity, removeFromCart } = useContext(ShopContext);
//   const navigate = useNavigate();

//   return (
//     <div className="border-t mt-12 py-16 px-20 bg-white rounded-xl border border-gray-200 shadow-xl">
//       <div className="text-2xl mb-3">
//         <Title text1="YOUR" text2="CART" />
//       </div>
//       <div>
//         {cartItems.length > 0 ? (
//           cartItems.map((item, index) => {
//             // Ensure item and product are defined
//             if (!item || !item.product) {
//               console.error(`Invalid cart item at index ${index}:`, item);
//               return null;
//             }

//             const productData = products.find((product) => product._id === item.product._id);

//             if (!productData) {
//               console.error(`Product not found for cart item: ${item.product._id}`);
//               return null;
//             }

//             return (
//               <div key={index} className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
//                 <div className="h-20 flex items-start gap-6">
//                   <img className="w-16 sm:w-20" src={productData.images[0]} alt={productData.name} />
//                   <div className="flex flex-col">
//                     <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
//                     <div className="flex text-lg text-blue-700 items-center gap-5 mt-2">
//                       <p>{currency}{productData.price}</p>
//                     </div>
//                   </div>
//                 </div>
//                 <input
//                   type="number"
//                   value={item.quantity}
//                   min="1"
//                   onChange={(e) => {
//                     const quantity = parseInt(e.target.value);
//                     if (quantity > 0) {
//                       updateQuantity({ itemId: item.product._id, quantity });
//                     }
//                   }}
//                   className="border border-gray-300 rounded p-1 text-center w-16"
//                 />
//                 <button onClick={() => removeFromCart(item.product._id)} className="text-red-500">Remove</button>
//               </div>
//             );
//           })
//         ) : (
//           <p>Your cart is empty.</p>
//         )}
//       </div>
//       <div className="flex justify-end my-20">
//         <div className="w-full sm:w-[450px]">
//           <CartTotal />
//           <div className="w-full text-end">
//             <button
//               onClick={() => navigate("/placeorder")}
//               className="bg-[#0251CE] rounded-md text-white text-sm my-8 px-8 py-3"
//             >
//               PROCEED TO CHECKOUT
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;

import React, { useContext, useEffect, useState } from "react";
import ShopContext from "../../context/ShopContext";
import Title from "../../components/shared/e-commerce/Title";
import CartTotal from "../../components/shared/e-commerce/CartTotal";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { products, cartItems, currency, updateQuantity, removeFromCart } =
    useContext(ShopContext);
  const navigate = useNavigate();
  console.log(cartItems);

  // Check if products are loaded to avoid null reference issues
  if (!products || !cartItems) {
    return <p>Loading cart...</p>;
  }

  return (
    <div className="border-t mt-12 py-16 px-20 bg-white rounded-xl border border-gray-200 shadow-xl">
      <div className="text-2xl mb-3">
        <Title text1="YOUR" text2="CART" />
      </div>
      <div>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => {
            // Safely find the product data
            const productData = products.find(
              (product) => product._id === item.product?._id
            );

            // If product data is missing, log it and skip rendering this item
            if (!productData) {
              console.warn(
                `Product not found for cart item: ${item.product?._id}`
              );
              return null;
            }

            return (
              <div
                key={index}
                className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
              >
                <div className="h-20 flex items-start gap-6">
                  <img
                    className="w-16 sm:w-20"
                    src={productData.images[0]}
                    alt={productData.name}
                  />
                  <div className="flex flex-col">
                    <p className="text-xs sm:text-lg font-medium">
                      {productData.name}
                    </p>
                    <div className="flex text-lg text-blue-700 items-center gap-5 mt-2">
                      <p>
                        {currency}
                        {productData.price}
                      </p>
                    </div>
                  </div>
                </div>
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => {
                    const quantity = parseInt(e.target.value);
                    if (quantity > 0) {
                      updateQuantity({ itemId: item.product._id, quantity });
                    }
                  }}
                  className="border border-gray-300 rounded p-1 text-center w-16"
                />
                <button
                  onClick={() => removeFromCart(item.product?._id)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            );
          })
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate("/placeorder")}
              className="bg-[#0251CE] rounded-md text-white text-sm my-8 px-8 py-3"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
