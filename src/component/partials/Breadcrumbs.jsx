import React from "react";
import { Link, useLocation } from "react-router-dom";
import { StoreContext } from "../../store/StoreContext";
import { devNavUrl } from "../helpers/functions-general";
import { setIsSearch, setStartIndex } from "../../store/StoreAction";
import { array } from "yup";

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
  const isMain = crumbs[0];

  return (
    <>
      <ul className="breadcrumbs">
        {crumbs.map((link, key, arr) => {
          currentLink += `/${link.replace(" ", "-")}`;
          return (
            <li key={key}>
              <Link
                to={`${devNavUrl}${currentLink}${isMain === link ? "" : param}`}
                onClick={handleClick}
              >
                {link.replace("-", " ").replace("_", "/")}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Breadcrumbs;
