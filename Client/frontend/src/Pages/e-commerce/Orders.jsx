// // import React, { useContext, useEffect, useState } from 'react'
// // import ShopContext from '../../context/ShopContext'
// // import Title from '../../components/shared/e-commerce/Title';

// // const Orders = () => {

// //   const {products, currency, token } =useContext(ShopContext);
// //   const [orderData, setOrderData] =useState([])

// //   const loadOrderData =async ()=>{
// //     try {
    
// //       const response = await axios.get(backendUrl + '/api/v1/checkout/my-order',{ headers: { Authorization: `Bearer ${token}` }})
// //       console.log(response);
      
// //       if(response.data.status === "success"){
// //         let allOrdersItem = []
// //         response.data.orders.map((order)=>{
// //           order.items.map((item)=>{
// //             item['status']=order.status
// //             item['payment']=order.payment
// //             item['paymentMethod']=order.paymentMethod
// //             item['date']=order.date
// //             allOrdersItem.push(item)
// //           })
// //         })
// //         setOrderData(allOrdersItem.reverse())
// //       } 
// //     } catch (error) {
      
// //     }
// //   }

// //   useEffect(()=>{
// //     loadOrderData()
// //   },[])

// //   return (
// //     <div className='border-t pt-16 mt-12 py-16 px-20 bg-white rounded-xl border border-gray-200 shadow-xl '>
// //       <div className='text-2xl'>
// //         <Title text1={"MY"} text2={"ORDERS"}/>
// //       </div>
// //       <div>
// //         {orderData.slice(1,4).map((item, index)=>(
// //           <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
// //               <div className='flex items-start gap-6 text-sm'>
// //                 <img className='w-16 sm:w-20 ' src={item.image[0]} alt="" />
// //                 <div>
// //                   <p className='sm:text-base font-medium'>{item.name}</p>
// //                   <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
// //                     <p>{currency}{item.price}</p>
// //                     <p>Quantity : {item.quantity}</p>
// //                   </div>
// //                   <p className='mt-1'>Date: <span className='text-gray-400'>{new Date(item.date).toLocaleDateString()}</span></p>
// //                   <p className='mt-1'>PaymentMethod: <span className='text-gray-400'>{item.paymentMethod}</span></p>
// //                 </div>
// //               </div>
// //               <div className='md:w-1/2 flex justify-between'>
// //                 <div className='flex items-center gap-2'>
// //                   <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
// //                   <p className='text-sm font-medium md:text-base' >{item.status}</p>
// //                 </div>
// //                 <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
// //               </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   )
// // }

// // export default Orders

// import React, { useContext, useEffect, useState } from 'react';
// import axios from 'axios'; // Ensure you import axios
// import ShopContext from '../../context/ShopContext';
// import Title from '../../components/shared/e-commerce/Title';

// const Orders = () => {
//   const { backendUrl, currency, token } = useContext(ShopContext);
//   const [orderData, setOrderData] = useState([]);

//   const loadOrderData = async () => {
//     try {
//       console.log("print token", token);
      
//       const response = await axios.get(backendUrl + '/api/v1/checkout/my-order', {
//         headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MjM4OTgxOWI4ZmNhMDgwNmRjZmNiOCIsImlhdCI6MTczMDYyOTAyMCwiZXhwIjoxNzMxNjI5MDIwfQ.mv8QzANxPBE4wd0Ug0fcD8EN6fsCLSrdjJQvAY7kSi8` }
//       });

//       console.log(response);

//       if (response.data.status === "success") {
//         const checkout = response.data.data.checkout; // Access the checkout data
//         const allOrdersItem = checkout.cart.items.map((item) => {
//           return {
//             ...item.product, // Spread product details
//             quantity: item.quantity,
//             date: checkout.placedAt, // Assuming you want to display the date when the order was placed
//             status: checkout.status, // Assuming status is available in checkout
//             paymentMethod: checkout.paymentMethod // Assuming paymentMethod is available in checkout
//           };
//         });

//         setOrderData(allOrdersItem.reverse());
//       }
//     } catch (error) {
//       console.error("Error fetching order data:", error);
//     }
//   };

//   useEffect(() => {
//     loadOrderData();
//   }, []);

//   return (
//     <div className='border-t pt-16 mt-12 py-16 px-20 bg-white rounded-xl border border-gray-200 shadow-xl'>
//       <div className='text-2xl'>
//         <Title text1={"MY"} text2={"ORDERS"} />
//       </div>
//       <div>
//         {orderData.length > 0 ? (
//           orderData.slice(1, 4).map((item, index) => (
//             <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
//               <div className='flex items-start gap-6 text-sm'>
//                 <img className='w-16 sm:w-20' src={item.image[0]} alt={item.name} />
//                 <div>
//                   <p className='sm:text-base font-medium'>{item.name}</p>
//                   <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
//                     <p>{currency}{item.price}</p>
//                     <p>Quantity: {item.quantity}</p>
//                   </div>
//                   <p className='mt-1'>Date: <span className='text-gray-400'>{new Date(item.date).toLocaleDateString()}</span></p>
//                   <p className='mt-1'>Payment Method: <span className='text-gray-400'>{item.paymentMethod}</span></p>
//                 </div>
//               </div>
//               <div className='md:w-1/2 flex justify-between'>
//                 <div className='flex items-center gap-2'>
//                   <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
//                   <p className='text-sm font-medium md:text-base'>{item.status}</p>
//                 </div>
//                 <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className='text-gray-500'>No orders found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Orders;


import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios'; // Ensure you import axios
import ShopContext from '../../context/ShopContext';
import Title from '../../components/shared/e-commerce/Title';
import { assets } from '../../../public/assets';

const Orders = () => {
  const { backendUrl, currency} = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  let token = localStorage.getItem("token")

  const loadOrderData = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/v1/checkout/my-order', {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log(response);

      if (response.data.status === "Success") {
        const checkout = response.data.data.checkout; // Access the checkout data
        const allOrdersItem = checkout.cart.items.map((item) => {
          return {
            productId: item.product._id, // Product ID
            name: item.product.name, // Product name
            price: item.product.price, // Product price
            quantity: item.quantity, // Ordered quantity
            date: checkout.placedAt, // Date when the order was placed
          };
        });

        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, []);

  return (
    <div className='border-t pt-16 mt-12 py-16 px-20 bg-white rounded-xl border border-gray-200 shadow-xl'>
      <div className='text-2xl'>
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      <div>
        {orderData.length > 0 ? (
          orderData.map((item, index) => (
            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-6 text-sm'>
                {/* Assuming you have an image field in your product object */}
                <img className='w-16 sm:w-20' src={assets.parcel_icon} alt={item.name} />
                <div>
                  <p className='sm:text-base font-semibold'>{item.name}</p>
                  <div className='flex items-center gap-3 mt-1 text-base'>
                    <p className=' text-blue-700'>{currency}{item.price}</p>
                    <p className='text-gray-700'>Quantity: {item.quantity}</p>
                  </div>
                  <p className='mt-1'>Date: <span className='text-gray-400'>{new Date(item.date).toLocaleDateString()}</span></p>
                  <p className='mt-1'>Payment Method: <span className='text-gray-400'>cod</span></p>
                </div>
              </div>
                <div className='flex items-center gap-2 mr-4'>
                  <p className='min-w-2 h-2 rounded-full bg-blue-500'></p>
                  <p className='text-sm font-medium md:text-base'>Order Confirmed!</p>
                </div>
              
            </div>
          ))
        ) : (
          <p className='text-gray-500'>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;