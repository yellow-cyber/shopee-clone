import React, { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import { API } from "../utils/API";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await API.get("/products", {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        });
        setProducts(res.data); //edit this
        console.log(res.data);
      } catch (error) {}
    };
    getProducts();
  }, []);
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
