import React from "react";
import Loading from "../misc/Loading";

const Home = ({ auth, setAuth }) => {
  const onLogout = () => {
    localStorage.removeItem("token");
    setAuth(false);
  };
  if (!auth) return <Loading />;
  return (
    <div>
      <p>Home</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Home;
