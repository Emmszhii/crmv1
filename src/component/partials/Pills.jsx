import React from "react";

const Pills = ({ label = "Active", bgc = "bg-green-800" }) => {
  return (
    <span
      className={`${bgc} text-[10px]  text-center rounded-full py-1 px-3 text-white`}
    >
      {label}
    </span>
  );
};

export default Pills;
