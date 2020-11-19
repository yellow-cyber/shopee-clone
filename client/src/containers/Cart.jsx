import React, { useState } from "react";
import CartCard from "../components/CartCard";

const Cart = () => {
  const [priceToPay, setPriceToPay] = useState(0.0);
  return (
    <>
      <div className="flex flex-row">
        <h1 className="text-3xl text-gray-800 font-extrabold">Cart</h1>
        <div className="ml-auto flex">
          <h1 className="self-center mr-6 font-bold text-2xl text-gray-800">
            Total: P{priceToPay.toFixed(2)}
          </h1>
          <button className="bg-yellow-1000 px-6 rounded-3xl text-gray-900 font-bold focus:outline-none transition duration-300 transform hover:scale-110">
            Checkout
          </button>
        </div>
      </div>
      <div className="flex flex-col mt-6 flex-wrap justify-start">
        <CartCard />
        <CartCard />
        <CartCard />
        <CartCard />
        <CartCard />
        <CartCard />
        <CartCard />
        <CartCard />
        <CartCard />
        <CartCard />
        <CartCard />
        <CartCard />
        <CartCard />
        <CartCard />
        <CartCard />
        <CartCard />
        <CartCard />
        <CartCard />
        <CartCard />
      </div>
    </>
  );
};

export default Cart;
