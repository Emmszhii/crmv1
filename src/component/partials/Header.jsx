import React from "react";
import LogoutLogo from "../svg/LogoutLogo";
import { StoreContext } from "../../store/StoreContext";
import { setIsMenuOpen } from "../../store/StoreAction";

const Header = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const handleToggleMenu = () => dispatch(setIsMenuOpen(!store.isMenuOpen));

  return (
    <>
      <header className="bg-primary py-5 md:py-3 px-4 flex justify-between items-center">
        <div className="flex items-center">
          <div
            className={`toggle__btn ${store.isMenuOpen ? "active" : ""}`}
            onClick={handleToggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <img src="/logo.png" alt="" className="w-36 md:w-52" />
        </div>
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
