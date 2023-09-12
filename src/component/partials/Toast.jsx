import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { setSuccess } from "../../store/StoreAction";
import { StoreContext } from "../../store/StoreContext";

const Toast = () => {
  const { dispatch, store } = React.useContext(StoreContext);

  React.useEffect(() => {
    setTimeout(() => {
      dispatch(setSuccess(false));
    }, 2000);
  });
  return (
    <>
      <div className="fixed z-50 top-2 left-1/2 -translate-x-1/2 flex items-center gap-2 py-2 px-4  shadow-sm  border-l-success border-l-2 rounded-tr-md rounded-br-md bg-white">
        <AiFillCheckCircle className="text-lg fill-success" />
        <p className="mb-0">{store.message}</p>
      </div>
    </>
  );
};

export default Toast;
