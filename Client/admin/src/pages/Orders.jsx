import React, { useEffect } from 'react'
import axios from 'axios'
import {backendUrl, currency} from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Orders = () => {

  const [orders,setOrders] = useState([]) 

  const fetchAllOrders = async () =>{
    if(!token){
      return null
    }

    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, {headers:{token}})
      if(response.data.status === "success"){
        setOrders(response.data.data.orders.reverse())
      }
      else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const statusHandler = async(event, orderId)=>{
    try {
      const response = await axios.post(backendUrl + '/api/v1/orders/status', {orderId,status:event.target.value}, {headers:{token}})
      if(response.data.status === "success"){
        await fetchAllOrders()
      }

    } catch (error) {
      console.log(error);
      toast.error(response.data.message)
    }
  }

  useEffect(()=>{
    fetchAllOrders()
  },[token])

  return (
    <div>
      <h3 className='mb-4 font-medium text-black'>
        Orders Page
      </h3>
      <div>
          {orders.map((order, index )=>{
            <div key={index} className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700 ' >
              <img className='w-12' src={assets.parcel_icon} alt="" />
              <div>
              <div>
                {orders.items.map((item,index)=>{
                  if(index === order.items.length-1){
                    return <p className='py-0.5' key={index}>{item.name} X {item.quantity}</p>
                  }
                  else{
                    return <p className='py-0.5' key={index}>{item.name} X {item.quantity} ,</p>
                  }
                })}
              </div>
              <p className='mt-3 mb-2 font-medium'>{order.address.firstName+" "+ order.address.lastName}</p>
              <div>
                <p>{order.address.street + ","}</p>
                <p>{order.address.city + ","+ order.address.state +","+order.address.country + ","+ order.address.zipcode}</p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <div>
              <p className='text-sm sm:text-[15px]'>Items: {order.items.length}</p>
              <p className='mt-3'>Payment Method: {order.paymentMethod}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className='text-sm sm:text-[15px]'>{currency}{order.amount}</p>
            <select onChange={(e)=>statusHandler(e,order._id)} value={order.status} className='p-2 font-semibold'>
              <option value="Order Placed">Order Placed</option>
              <option value="Order Placed">Shipped</option>
              <option value="Order Placed">Delivered</option>
            </select>
            </div>
          })
        }
      </div>
    </div>
  )
}

export default Orders
