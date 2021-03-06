import React from "react";
import chihuahua from "../assets/img/chihuahua.png";
import { API } from "../utils/API";

import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
const ItemCard = ({ product }) => {
  const { productName, description, price, id } = product;

  const addToCart = async () => {
    try {
      const res = await API.post(
        "/auth/cart/add",
        {
          itemid: id,
          quantity: 1,
          price: price,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        }
      );
      console.log(res.data);

      Toast.fire({
        icon: "success",
        title: "Product added to cart!",
      });
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="h-96 w-1/4 p-2 flex-wrap text-gray-800">
      <div className="shadow-lg items-center justify-center flex-wrap flex-col h-full rounded-3xl flex p-4">
        <img src={chihuahua} className="w-24" alt="" />
        <h1 className="mt-2 text-2xl font-bold">{productName}</h1>
        <small className="text-gray-400 text-xs break-words">P{price}</small>
        <button
          onClick={addToCart}
          className="mt-4 focus:outline-none font-bold transform hover:scale-110 transition duration-300 bg-yellow-1000 px-4 py-2 text-xs rounded-3xl"
        >
          Add to cart
        </button>
        {/* <p className="mt-2 text-yellow-1000 font-bold text-2xl">P3.50</p> */}
      </div>
    </div>
  );
};

export default ItemCard;
