import { useEffect, useState } from "react";
import ShopContext from "./ShopContext.js";
import axios from 'axios'
import { toast } from 'react-toastify';


const ShopContextProvider = ({ children }) => {

  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const [search, setSearch] = useState('')
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  let [token, setToken] = useState('')

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    console.log('Stored Token:', storedToken); // Log the retrieved token
  
    if (!token && storedToken) {
      setToken(storedToken);
      getUserCart(storedToken);
    }
  }, []);
  


  const addToCart = async (itemId, quantity = 1) => {
    let cartData = structuredClone(cartItems);
  
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    console.log("Token:", token);
  
    setCartItems(cartData);
    console.log("Cart data after update:", cartData);
  
    if (token) {
      console.log("Token:", token);
      try {
        const response = await axios.post(
          `${backendUrl}/api/v1/cart/add`,
          { productId: itemId, quantity },
          {  headers: {
            Authorization: `Bearer ${token}`,}}
        );
        console.log("API Response:", response); // Log the full response object
  
        if (response.data.status === "success") {
          console.log("Item added to cart successfully");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Failed to add item to cart:", error);
        toast.error(error.message);
      }
    }
  };
  

  const updateQuantity = async ({ itemId, quantity }) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    console.log(`Item:${itemId} and q: ${quantity}`);
    
    // if (token) {
      try {
        const response = await axios.post(
          `${backendUrl}/api/v1/cart/add`,
          { productId: itemId, quantity },
          {  headers: {
            Authorization: `Bearer ${token}`,}}
        );
        console.log(response);
        
        if (response.data.status === "success") {
          console.log("Item Update successfully");

          toast.success("successful update")
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Failed to add item to cart:", error);
        toast.error(error.message);
      }
    // }
  };

  const getCartCount = () => {
    let totalCount = 0;

    // Iterate over each item in cartItems
    for (const itemId in cartItems) {
      // Add the quantity of each item directly to totalCount
      totalCount += cartItems[itemId];
    }

    return totalCount;
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


  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/v1/products`);

      if (response.data.status === "success" && response.data.data.products) {
        setProducts(response.data.data.products);
      } else {
        console.error("Product data fetch unsuccessful:", response.data.message);
        toast.error(response.data.message || "Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error.message);
      toast.error("Failed to load products. Please try again.");
    }
  };


  const getUserCart = async (token) => {
    try {
      const response = await axios.get(backendUrl + '/api/v1/cart/getCart', {  headers: {
        Authorization: `Bearer ${token}`,}})
      console.log("Response for cart", response);
      
      if (response.data.status === "success") {
        setCartItems(response.data.data.cartData)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    getProductsData()
  }, [])


  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    cartItems,
    setCartItems,
    addToCart,
    updateQuantity,
    getCartAmount,
    backendUrl,
    token,
    setToken,
    getCartCount
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;