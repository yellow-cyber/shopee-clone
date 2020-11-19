import React from "react";
import { Route } from "react-router-dom";

const Home = ({ children }) => {
  return <div className="flex min-h-screen ">{children}</div>;
};

export default Home;
