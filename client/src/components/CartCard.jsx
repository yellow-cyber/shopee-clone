import React, { useEffect, useState } from "react";
import chihuahua from "../assets/img/chihuahua.png";
import { API } from "../utils/API";
import Loader from "react-spinners/BeatLoader";

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

const CartCard = ({
  cartProduct,
  setPriceToPay,
  priceToPay,
  setProductsUpdate,
}) => {
  const { id, price, description, quantity, itemid, isChecked } = cartProduct;
  const [qty, setQty] = useState(parseInt(quantity));
  const [unitPrice, setUnitPrice] = useState(price);
  const [totalPrice, setTotalPrice] = useState(unitPrice * qty);
  const [product, setProduct] = useState({});
  const [isFetchingData, setIsFetchingData] = useState(true);
  const [checked, setChecked] = useState(isChecked);
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    const getProductName = async () => {
      try {
        const res = await API.get(`products/${itemid}`, {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        });
        setIsFetchingData(false);
        setProduct(res.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getProductName();
  }, []);
  useEffect(() => {
    const updateCart = async () => {
      const res = await API.put(
        `auth/cart/${id}`,
        {
          totalPrice: parseFloat(unitPrice) * parseInt(qty),
          quantity: parseInt(qty),
          isChecked: checked,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        }
      );
      console.log("check", res.data);
    };
    if (!firstRender) {
      if (checked) {
        setPriceToPay(priceToPay + totalPrice);
      } else {
        setPriceToPay(priceToPay - totalPrice);
      }
      updateCart();
    } else {
      setFirstRender(false);
    }
  }, [checked]);

  const subtractQty = async () => {
    if (qty > 1) {
      setQty(qty - 1);
      if (checked) {
        setPriceToPay(parseFloat(priceToPay) - parseFloat(unitPrice));
      }
    }
  };
  const addQty = () => {
    if (qty <= product.quantity) {
      setQty(qty + 1);
      if (checked)
        setPriceToPay(parseFloat(priceToPay) + parseFloat(unitPrice));
    }
  };

  const deleteCard = async () => {
    try {
      const res = await API.delete(`auth/cart/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      });
      setProductsUpdate(true);
      Toast.fire({
        icon: "success",
        title: "Product removed from cart!",
      });
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    setTotalPrice(parseFloat(unitPrice) * parseInt(qty));
    const updateCart = async () => {
      const res = await API.put(
        `auth/cart/${id}`,
        {
          totalPrice: parseFloat(unitPrice) * parseInt(qty),
          quantity: qty,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        }
      );
      console.log(res.data);
    };
    updateCart();
  }, [qty]);

  return (
    <div className="rounded-xl  border my-1 px-6 py-6 flex items-center">
      {isFetchingData ? (
        <div className="w-full flex justify-center">
          <Loader color={"#9CA3AF"} />
        </div>
      ) : (
        <>
          <div className="flex w-2/3 items-center">
            <input
              checked={checked ? true : false}
              onChange={() => setChecked(!checked)}
              type="checkbox"
              name=""
              className="self-center mr-2"
              id=""
            />
            <img src={chihuahua} className="w-6 mr-2" alt="" />
            <h1 className="font-bold text-gray-800">{product.productName}</h1>
          </div>
          <div className="flex justify-end w-1/3 items-center">
            {/* <p className="mr-6">P{unitPrice}</p> */}
            <div className="flex items-center">
              <button
                onClick={subtractQty}
                className="focus:outline-none border w-8 text-gray-600 cursor-pointer font-bold h-8 flex items-center justify-center"
              >
                {"-"}
              </button>
              <div className="border w-12 h-8 flex items-center justify-center">
                {qty}
              </div>
              <button
                onClick={addQty}
                className="focus:outline-none border text-gray-600 font-bold cursor-pointer w-8 h-8 flex items-center justify-center"
              >
                {"+"}
              </button>
              <p className="ml-6 font-bold">P{totalPrice.toFixed(2)}</p>
              <button
                onClick={deleteCard}
                className="ml-6  text-red-600 focus:outline-none text-xs"
              >
                Delete
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartCard;
