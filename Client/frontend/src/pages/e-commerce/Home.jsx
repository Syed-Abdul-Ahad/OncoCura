import React from 'react'
import Hero from '../components/Hero'
import LastestCollection from '../components/LastestCollection'
import BestSeller from '../components/BestSeller'
import Collection from './Collection'
import Product from './Product'
import Cart from './Cart'

const Home = () => {
  return (
    <div>
      {/* <Hero/>
      <LastestCollection/>
      <BestSeller/> */}
      <Collection/>
      {/* <Product /> */}
      <Cart/>
    </div>
  )
}

export default Home
