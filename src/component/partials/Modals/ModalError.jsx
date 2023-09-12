import React from "react";
import { AiFillExclamationCircle } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
import { setError } from "../../../store/StoreAction";
import { StoreContext } from "../../../store/StoreContext";

const ModalError = () => {
  const { dispatch, store } = React.useContext(StoreContext);
  const handleClose = () => {
    dispatch(setError(false));
  };
  return (
    <>
      <div className="bg-black/50 fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center z-50">
        <div
          className={`absolute mx-1 bg-white border border-gray-200 rounded-md max-w-[420px] w-full shadow-xl`}
        >
          <div className="modal__header relative px-4 pt-8 ">
            <div className="text-7xl text-alert flex justify-center">
              <AiFillExclamationCircle />
            </div>
            <h2 className="text-center font-bold text-alert text-xl pt-2">
              Sorry!
            </h2>
            <button className="absolute top-4 right-4" onClick={handleClose}>
              <FaTimes className="text-gray-700 text-sm" />
            </button>
          </div>
          <div className="modal__body px-4 pt-4 pb-7 text-center">
            <h3 className="text-sm">{store.message}</h3>
          </div>
          <div className="modal__action flex flex-col gap-2 m-4 text-sm font-thin">
            <button
              className="btn btn--alert"
              type="submit"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalError;
