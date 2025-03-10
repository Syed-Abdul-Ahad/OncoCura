// import React from 'react'
// import Title from '../../components/shared/e-commerce/Title'
// import CartTotal from '../../components/shared/e-commerce/CartTotal'
// import { useState } from 'react'
// import { useContext } from 'react'
// import ShopContext from '../../context/ShopContext'
// import { useNavigate } from 'react-router-dom'

// const PlaceOrder = () => {
//   const [method,setMethod]=useState('cod')
//   const {backendUrl, cartItems, setCartItems, token, getCartAmmount, delivery_fee, products} = useContext(ShopContext)
//   const navigate=useNavigate()

//   const [formData, setFormData] = useState({
//     firstName:'',
//     lastName:'',
//     email:'',
//     street:'',
//     city:'',
//     state:'',
//     zipcode:'',
//     country:'',
//     phone:''
//   })

//   const onChangeHandler = (event) =>{
//     const name= event.target.name
//     const value = event.target.value

//     setFormData(data => ({...data,[name]:value}))
//   }

//   const onSubmitHandler = async (event) => {
//     event.preventDefault()

//     try {
//       const orderItems =[]

//       for (const itemId in cartItems) {
//         if (cartItems[itemId] > 0) {
//           const itemInfo = structuredClone(products.find(product=> product._id === itemId))
//           if(itemInfo){
//            itemInfo.quantity= cartItems[itemId]
//            orderItems.push(itemInfo)
//           }
//         }
//       }

//       let orderData ={
//         address:formData,
//         // items:orderItems,
//         amount: getCartAmmount () + delivery_fee
//       }

//       switch (method) {
//         case 'cod':
//           const response= await axios.post(backendUrl + '/api/v1/checkout/create', orderData, {headers:{token}})
//           if(response.data.status === "success"){
//             setCartItems({})
//             toast.success("Your Order has been Confirmed!")
//             navigate('/orders')
//           }
//           else{
//             toast.error(response.error.message)
//           }
//           break;
      
//         default:
//           break;
//       }
      

      
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message)
//     }
//   }

//   return (
//     <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14  min-h-[80vh] border-t mt-12 py-16 px-20 bg-white rounded-xl border border-gray-200 shadow-xl'>
//       {/* left side */}
//       <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
//       <div className='text-xl sm:text-2xl my-3 '>
//           <Title text1={"DELIVERY"} text2={"INFORMATION"}/>
//       </div>
//       <div className='flex gap-3 '>
//           <input required onChange={onChangeHandler} name='firstname' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder='First name'/>
//           <input required onChange={onChangeHandler} name='lastname' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder='Last name'/>
//       </div>
//       <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="email" placeholder='Email Address'/>
//       <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder='Street'/>
//       <div className='flex gap-3 '>
//           <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder='City'/>
//           <input required onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder='State'/>
//       </div>
//       <div className='flex gap-3 '>
//           <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="number" placeholder='Zipcode'/>
//           <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder='Country'/>
//       </div>
//       <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="number" placeholder='Phone'/>

//       </div>

//       {/* Right side */}

//       <div className='mt-8'>
//         <div className='mt-8 min-w-80'>
//           <CartTotal/>
//         </div>

//         <div className='mt-12'>
//           <Title text1={"PAYMENT"} text2={"METHOD"}/>
//         </div>
//         {/* Payment */}
//         <div className='flex gap-3 flex-col lg:flex-row'>
//           <div  onClick={()=>setMethod('cod')} className='flex items-center gap-3 border p-3 px-3 curson-pointer'>
//             <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-blue-400':'' }`}></p>
//             <p className='text-gray-500 text-sm font-medium mx-4 '>CASH ON DELIVERY</p>
//           </div>
//         </div>
//         <div className='w-full text-end mt-8'>
//             <button type='submit' className='bg-[#0251CE] rounded-md text-white text-sm my-8 px-8 py-3'>PLACE ORDER</button>
//         </div>
//       </div>
//     </form>
//   )
// }

// export default PlaceOrder

import React, { useState, useContext } from 'react';
import Title from '../../components/shared/e-commerce/Title';
import CartTotal from '../../components/shared/e-commerce/CartTotal';
import ShopContext from '../../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const { backendUrl, cartItems, setCartItems, token, getCartAmmount, delivery_fee, products } = useContext(ShopContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData(data => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const orderItems = [];

      for (const itemId in cartItems) {
        if (cartItems[itemId] > 0) {
          const itemInfo = structuredClone(products.find(product => product._id === itemId));
          if (itemInfo) {
            itemInfo.quantity = cartItems[itemId];
            orderItems.push(itemInfo);
          }
        }
      }

      // Flatten the structure of formData
      let orderData = {
        ...formData, // Spread the formData to include all fields
        // amount: getCartAmmount() + delivery_fee, // Include the calculated amount
        items: orderItems // Include the order items
      };

      switch (method) {
        case 'cod':
          const response = await axios.post(backendUrl + '/api/v1/checkout/create', orderData, { headers: { Authorization: `Bearer ${token}` }});
          console.log(response);
          console.log(orderData);
          
          if (response.data.status === "Success") {
            setCartItems({});
            toast.success("Your Order has been Confirmed!");
            navigate('/orders');
          } else {
            toast.error(response.error.message);
          }
          break;

        default:
          break;
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t mt-12 py-16 px-20 bg-white rounded-xl border border-gray-200 shadow-xl'>
      {/* left side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3 '>
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className='flex gap-3 '>
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder='First name' />
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder='Last name' />
        </div>
        <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="email" placeholder='Email Address' />
        <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder='Street' />
        <div className='flex gap-3 '>
          <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder='City' />
          <input required onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder='State' />
        </div>
        <div className='flex gap-3 '>
          <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="number" placeholder='Zipcode' />
          <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder='Country' />
        </div>
        <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="number" placeholder='Phone' />

      </div>

      {/* Right side */}

      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title text1={"PAYMENT"} text2={"METHOD"} />
        </div>
        {/* Payment */}
        <div className='flex gap-3 flex-col lg:flex-row'>
          <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-3 px-3 curson-pointer'>
            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-blue-400' : ''}`}></p>
            <p className='text-gray-500 text-sm font-medium mx-4 '>CASH ON DELIVERY</p>
          </div>
        </div>
        <div className='w-full text-end mt-8'>
          <button type='submit' className='bg-[#0251CE] rounded-md text-white text-sm my-8 px-8 py-3'>PLACE ORDER</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder;
