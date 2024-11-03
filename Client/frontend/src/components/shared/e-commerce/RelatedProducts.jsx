import React, { useContext, useEffect, useState } from 'react'
import ShopContext from '../../../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProducts = ({type}) => {

    const {products} = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    useEffect(()=>{
        if(products.length>0){
            let productsCopy=products.slice();
            productsCopy= productsCopy.filter((item)=> type===item.type)
            setRelated(productsCopy.slice(0,5))
        }
    },[products])
  return (
    <div className='my-16 '>
      <div className='text-center text-3xl py-2'>
        <Title text1={"Related"} text2={"Products"}/>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 mt-2'>
      {related.map((item,index)=>(
          <ProductItem key={index} id={item._id} image={item.images} name={item.name} price={item.price} type={item.type} company={item.company} description={item.description}/>
        ))
      }
      </div>
    </div>
  )
}

export default RelatedProducts
