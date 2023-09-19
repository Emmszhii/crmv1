import React from "react";
import { BsChevronRight } from "react-icons/bs";
import { Link } from "react-router-dom";

const InfoSubListView = ({ infoId }) => {
  return (
    <>
      <ul className="sub__list">
        <li>
          <Link to={`/info/view?infoId=${infoId}`}>
            <button className="w-full">
              <span>Information</span>
              <div className="sub__list__arrow">
                <BsChevronRight />
              </div>
            </button>
          </Link>
        </li>
        <li>
          <Link to={`/info/engagement?infoId=${infoId}`}>
            <button className="w-full flex justify-between items-center">
              <span>Engagement</span>
              <div className="sub__list__arrow">
                <BsChevronRight />
              </div>
            </button>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default InfoSubListView;
