import React from "react";
import { Link } from "react-router-dom";

const Breadcrumbs = () => {
  return (
    <>
      <ul className="breadcrumbs">
        <li>
          <Link>Settings</Link>
        </li>
        <li>
          <Link>Roles</Link>
        </li>
      </ul>
    </>
  );
};

export default Breadcrumbs;
