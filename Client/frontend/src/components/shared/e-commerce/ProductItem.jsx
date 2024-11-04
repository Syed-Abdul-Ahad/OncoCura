import React, { useContext } from 'react'
import ShopContext from '../../../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({id, image, name, price, type, company, description}) => {

    // console.log("images : ", image);
    const { currency } = useContext(ShopContext)
    return (
        <Link className='text-gray-700 no-underline cursor-pointer border border-gray-300 p-3 rounded-lg' to={`/product/${id}`}>
            <div className='overflow-hidden h-40 w-full'>
                <img className='h-full w-full object-cover hover:scale-110 transition ease-in-out' src={image && image[0]} alt={name} />
            </div>
            <hr className='text-center my-1 w-full'/>
            <div className='flex justify-between mb-2'>
            <p className='font-semibold text-base'>{name}</p>
            <p className='font-medium text-base text-blue-800 rounded-full px-4 bg-blue-100'>{currency}{price}</p>
            </div>
            <p className='text-xs py-[2px] font-medium'>Type: <span className='border text-[#0251CE]  border-gray-400 px-2 rounded-full'>{type}</span></p>
            <p className='text-xs py-[2px] font-medium'>Company: {company}</p> 
            <p className='text-xs py-[2px] text-gray-400 font-normal line-clamp-1'>{description}..</p>    
        </Link>
    )
}

export default ProductItem
