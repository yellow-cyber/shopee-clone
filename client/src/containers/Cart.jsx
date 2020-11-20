import React, { useEffect, useState } from "react";
import CartCard from "../components/CartCard";
import { API } from "../utils/API";
import Loader from "react-spinners/BeatLoader";
import ReactModal from "react-modal";

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

const Cart = () => {
  const [priceToPay, setPriceToPay] = useState(0.0);
  const [cartProducts, setCartProducts] = useState([]);
  const [productsUpdate, setProductsUpdate] = useState(true);
  const [isFetchingData, setIsFetchingData] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);

  const closeModal = () => {
    if (!isFormLoading) setIsModalOpen(false);
  };

  useEffect(() => {
    const getCartProducts = async () => {
      try {
        const res = await API.get("/auth/cart", {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        });
        setCartProducts(res.data); //edit this
        setIsFetchingData(false);
      } catch (error) {}
    };
    if (productsUpdate) {
      getCartProducts();
      setProductsUpdate(false);
    }
  }, [productsUpdate]);

  const checkout = async () => {
    try {
      setIsFormLoading(true);
      const res = await API.post(`auth/checkout`, null, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      });
      setPriceToPay(0);
      setProductsUpdate(true);
      setIsFormLoading(false);
      setIsModalOpen(false);
      Toast.fire({
        icon: "success",
        title: "Checked out successfully!",
      });
    } catch (err) {
      console.log(err.message);
      Toast.fire({
        icon: "error",
        title: "Error checking out!",
      });
    }
  };
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
        <h1 className="text-3xl text-gray-800 font-extrabold">Cart</h1>
        <div className="ml-auto flex">
          <h1 className="self-center mr-6 font-bold text-2xl text-gray-800">
            Total: P{priceToPay.toFixed(2)}
          </h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-yellow-1000 px-6 rounded-3xl text-gray-900 font-bold focus:outline-none transition duration-300 transform hover:scale-110"
          >
            Checkout
          </button>
        </div>
      </div>
      <div className="flex flex-col mt-6 flex-wrap justify-start">
        {cartProducts.map((cartProduct, index) => {
          return (
            <CartCard
              setPriceToPay={setPriceToPay}
              priceToPay={priceToPay}
              setProductsUpdate={setProductsUpdate}
              setIsFetchingData={setIsFetchingData}
              key={cartProduct.id}
              cartProduct={cartProduct}
            />
          );
        })}
      </div>

      <ReactModal
        isOpen={isModalOpen}
        contentLabel={`AttendanceMark`}
        onRequestClose={closeModal}
        className="animate__animated animate__bounceInDown text-white  rounded-lg  w-10/12 sm:w-8/12 md:w-1/2  lg:w-1/5  focus:outline-none"
        overlayClassName="animate__animated animate_fadeIn flex justify-center items-center  fixed inset-0 bg-black bg-opacity-75"
      >
        <div className="h-auto  rounded-3xl bg-white text-gray-800 flex flex-col flex-wrap  py-5">
          <div className="flex rounded-t-lg flex-col px-6 flex-wrap items-center">
            <h1 className="font-bold text-2xl">Are you sure ?</h1>
          </div>
          <div className="flex mt-5 justify-center">
            {isFormLoading ? (
              <Loader color={"#9CA3AF"} />
            ) : (
              <>
                <button
                  onClick={checkout}
                  className="focus:outline-none hover:bg-green-500 mx-1 bg-green-400 text-white px-4 py-2 rounded-xl"
                >
                  Checkout
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="focus:outline-none hover:bg-red-500 mx-1 bg-red-400 text-white px-4 py-2 rounded-xl"
                >
                  No
                </button>
              </>
            )}
          </div>

          <div className="flex justify-center  items-center flex-wrap flex-row"></div>
        </div>
      </ReactModal>
    </>
  );
};

export default Cart;
