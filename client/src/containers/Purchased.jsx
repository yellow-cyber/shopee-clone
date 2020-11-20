import React, { useEffect, useState } from "react";
import CartCard from "../components/CartCard";
import { API } from "../utils/API";
import Loader from "react-spinners/BeatLoader";
import ReactModal from "react-modal";

import Swal from "sweetalert2";
import PurchaseCard from "../components/PurchaseCard";

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

const Purchased = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [productsUpdate, setProductsUpdate] = useState(true);
  const [isFetchingData, setIsFetchingData] = useState(true);

  useEffect(() => {
    const getCartProducts = async () => {
      try {
        const res = await API.get("/auth/purchase", {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        });
        console.log("pur", res.data);
        setCartProducts(res.data); //edit this
        setIsFetchingData(false);
      } catch (error) {}
    };
    if (productsUpdate) {
      getCartProducts();
      setProductsUpdate(false);
    }
  }, [productsUpdate]);

  if (isFetchingData) {
    return (
      <div className="flex justify-center items-center h-full">
        {" "}
        <Loader color={"#9CA3AF"} />
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-row">
        <h1 className="text-3xl text-gray-800 font-extrabold">Purchase</h1>
      </div>
      <div className="flex flex-col mt-6 flex-wrap justify-start">
        {cartProducts.map((cartProduct, index) => {
          return (
            <PurchaseCard
              setIsFetchingData={setIsFetchingData}
              key={cartProduct.id}
              cartProduct={cartProduct}
            />
          );
        })}
      </div>
    </>
  );
};

export default Purchased;
