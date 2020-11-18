import React, { useState, Fragment } from "react";
import { Formik, Field, Form } from "formik";
import { Link } from "react-router-dom";
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
  username: Yup.string()
    .min(3, "Too Short!")
    .max(30, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(6, "Too Short!")
    .max(12, "Too Long!")
    .required("Required"),
});

const Login = ({ setAuth }) => {
  const [invalid, setInvalid] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  return (
    <Fragment>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-teal-400 to-blue-500">
        <div className="animate__animated animate__bounceIn flex flex-col items-center  shadow-xl rounded-lg py-10 bg-white h-auto w-4/12">
          <h1 className="text-3xl text-gray-800 font-bold">Sales Point</h1>
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                setIsLoginLoading(true);
                const res = await API.post("users/authenticate", values);
                console.log(res.data);
                localStorage.setItem("token", res.data.token);
                setIsLoginLoading(false);
                setSubmitting(false);
                setAuth(true);
                Toast.fire({
                  icon: "success",
                  title: "Signed in successfully",
                });
              } catch (error) {
                setInvalid(true);
                Toast.fire({
                  icon: "error",
                  title: "Wrong username/password!",
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
                    (errors.username && touched.username) || invalid
                      ? "border-red-400"
                      : null
                  } focus:outline-none py-2 px-4 w-full  border-b`}
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
                <button className="flex justify-center focus:outline-none transition duration-500 ease-linear mt-6 bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-400 hover:to-blue-600 text-white rounded-lg p-4 text-md font-bold">
                  {/* <svg
                    class="animate-spin bg-red-600 h-5 w-5 text-red-600"
                    viewBox="0 0 24 24"
                  ></svg> */}
                  {isLoginLoading ? (
                    <ButtonLoading size={20} color={"#ffff"} />
                  ) : (
                    "Login"
                  )}

                  {/* Login */}
                </button>
                <Link
                  className="self-center text-gray-500 hover:text-gray-700 mt-6 text-sm"
                  to="/register"
                >
                  Don't have an account? Register Now!
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
