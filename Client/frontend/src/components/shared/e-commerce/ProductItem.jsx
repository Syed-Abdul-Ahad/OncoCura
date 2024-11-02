import React, { useContext } from 'react'
import ShopContext from '../../../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({id, image, name, price, type, company}) => {

    // console.log("images : ", image);
    const { currency } = useContext(ShopContext)
    return (
        <Link className='text-gray-700 no-underline cursor-pointer border border-gray-300 p-3 rounded-lg' to={`/product/${id}`}>
            <div className='overflow-hidden h-48 w-full'>
                <img className='h-full w-full object-cover hover:scale-110 transition ease-in-out' src={image && image[0]} alt={name} />
            </div>
            <hr className='text-center mt-1'/>
            <div className='flex justify-between'>
            <p className='pt-1 pb-1 font-semibold'>{name}</p>
            <p className='text-[#0251CE] font-medium'>{currency}{price}</p>
            </div>
            <p className='text-sm font-medium py-1'>Type: <span className='border border-gray-400 px-2 py-1 rounded-full'>{type}</span></p>
            <p className='text-sm text-gray-500 font-medium'>Company: {type}</p>    
        </Link>
    )
}

export default ProductItem
