import React from "react";
import { BsFillGearFill } from "react-icons/bs";
import { BiSolidUser } from "react-icons/bi";
import { PiCaretRight } from "react-icons/pi";
import { Link } from "react-router-dom";
import { StoreContext } from "../../store/StoreContext";
import { devNavUrl } from "../helpers/functions-general";
import {
  setIsClientOpen,
  setIsInfoOpen,
  setIsMenuOpen,
  setIsSearch,
  setIsSettingsOpen,
  setStartIndex,
} from "../../store/StoreAction";
import { AiFillInfoCircle } from "react-icons/ai";

const Navigation = ({ menu, submenu = "null" }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  const handleShow = () => {
    dispatch(setIsSearch(false));
    dispatch(setStartIndex(0));
  };

  const handleShowSettings = () => {
    dispatch(setIsClientOpen(false));
    dispatch(setIsSettingsOpen(true));
    dispatch(setIsInfoOpen(false));
  };
  const handleShowClient = () => {
    dispatch(setIsSettingsOpen(false));
    dispatch(setIsClientOpen(true));
    dispatch(setIsInfoOpen(false));
  };

  const handleMyInfo = () => {
    dispatch(setIsSettingsOpen(false));
    dispatch(setIsClientOpen(false));
    dispatch(setIsInfoOpen(true));
  };

  return (
    <>
      <div className="h-[calc(100vh_-_83px)] bg-white pt-8 pl-4 lg:pl-8 w-60 md:w-80 lg:w-auto">
        <ul>
          <li className={`nav__link ${store.isClientOpen ? "active" : ""}`}>
            <button
              className="flex items-center gap-3 w-full px-2 py-1"
              onClick={handleShowClient}
            >
              <div className="flex items-center gap-3 text-[17px]">
                <BiSolidUser /> Client
              </div>
              <PiCaretRight
                className={`${store.isClientOpen ? "rotate-90" : ""}`}
              />
            </button>
            <div className="sub__menu">
              <ul>
                <li
                  className={`sub__link ${
                    submenu === "clientList" ? "active" : ""
                  }`}
                >
                  <Link to={`${devNavUrl}/client/list`}>List</Link>
                </li>
                <li
                  className={`sub__link ${
                    submenu === "clientAccount" ? "active" : ""
                  }`}
                >
                  <Link to={`${devNavUrl}/client/account`}>Account</Link>
                </li>
              </ul>
            </div>
          </li>
          <li className={`nav__link ${store.isSettingsOpen ? "active" : ""}`}>
            <button
              className="flex items-center gap-3 w-full px-2 py-1"
              onClick={handleShowSettings}
            >
              <div className="flex items-center gap-3 text-[17px]">
                <BsFillGearFill /> Settings
              </div>
              <PiCaretRight
                className={`${store.isSettingsOpen ? "rotate-90" : ""}`}
              />
            </button>
            <div className="sub__menu">
              <ul>
                <li
                  className={`sub__link ${
                    submenu === "settingsRoles" ? "active" : ""
                  }`}
                >
                  <Link to={`${devNavUrl}/settings/roles`}>Roles</Link>
                </li>
                <li
                  onClick={handleShow}
                  className={`sub__link ${
                    submenu === "settingsSystemAccount" ? "active" : ""
                  }`}
                >
                  <Link to={`${devNavUrl}/settings/system-account`}>
                    System Account
                  </Link>
                </li>
                <li
                  className={`sub__link ${
                    submenu === "settingsServicesCategory" ? "active" : ""
                  }`}
                >
                  <Link to={`${devNavUrl}/settings/services-category`}>
                    Services Category
                  </Link>
                </li>
                <li
                  className={`sub__link ${
                    submenu === "settingsBankDetails" ? "active" : ""
                  }`}
                >
                  <Link to={`${devNavUrl}/settings/bank-details`}>
                    Bank Detail
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li className={`nav__link ${store.isInfoOpen ? "active" : ""}`}>
            <Link to={`/info`}>
              <button
                className="flex items-center gap-3 w-full px-2 py-1"
                onClick={handleMyInfo}
              >
                <div className="flex items-center gap-3 text-[17px]">
                  <AiFillInfoCircle /> Info
                </div>
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navigation;
