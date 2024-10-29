import { useEffect, useState } from "react";
import { products } from "../assets/assets.js";
import ShopContext from "./ShopContext.js";
import {useNavigate} from 'react-router-dom'


const ShopContextProvider = ({ children }) => {

  const currency = "$";
  const delivery_fee = 10;
  const [search,setSearch]=useState('')
  const [showSearch, setShowSearch]=useState(true)
  const [cartItems, setCartItems]=useState({});
  const navigate=useNavigate()

  const addToCart = async (itemId) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
        cartData[itemId] += 1;
    } else {
        cartData[itemId] = 1;
    }

      setCartItems(cartData)
  }

  const updateQuantity = async ({ itemId, quantity }) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
  };
  

  const getCartAmount = () => {
    let totalAmount = 0;
  
    // Iterate over each item in cartItems
    for (const itemId in cartItems) {
      const itemInfo = products.find((product) => product._id === itemId);
      if (itemInfo) {
        totalAmount += itemInfo.price * cartItems[itemId];
      }
    }
  
    return totalAmount;
  };
  

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    updateQuantity,
    getCartAmount,
    navigate
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;