import React, { useEffect, useState } from "react";
import chihuahua from "../assets/img/chihuahua.png";
import { API } from "../utils/API";
import * as Yup from "yup";
import ReactModal from "react-modal";
import Swal from "sweetalert2";
import { Field, Form, Formik } from "formik";
import ButtonLoading from "react-spinners/MoonLoader";

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
const ProductSchema = Yup.object().shape({
  productName: Yup.string()
    .min(3, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  quantity: Yup.number().required().positive().integer(),
  description: Yup.string()
    .min(6, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
});
const MyItemCard = ({
  isFetchingData,
  setProductsUpdate,
  product,
  setIsFetchingData,
}) => {
  const { productName, description, id, quantity, sold } = product;
  const [isUpdating, setIsUpdating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);

  const closeModal = () => {
    if (!isFormLoading) setIsModalOpen(false);
  };
  useEffect(() => {
    console.log(typeof productName);
  }, []);

  const deleteProduct = async () => {
    try {
      setIsFetchingData(true);
      setIsUpdating(true);
      await API.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      });
      setProductsUpdate(true);
      setIsUpdating(false);
      // Toast.fire({
      //   icon: "success",
      //   title: "Product successfully deleted!",
      // });
    } catch (err) {
      console.log(err);
    }
  };
  if (isUpdating || isFetchingData) {
    return null;
  }
  return (
    <>
      <div className="h-96 w-1/4 p-2 flex-wrap text-gray-800">
        <div className="shadow-lg items-center justify-center flex-wrap flex-col h-full rounded-3xl flex p-4">
          <img src={chihuahua} className="w-24" alt="" />
          <h1 className="mt-2 text-2xl font-bold">{productName}</h1>
          <small className="text-gray-400 text-xs break-words">
            {description.length > 10
              ? description.substring(0, 10) + "..."
              : description}
          </small>
          <div className="flex justify-around">
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 text-yellow-1000 focus:outline-none font-bold transform hover:scale-110 transition duration-300 px-4 py-2 text-xs rounded-3xl"
            >
              EDIT
            </button>
            <button
              onClick={deleteProduct}
              className="mt-4 text-red-600 focus:outline-none font-bold transform hover:scale-110 transition duration-300 px-4 py-2 text-xs rounded-3xl"
            >
              DELETE
            </button>
          </div>

          {/* <p className="mt-2 text-yellow-1000 font-bold text-2xl">P3.50</p> */}
        </div>
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
            <h1 className="font-bold text-2xl">Edit {productName}</h1>
          </div>
          <Formik
            initialValues={{
              productName: productName,
              quantity: quantity,
              description: description,
            }}
            validationSchema={ProductSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                setIsFormLoading(true);
                const res = await API.put(`/products/${id}`, values, {
                  headers: { Authorization: `Bearer ${localStorage.token}` },
                });
                setSubmitting(false);
                setIsFormLoading(false);
                setProductsUpdate(true);
                setIsModalOpen(false);
                Toast.fire({
                  icon: "success",
                  title: "Product successfully updated!",
                });
              } catch (error) {
                console.log(error.message);
                setIsFormLoading(false);
                Toast.fire({
                  icon: "error",
                  title: "Something went wrong!",
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
                  placeholder="Quantity"
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

export default MyItemCard;
