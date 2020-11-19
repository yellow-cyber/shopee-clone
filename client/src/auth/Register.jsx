import React, { useState, Fragment } from "react";
import { Formik, Field, Form } from "formik";
import { Link, Redirect } from "react-router-dom";
import * as Yup from "yup";
import { API } from "../utils/API";
import ButtonLoading from "react-spinners/MoonLoader";
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

const LoginSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "Too Short!")
    .max(30, "Too Long!")
    .required("Required!"),
  lastName: Yup.string()
    .min(3, "Too Short!")
    .max(30, "Too Long!")
    .required("Required!"),
  username: Yup.string()
    .min(3, "Too Short!")
    .max(30, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(6, "Too Short!")
    .max(12, "Too Long!")
    .required("Required"),
  confirmPassword: Yup.string()
    .min(6, "Too Short!")
    .max(12, "Too Long!")
    .required("Required!")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const Login = ({ setAuth }) => {
  const [invalid, setInvalid] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  if (registered) {
    return <Redirect to="/login" />;
  }
  return (
    <Fragment>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-yellow-1000 to-yellow-1000">
        <div className="animate__animated animate__bounceIn flex flex-col items-center  shadow-xl rounded-lg py-10 bg-white h-auto w-4/12">
          <h1 className="text-3xl text-gray-800 font-bold">
            Create an account
          </h1>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              username: "",
              password: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                setIsLoginLoading(true);
                const res = await API.post("users/register", values);
                console.log(res.data);
                setRegistered(true);
                setIsLoginLoading(false);
                setSubmitting(false);
                Toast.fire({
                  icon: "success",
                  title: "Registered successfully",
                });
              } catch (error) {
                setInvalid(true);
                Toast.fire({
                  icon: "error",
                  title: "Something went wrong!",
                });
                setIsLoginLoading(false);
              }
            }}
          >
            {({ errors, touched }) => (
              <Form className="flex  flex-col mt-10 w-5/6">
                <Field
                  type="text"
                  className={`${
                    (errors.firstName && touched.firstName) || invalid
                      ? "border-red-400"
                      : null
                  } focus:outline-none py-2 px-4 w-full  border-b `}
                  placeholder="First name "
                  id="firstName"
                  name="firstName"
                  autoComplete="off"
                />
                {errors.firstName && touched.firstName ? (
                  <span className="pl-3 text-xs text-red-600 mb-2">
                    {errors.firstName}
                  </span>
                ) : null}
                <Field
                  type="text"
                  className={`${
                    (errors.lastName && touched.lastName) || invalid
                      ? "border-red-400"
                      : null
                  } focus:outline-none py-2 px-4 w-full  border-b mt-6`}
                  placeholder="Last name "
                  id="lastName"
                  name="lastName"
                  autoComplete="off"
                />
                {errors.lastName && touched.lastName ? (
                  <span className="pl-3 text-xs text-red-600 mb-2">
                    {errors.lastName}
                  </span>
                ) : null}
                <Field
                  type="text"
                  className={`${
                    (errors.username && touched.username) || invalid
                      ? "border-red-400"
                      : null
                  } focus:outline-none py-2 px-4 w-full  border-b mt-6`}
                  placeholder="Username "
                  id="username"
                  name="username"
                  autoComplete="off"
                />
                {errors.username && touched.username ? (
                  <span className="pl-3 text-xs text-red-600 mb-2">
                    {errors.username}
                  </span>
                ) : null}
                <Field
                  type="password"
                  className={`${
                    (errors.password && touched.password) || invalid
                      ? "border-red-400"
                      : null
                  } mt-6 focus:outline-none py-2 px-4 border-b`}
                  placeholder="Password "
                  id="password"
                  name="password"
                  autoComplete="off"
                />
                {errors.password && touched.password ? (
                  <span className="pl-3 text-xs text-red-600 mb-2">
                    {errors.password}
                  </span>
                ) : null}
                <Field
                  type="password"
                  className={`${
                    (errors.confirmPassword && touched.confirmPassword) ||
                    invalid
                      ? "border-red-400"
                      : null
                  } mt-6 focus:outline-none py-2 px-4 border-b`}
                  placeholder="Repeat password "
                  id="confirmPassword"
                  name="confirmPassword"
                  autoComplete="off"
                />
                {errors.confirmPassword && touched.confirmPassword ? (
                  <span className="pl-3 text-xs text-red-600 mb-2">
                    {errors.confirmPassword}
                  </span>
                ) : null}
                <button className="flex justify-center focus:outline-none transition duration-500 ease-linear mt-6 bg-gradient-to-r from-yellow-1000 to-yellow-1000 hover:from-yellow-400 hover:to-yellow-400 text-gray-800 rounded-lg p-4 text-md font-bold">
                  {isLoginLoading ? (
                    <ButtonLoading size={20} color={"#000"} />
                  ) : (
                    "Register"
                  )}
                </button>
                <Link
                  className="self-center text-gray-500 hover:text-gray-700 mt-6 text-sm"
                  to="/login"
                >
                  Already have an account?
                </Link>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
