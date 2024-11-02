import { useEffect, useState } from "react";
import ShopContext from "./ShopContext.js";
import {useNavigate} from 'react-router-dom'
import axios from 'axios'


const ShopContextProvider = ({ children }) => {

  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [search,setSearch]=useState('')
  const [showSearch, setShowSearch]=useState(true)
  const [cartItems, setCartItems]=useState({});
  const [products, setProducts] =useState([])
  const [token, setToken] = useState('')
  const navigate=useNavigate()

  const addToCart = async (itemId) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
        cartData[itemId] += 1;
    } else {
        cartData[itemId] = 1;
    }

      setCartItems(cartData)

      if(token){
        try {
          await axios.post(backendUrl + '/api/v1/cart/add', {itemId}, {headers:{token}})
        } catch (error) {
          console.log(error);
          toast.error(error.message)
        }
      }
  }

  const updateQuantity = async ({ itemId, quantity }) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);

    if(token){
      try {
        await axios.post(backendUrl + '/api/v1/cart/update', {itemId,quantity}, {headers:{token}})
      } catch (error) {
        console.log(error);
        toast.error(error.message)
      }
    }
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
  

  const getProductsData = async ()=>{
    try {
      const response = await axios.get(backendUrl + '/api/v1/products');
      console.log(response.data.data.products);
      if(response.data.status === "success")
      {
        setProducts(response.data.data.products)
      }
      else{
        toast.error(response.data.message)
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const getUserCart = async (token)=>{
    try {
      const response = await axios.post(backendUrl + '/api/v1/cart/get', {}, {headers:{token}})
      if(response.data.status === "success"){
        setCartItems(response.data.data.cartData)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    getProductsData()
  },[])


  useEffect(()=>{
    if(!token && localStorage.getItem('token')){
      setToken(localStorage.getItem('token'))
      getUserCart(localStorage.getItem('token'))
    }
  },[])

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;