import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import Loading from "../misc/Loading";

const Sidebar = ({ setAuth, auth }) => {
  const onLogout = () => {
    localStorage.removeItem("token");
    setAuth(false);
  };
  if (!auth) return <Loading />;
  return (
    <div className="flex flex-col min-h-screen w-1/6 px-6 py-6 border-r">
      <div className="flex items-center justify-center border-b pb-2">
        <h1 className="font-bold text-xl text-gray-800">
          Chihuahua<span className="font-extrabold text-red-700">POS</span>
        </h1>
      </div>

      <div className="flex flex-col mt-4 text-white">
        <Link
          to="/products"
          className="flex items-center  font-semibold bg-gradient-to-r   text-gray-900 hover:text-gray-900 transition duration-300 ease-linear hover:from-yellow-1000 hover:to-yellow-1000 rounded-3xl px-6 py-4 text-sm"
        >
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            className="bi bi-handbag-fill mr-2"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 1a2 2 0 0 0-2 2v2H5V3a3 3 0 0 1 6 0v2h-1V3a2 2 0 0 0-2-2zM5 5H3.361a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.356a2.5 2.5 0 0 0 2.472-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5H11v1.5a.5.5 0 0 1-1 0V5H6v1.5a.5.5 0 0 1-1 0V5z" />
          </svg>
          Products
        </Link>
        <Link
          to="/cart"
          className="flex items-center font-semibold bg-gradient-to-r    text-gray-900 hover:text-gray-900 transition duration-300 ease-linear hover:from-yellow-1000 hover:to-yellow-1000 rounded-3xl px-6 py-4 text-sm"
        >
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            class="bi bi-cart-fill mr-2"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
            />
          </svg>
          Cart
        </Link>

        <Link
          to="/about"
          className=" flex items-center font-semibold bg-gradient-to-r   text-gray-900 hover:text-gray-900 transition duration-300 ease-linear hover:from-yellow-1000 hover:to-yellow-1000 rounded-3xl px-6 py-4 text-sm"
        >
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            className="bi bi-info-square-fill mr-2"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.93 4.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
            />
          </svg>
          About
        </Link>
        <button
          onClick={onLogout}
          className="focus:outline-none flex items-center font-semibold bg-gradient-to-r   text-gray-900 hover:text-gray-900 transition duration-300 ease-linear hover:from-yellow-1000 hover:to-yellow-1000 rounded-3xl px-6 py-4 text-sm"
        >
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            className="bi bi-door-open-fill mr-2"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15H1.5zM11 2v13h1V2.5a.5.5 0 0 0-.5-.5H11zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z"
            />
          </svg>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
