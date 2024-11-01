<<<<<<< HEAD
import React, { useContext } from 'react'
import ShopContext from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({id, image, name, price, type}) => {
    const { currency } = useContext(ShopContext)
    return (
        <Link className='text-gray-700 no-underline cursor-pointer' to={`/product/${id}`}>
            <div className='overflow-hidden h-64 w-full'>
                <img className='h-full w-full object-cover hover:scale-110 transition ease-in-out' src={image[0]} alt={name} />
            </div>

            <p className='pt-1 pb-1 text-sm font-semibold'>{name}</p>
            <p className='text-sm font-medium'>{type}</p>
            <p className='text-sm font-medium'>{currency}{price}</p>
        </Link>
    )
}

export default ProductItem
=======
import React, { useContext } from "react";
import { ShopContext } from "../../../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price, type }) => {
  const { currency } = useContext(ShopContext);
  return (
    <Link
      className="text-gray-700 no-underline cursor-pointer"
      to={`/product/${id}`}
    >
      <div className="overflow-hidden h-64 w-full">
        <img
          className="h-full w-full object-cover hover:scale-110 transition ease-in-out"
          src={image[0]}
          alt={name}
        />
      </div>

      <p className="pt-1 pb-1 text-sm font-semibold">{name}</p>
      <p className="text-sm font-medium">{type}</p>
      <p className="text-sm font-medium">
        {currency}
        {price}
      </p>
    </Link>
  );
};

export default ProductItem;
>>>>>>> 2f06768a8c0f3151bd7e19c07ffccad946456481
