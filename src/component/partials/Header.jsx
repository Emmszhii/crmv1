import React from "react";
import LogoutLogo from "../svg/LogoutLogo";

const Header = () => {
  return (
    <>
      <header className="bg-primary py-3 px-4 flex justify-between items-center">
        <img src="/logo.png" alt="" />
        <div className="text-white flex items-center gap-6 px-1">
          <h4 className=" bg-secondary p-1 rounded-full text-sm relative before:content-['']  before:absolute before:-right-3 before:-top-[1px] before:border-white before:w-[1px] before:h-[30px] before:bg-white">
            GG
          </h4>
          <button className="text-xl">
            <LogoutLogo />
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
