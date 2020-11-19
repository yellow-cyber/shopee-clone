import React from "react";
import chihuahua from "../assets/img/chihuahua.png";
const MyItemCard = () => {
  return (
    <div className="h-96 w-1/4 p-2 flex-wrap text-gray-800">
      <div className="shadow-lg items-center justify-center flex-wrap flex-col h-full rounded-3xl flex p-4">
        <img src={chihuahua} className="w-24" alt="" />
        <h1 className="mt-2 text-2xl font-bold">Cheeseburger</h1>
        <small className="text-gray-400 text-xs break-words">
          Ground beef patty with cheese...
        </small>
        <div className="flex justify-around">
          <button className="mt-4 text-yellow-1000 focus:outline-none font-bold transform hover:scale-110 transition duration-300 px-4 py-2 text-xs rounded-3xl">
            EDIT
          </button>
          <button className="mt-4 text-red-600 focus:outline-none font-bold transform hover:scale-110 transition duration-300 px-4 py-2 text-xs rounded-3xl">
            DELETE
          </button>
        </div>

        {/* <p className="mt-2 text-yellow-1000 font-bold text-2xl">P3.50</p> */}
      </div>
    </div>
  );
};

export default MyItemCard;
