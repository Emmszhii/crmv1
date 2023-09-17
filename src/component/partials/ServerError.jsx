import React from "react";
import IconServerError from "../svg/IconServerError";

const ServerError = () => {
  return (
    <div className="flex justify-center items-center flex-col p-2">
      <div className="mb-3">
        <IconServerError />
      </div>
      <span className="font-bold text-gray-300 text-2xl">Server Error</span>
    </div>
  );
};

export default ServerError;
