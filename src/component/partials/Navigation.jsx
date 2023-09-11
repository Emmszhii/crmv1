import React from "react";
import { BsFillGearFill } from "react-icons/bs";
import { PiCaretRight } from "react-icons/pi";
import { Link } from "react-router-dom";
import { StoreContext } from "../../store/StoreContext";
import { setIsSettingsOpen } from "../../store/StoreAction";

const Navigation = ({ menu, submenu = "null" }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  const handleCloseSettings = (e) => {
    dispatch(setIsSettingsOpen(!store.isSettingsOpen));
  };

  return (
    <>
      <div className="h-[calc(100vh_-_83px)] bg-white pt-8 pl-8">
        <ul>
          <li className={`nav__link ${store.isSettingsOpen && "active"}`}>
            <button
              className="flex items-center gap-3 w-full px-2 py-1"
              onClick={handleCloseSettings}
            >
              <div className="flex items-center gap-3 text-[17px]">
                <BsFillGearFill /> Settings
              </div>
              <PiCaretRight
                className={`${store.isSettingsOpen && "rotate-90"}`}
              />
            </button>
            <div className="sub__menu">
              <ul>
                <li className={`sub__link active`}>
                  <Link to={`settings/roles`} className={``}>
                    Roles
                  </Link>
                </li>
                <li className="sub__link">
                  <Link>System Account</Link>
                </li>
                <li className="sub__link">
                  <Link>Services Category</Link>
                </li>
                <li className="sub__link">
                  <Link>Bank Detail</Link>
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
