import React from "react";
import { BsFillGearFill } from "react-icons/bs";
import { PiCaretRight } from "react-icons/pi";
import { Link } from "react-router-dom";
import { StoreContext } from "../../store/StoreContext";
import { devNavUrl } from "../helpers/functions-general";

const Navigation = ({ menu, submenu = "null" }) => {
  const { store } = React.useContext(StoreContext);

  return (
    <>
      <div className="h-[calc(100vh_-_83px)] bg-white pt-8 pl-4 lg:pl-8 w-60 md:w-80 lg:w-auto">
        <ul>
          <li className={`nav__link ${menu === "settings" ? "active" : ""}`}>
            <button className="flex items-center gap-3 w-full px-2 py-1">
              <div className="flex items-center gap-3 text-[17px]">
                <BsFillGearFill /> Settings
              </div>
              <PiCaretRight
                className={`${store.isSettingsOpen ? "rotate-90" : ""}`}
              />
            </button>
            <div className="sub__menu">
              <ul>
                <li className={`sub__link active`}>
                  <Link to={`${devNavUrl}/settings/roles`}>Roles</Link>
                </li>
                <li className="sub__link">
                  <Link to={`${devNavUrl}/settings/system-account`}>
                    System Account
                  </Link>
                </li>
                <li className="sub__link">
                  <Link to={`${devNavUrl}/settings/services-category`}>
                    Services Category
                  </Link>
                </li>
                <li className="sub__link">
                  <Link to={`${devNavUrl}/settings/bank-details`}>
                    Bank Detail
                  </Link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navigation;
