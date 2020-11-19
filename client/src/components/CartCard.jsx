import React, { useEffect, useState } from "react";
import chihuahua from "../assets/img/chihuahua.png";

const CartCard = () => {
  const [qty, setQty] = useState(1);
  const [unitPrice, setUnitPrice] = useState(109.99);
  const [totalPrice, setTotalPrice] = useState(unitPrice * qty);

  const subtractQty = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };
  useEffect(() => {
    setTotalPrice(unitPrice * qty);
  }, [qty]);
  return (
    <div className="rounded-xl  border my-1 px-6 py-6 flex items-center">
      <div className="flex w-2/3 items-center">
        <input type="checkbox" name="" className="mr-2" id="" />
        <img src={chihuahua} className="w-6 mr-2" alt="" />
        <h1 className="font-bold text-gray-800">Chihuahua</h1>
      </div>
      <div className="flex justify-end w-1/3 items-center">
        {/* <p className="mr-6">P{unitPrice}</p> */}
        <div className="flex items-center">
          <div
            onClick={subtractQty}
            className="border w-8 text-gray-600 cursor-pointer font-bold h-8 flex items-center justify-center"
          >
            {"-"}
          </div>
          <div className="border w-12 h-8 flex items-center justify-center">
            {qty}
          </div>
          <div
            onClick={() => setQty(qty + 1)}
            className="border text-gray-600 font-bold cursor-pointer w-8 h-8 flex items-center justify-center"
          >
            {"+"}
          </div>
          <p className="ml-6 font-bold">P{totalPrice.toFixed(2)}</p>
          <button className="ml-6  text-red-600 focus:outline-none text-xs">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
