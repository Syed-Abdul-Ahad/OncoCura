import React, { useContext, useEffect, useState } from "react";
import ShopContext from "../../context/ShopContext";
import Title from "../../components/shared/e-commerce/Title";
import { assets } from "../../../public/assets";
import CartTotal from "../../components/shared/e-commerce/CartTotal";

const Cart = () => {
  const { products, cartItems, currency, updateQuantity, navigate } =
    useContext(ShopContext);

  return (
    <div className="border-t pt-14 ">
      <div className="text-2xl mb-3">
        <Title text1="YOUR" text2="CART" />
      </div>
      <div>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => {
            const productData = products.find(
              (product) => product?._id === item?.product?._id
            );

            if (!productData || !productData.images || !productData.images[0]) {
              // console.log(
              //   `Product data or image not available for item ID: ${item._id}`
              // );
              return null;
            }

            return (
              <div
                key={index}
                className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
              >
                <div className="flex items-start gap-6">
                  <img
                    className="w-16 sm:w-20"
                    src={productData.images[0]}
                    alt={productData.name}
                  />
                  <p className="text-xs sm:text-lg font-medium">
                    {productData.name}
                  </p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>
                      {currency}
                      {productData.price}
                    </p>
                  </div>
                </div>
                <input
                  onChange={(e) => {
                    const value =
                      e.target.value === ""
                        ? ""
                        : Math.max(1, Number(e.target.value));
                    updateQuantity({
                      itemId: item._id,
                      quantity: value === "" ? 1 : value,
                    });
                  }}
                  onBlur={(e) => {
                    if (e.target.value === "" || e.target.value === "0") {
                      updateQuantity({ itemId: item._id, quantity: 0 });
                    }
                  }}
                  className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                  type="number"
                  min={1}
                  defaultValue={item?.quantity}
                />
                <img
                  onClick={() =>
                    updateQuantity({ itemId: item._id, quantity: 0 })
                  }
                  className="w-5 mr-4 cursor-pointer"
                  src={assets.bin_icon}
                  alt="Remove item"
                />
              </div>
            );
          })
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-black text-white text-sm my-8 px-8 py-3"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
