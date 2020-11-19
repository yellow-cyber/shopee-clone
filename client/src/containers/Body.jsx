import React from "react";
import { Route } from "react-router-dom";
import Products from "./Products";
import About from "./About";
import Cart from "./Cart";

const Body = () => {
  return (
    <div className="flex flex-col  w-full min-h-screen px-10 py-6">
      <Route exact path="/">
        <Products />
      </Route>
      <Route path="/products">
        <Products />
      </Route>
      <Route path="/cart">
        <Cart />
      </Route>
      <Route path="/about">
        <About />
      </Route>
    </div>
  );
};

export default Body;
