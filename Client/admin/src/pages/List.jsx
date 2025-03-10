import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import axios from 'axios';

const List = ({ token }) => {

  const [list, setList] = useState([]);
  
  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/v1/products');


      if (response.data.status === "success") {
        setList(response.data.data.products.reverse());
        console.log("Current List:", list);

      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };


  const removeProduct = async (id) => {
    try {
      const response = await axios.delete(`${backendUrl}/api/v1/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (response.status === 200 || response.status === 204) { // Success status codes
        toast.success("Product deleted successfully");
        await fetchList(); // Refresh the product list
      } else {
        toast.error("Failed to delete the product");
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Error in deleting the product");
    }
  };
  

  useEffect(() => {
    // console.log("List component mounted");
    fetchList()
    console.log(list);

    
  }, [])

  console.log(list)
  return (
    <>
      <p className='mb-4 font-medium text-black'>All Products List</p>
      <div className='flex flex-col gap-2'>
        {/* list table title */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Company</b>
          <b>Type</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {list.map((item) => (
          <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center gap-2 px-2 py-1 border text-sm' key={item._id}>
            <img className='w-12' src={item.images[0]} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.company}</p>
            <p>{item.type}</p>
            <p>{currency}{item.price}</p>
            <p onClick={() => removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
          </div>
        ))}

      </div>
    </>
  )
}

export default List;
