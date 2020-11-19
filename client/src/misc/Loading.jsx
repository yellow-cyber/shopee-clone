import React from "react";
import Loader from "react-spinners/BeatLoader";

const Loading = () => {
  return (
    <div
      className={`bg-gradient-to-r from-yellow-1000 to-yellow-1000 flex justify-center items-center absolute inset-0`}
    >
      <Loader color={"#FFFFFF"} />
    </div>
  );
};

export default Loading;
