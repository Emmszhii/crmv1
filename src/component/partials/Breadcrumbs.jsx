import React from "react";
import { Link, useLocation } from "react-router-dom";
import { StoreContext } from "../../store/StoreContext";

const Breadcrumbs = ({ param = "" }) => {
  const { dispatch } = React.useContext(StoreContext);
  const location = useLocation();

  let currentLink = "";
  const handleClick = () => {
    dispatch(setStartIndex(0));
    dispatch(setIsSearch(false));
  };
  const crumbs = location.pathname
    .replace("-", " ")
    .split("/")
    .filter((crumb) => crumb !== "");

  return (
    <>
      <ul className="breadcrumbs">
        {crumbs.map((link, key) => {
          currentLink += `/${link.replace(" ", "-")}`;
          return (
            <li key={key}>
              <Link to={`${currentLink}${param}`} onClick={handleClick}>
                {link.replace("-", " ").replace("_", "/")}
              </Link>
            </li>
          );
        })}
        {/* <li>
          <Link>Settings</Link>
        </li>
        <li>
          <Link>Roles</Link>
        </li> */}
      </ul>
    </>
  );
};

export default Breadcrumbs;
