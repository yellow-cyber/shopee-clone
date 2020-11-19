import React from "react";

const Navbar = ({ currentUser }) => {
  return (
    <div className="flex w-full h-20 px-10 py-4 border-b">
      <div className="w-3/4 flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="w-4/12 focus:outline-none text-xs font-semibold text-gray-700 bg-gray-200 px-6 py-4 rounded-3xl"
        />
      </div>
      <div className="ml-auto items-center flex">
        <h1>
          Hello, <span className="font-bold">{currentUser.username}</span>
        </h1>
      </div>
    </div>
  );
};

export default Navbar;
