import React, { Fragment } from "react";
import ReactModal from "react-modal";

// interface Props {
//   isOpen: boolean;
//   onRequestClose: () => void;
//   contentLabel: string;
// }
const Modal = ({ isOpen, onRequestClose, contentLabel, children }) => {
  return (
    <Fragment>
      <ReactModal
        isOpen={isOpen}
        contentLabel={contentLabel}
        onRequestClose={onRequestClose}
        className="max-h-full animate__animated animate__bounceInDown overflow-auto text-white  rounded-lg  w-10/12 sm:w-8/12 md:w-1/2  lg:w-1/3  focus:outline-none bg-dark-black-400"
        overlayClassName="animate__animated animate_fadeIn flex flex-wrap py-5 justify-center items-center fixed inset-0 bg-black bg-opacity-75"
      >
        <div className="h-full  flex flex-col flex-wrap ">{children}</div>
      </ReactModal>
    </Fragment>
  );
};

export default Modal;
