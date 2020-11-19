import React, { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import { API } from "../utils/API";
import Loader from "react-spinners/BeatLoader";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isFetchingData, setIsFetchingData] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await API.get("/products", {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        });
        setProducts(res.data);
        setIsFetchingData(false);
      } catch (error) {}
    };
    getProducts();
  }, []);
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
      <div className="flex ">
        <h1 className="text-3xl text-gray-800 font-extrabold">Products</h1>
      </div>
      <div className="flex mt-6 flex-wrap justify-start">
        {products.map((product, index) => {
          return <ItemCard key={product.id} product={product} />;
        })}
      </div>
    </>
  );
};

export default Products;
