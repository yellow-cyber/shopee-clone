import React, { useEffect, useState } from "react";
import chihuahua from "../assets/img/chihuahua.png";
import { API } from "../utils/API";
import Loader from "react-spinners/BeatLoader";

const PurchaseCard = ({ cartProduct, setPriceToPay, priceToPay }) => {
  const { id, price, description, quantity, itemid } = cartProduct;
  const [qty, setQty] = useState(parseInt(quantity));
  const [unitPrice, setUnitPrice] = useState(price);
  const [totalPrice, setTotalPrice] = useState(unitPrice * qty);
  const [product, setProduct] = useState({});
  const [isFetchingData, setIsFetchingData] = useState(true);
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

  return (
    <div className="rounded-xl  border my-1 px-6 py-6 flex items-center">
      {isFetchingData ? (
        <div className="w-full flex justify-center">
          <Loader color={"#9CA3AF"} />
        </div>
      ) : (
        <>
          <div className="flex w-2/3 items-center">
            <img src={chihuahua} className="w-6 mr-2" alt="" />
            <h1 className="font-bold text-gray-800">{product.productName}</h1>
          </div>
          <div className="flex justify-end w-1/3 items-center">
            {/* <p className="mr-6">P{unitPrice}</p> */}
            <div className="flex items-center">
              <div className="border w-12 h-8 flex items-center justify-center">
                {qty}
              </div>

              <p className="ml-6 font-bold">P{totalPrice.toFixed(2)}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PurchaseCard;
