import React from "react";
import {
  setIsAdd,
  setIsClientOpen,
  setIsInfoOpen,
  setIsSettingsOpen,
} from "../../../../../store/StoreAction";

import { StoreContext } from "../../../../../store/StoreContext";
import useQueryData from "../../../../custom-hooks/useQueryData";
import { getUrlParam } from "../../../../helpers/functions-general";
import Breadcrumbs from "../../../../partials/Breadcrumbs";
import Header from "../../../../partials/Header";
import ModalError from "../../../../partials/Modals/ModalError";
import Navigation from "../../../../partials/Navigation";
import Nodata from "../../../../partials/Nodata";
import Pills from "../../../../partials/Pills";
import ServerError from "../../../../partials/ServerError";
import TableLoading from "../../../../partials/TableLoading";
import FetchingSpinner from "../../../../partials/spinners/FetchingSpinner";
import ModalAddInfoRoles from "../roles/modals/ModalAddInfoRoles";
import EditSvg from "../../../../svg/EditSvg";

const InfoView = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
  const infoId = getUrlParam().get("infoId");
  let counter = 1,
    active = 0,
    inactive = 0;
  const {
    isLoading,
    isFetching,
    error,
    data: info,
  } = useQueryData(
    `/v1/controllers/developer/info/info.php?infoId=${infoId}`, // endpoint
    "get", // method
    "info" // key
  );
  React.useEffect(() => {
    dispatch(setIsInfoOpen(true));
    dispatch(setIsClientOpen(false));
    dispatch(setIsSettingsOpen(false));
  }, []);

  const handleEdit = (item) => {
    setItemEdit(item);
    dispatch(setIsAdd(true));
  };

  return (
    <>
      <Header />
      <section className="main__grid">
        <aside className={`${store.isInfoOpen ? "active" : ""}`}>
          <Navigation menu="myInfo" />
        </aside>
        <main className="px-6 md:px-10 overflow-y-auto custom__scroll">
          {store.isMenuOpen ? <div className="overlay"></div> : ""}
          <div className="mt-8 mb-8 lg:mb-0 flex items-center justify-center flex-col gap-2 lg:flex-row lg:justify-between">
            <h1 className="text-4xl font-bold">Info Roles</h1>
            <Breadcrumbs param={location.search} />
          </div>

          <div className="bg-white pt-8 pb-6 px-4 mt-8 lg:mt-4 custom__scroll overflow-x-auto ">
            {isFetching && !isLoading && <FetchingSpinner />}
            {info?.error ? (
              <ServerError />
            ) : (
              <>
                {(isLoading || info?.data.length === 0) && (
                  <>
                    {isLoading ? (
                      <TableLoading count={20} cols={3} />
                    ) : (
                      <Nodata />
                    )}
                  </>
                )}
                {error && <ServerError />}
                {info?.data.map((item, key) => {
                  return (
                    <ul key={key}>
                      <li className="flex justify-end">
                        <button
                          className="tooltip"
                          data-tooltip="Edit"
                          onClick={() => handleEdit(item)}
                        >
                          <EditSvg />
                        </button>
                      </li>

                      <li className="grid grid-cols-2">
                        <span>Status :</span>
                        <p>
                          {item.info_is_active === 1 ? (
                            <>
                              <Pills label="Active" bgc="bg-green-600" />
                            </>
                          ) : (
                            <>
                              <Pills label="Inactive" bgc="bg-archive" />
                            </>
                          )}
                        </p>
                      </li>
                      <li className="grid grid-cols-2">
                        <span>Name : </span>
                        <p>{item.info_name}</p>
                      </li>
                      <li className="grid grid-cols-2">
                        <span>Description : </span>
                        {item.info_description}
                      </li>
                    </ul>
                  );
                })}
              </>
            )}
          </div>
        </main>
      </section>
      {store.isAdd && <ModalAddInfoRoles itemEdit={itemEdit} />}
      {store.error && <ModalError />}
    </>
  );
};

export default InfoView;
