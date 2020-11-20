import React, { useEffect, useState } from "react";
import MyItemCard from "../components/MyItemCard";
import ReactModal from "react-modal";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import ButtonLoading from "react-spinners/MoonLoader";
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

ReactModal.setAppElement("body");
const ProductSchema = Yup.object().shape({
  productName: Yup.string()
    .min(3, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  quantity: Yup.number().required().positive().integer(),
  price: Yup.number().required().positive(),
  description: Yup.string()
    .min(6, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
});
const MyProducts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [myProducts, setMyProducts] = useState([]);
  const [productsUpdate, setProductsUpdate] = useState(true);
  const [isFetchingData, setIsFetchingData] = useState(true);
  useEffect(() => {
    const getMyProducts = async () => {
      try {
        const res = await API.get("/auth/my-products", {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        });
        setMyProducts(res.data); //edit this
        setIsFetchingData(false);
      } catch (error) {}
    };
    if (productsUpdate) {
      getMyProducts();
      setProductsUpdate(false);
    }
  }, [productsUpdate]);

  const closeModal = () => {
    if (!isFormLoading) setIsModalOpen(false);
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
      <div className="flex ">
        <h1 className="text-3xl text-gray-800 font-extrabold">My Products</h1>
        <div className="ml-auto flex">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-400 px-6 rounded-3xl text-white font-bold focus:outline-none transition duration-300 transform hover:scale-110"
          >
            Add a product +
          </button>
        </div>
      </div>
      <div className="flex mt-6 flex-wrap justify-start">
        {myProducts.map((product, index) => {
          return (
            <MyItemCard
              setIsFetchingData={setIsFetchingData}
              isFetchingData={isFetchingData}
              setProductsUpdate={setProductsUpdate}
              key={product.id}
              product={product}
            />
          );
        })}
      </div>

      <ReactModal
        isOpen={isModalOpen}
        contentLabel={`AttendanceMark`}
        onRequestClose={closeModal}
        className="animate__animated animate__bounceInDown text-white  rounded-lg  w-10/12 sm:w-8/12 md:w-1/2  lg:w-1/3  focus:outline-none"
        overlayClassName="animate__animated animate_fadeIn flex justify-center items-center  fixed inset-0 bg-black bg-opacity-75"
      >
        <div className="h-auto p-6 rounded-3xl bg-white text-gray-800 flex flex-col flex-wrap py-10 ">
          <div className="flex rounded-t-lg flex-col flex-wrap items-center">
            <h1 className="font-bold text-2xl">Add a product</h1>
          </div>
          <Formik
            initialValues={{
              productName: "",
              quantity: 1,
              price: 0.0,
              description: "",
            }}
            validationSchema={ProductSchema}
            onSubmit={async (values, { setSubmitting }) => {
              values.sold = 0;
              try {
                setIsFormLoading(true);
                const res = await API.post("/products", values, {
                  headers: { Authorization: `Bearer ${localStorage.token}` },
                });
                setSubmitting(false);
                setIsFormLoading(false);
                setProductsUpdate(true);
                setIsModalOpen(false);
                Toast.fire({
                  icon: "success",
                  title: "Product successfully added!",
                });
              } catch (error) {
                console.log(error.message);
                setIsFormLoading(false);
                Toast.fire({
                  icon: "error",
                  title: "Product name already taken!",
                });
              }
            }}
          >
            {({ errors, touched }) => (
              <Form className="flex flex-wrap flex-col mt-6 w-full px-4">
                <label
                  htmlFor="productName"
                  className=" text-xs font-bold text-gray-800"
                >
                  Name
                </label>
                <Field
                  type="text"
                  className={`${
                    errors.productName && touched.productName
                      ? "border-red-400"
                      : null
                  } focus:outline-none py-2 text-sm w-full  border-b`}
                  placeholder="Product name"
                  id="productName"
                  name="productName"
                  autoComplete="off"
                />
                {errors.productName && touched.productName ? (
                  <span className=" text-xs text-red-600 mb-2">
                    {errors.productName}
                  </span>
                ) : null}
                <label
                  htmlFor="quantity"
                  className="mt-6 text-xs font-bold text-gray-800"
                >
                  Quantity
                </label>
                <Field
                  type="number"
                  min="1"
                  className={`${
                    errors.quantity && touched.quantity
                      ? "border-red-400"
                      : null
                  } focus:outline-none py-2 text-sm w-full  border-b`}
                  placeholder="Product name"
                  id="quantity"
                  name="quantity"
                  autoComplete="off"
                />
                {errors.quantity && touched.quantity ? (
                  <span className=" text-xs text-red-600 mb-2">
                    {errors.quantity}
                  </span>
                ) : null}
                <label
                  htmlFor="price"
                  className="mt-6 text-xs font-bold text-gray-800"
                >
                  Price
                </label>
                <Field
                  type="number"
                  step="any"
                  min="1"
                  className={`${
                    errors.price && touched.price ? "border-red-400" : null
                  } focus:outline-none py-2 text-sm w-full  border-b`}
                  placeholder="Product Price"
                  id="price"
                  name="price"
                  autoComplete="off"
                />
                {errors.price && touched.price ? (
                  <span className=" text-xs text-red-600 mb-2">
                    {errors.price}
                  </span>
                ) : null}

                <label
                  htmlFor="description"
                  className="mt-6 text-xs font-bold text-gray-800"
                >
                  Description
                </label>
                <Field
                  type="text"
                  min="1"
                  className={`${
                    errors.description && touched.description
                      ? "border-red-400"
                      : null
                  } focus:outline-none py-2 text-sm w-full  border-b`}
                  placeholder="Product Description"
                  id="description"
                  name="description"
                  autoComplete="off"
                />
                {errors.description && touched.description ? (
                  <span className=" text-xs text-red-600 mb-2">
                    {errors.description}
                  </span>
                ) : null}

                <button
                  type="submit"
                  className="flex justify-center focus:outline-none transition duration-500 ease-linear mt-6 bg-gradient-to-r from-yellow-1000 to-yellow-1000 hover:from-yellow-400 hover:to-yellow-400 text-gray-800 rounded-lg p-4 text-md font-bold"
                >
                  {isFormLoading ? (
                    <ButtonLoading size={20} color={"#000"} />
                  ) : (
                    "Submit"
                  )}

                  {/* Login */}
                </button>
              </Form>
            )}
          </Formik>

          <div className="flex justify-center  items-center flex-wrap flex-row"></div>
        </div>
      </ReactModal>
    </>
  );
};

export default MyProducts;
