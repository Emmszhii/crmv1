import React from "react";
import { StoreContext } from "../../../../../../store/StoreContext";
import { getUrlParam } from "../../../../../helpers/functions-general";
import useQueryData from "../../../../../custom-hooks/useQueryData";
import {
  setIsAdd,
  setIsInfoOpen,
  setIsSettingsOpen,
} from "../../../../../../store/StoreAction";
import Toast from "../../../../../partials/Toast";
import ModalError from "../../../../../partials/Modals/ModalError";
import ModalAddInfoRoles from "../modals/ModalAddInfoRoles";
import Pills from "../../../../../partials/Pills";
import TableLoading from "../../../../../partials/TableLoading";
import ServerError from "../../../../../partials/ServerError";
import TableSpinner from "../../../../../partials/spinners/TableSpinner";
import Breadcrumbs from "../../../../../partials/Breadcrumbs";
import Header from "../../../../../partials/Header";
import Navigation from "../../../../../partials/Navigation";
import EditSvg from "../../../../../svg/EditSvg";

const InfoRolesView = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
  const infoId = getUrlParam().get("infoId");

  const {
    isLoading,
    isFetching,
    error,
    data: infoRoles,
  } = useQueryData(
    `/v1/controllers/developer/info/roles/roles.php?infoRolesId=${infoId}`,
    "get",
    "info-roles"
  );

  const handleEdit = (item) => {
    setItemEdit(item);
    dispatch(setIsAdd(true));
  };

  React.useEffect(() => {
    dispatch(setIsInfoOpen(true));
  }, []);
  return (
    <>
      <Header />
      <section className="main__grid">
        <aside className={`${store.isMenuOpen ? "active" : ""}`}>
          <Navigation menu="info" />
        </aside>
        <main className="px-6 md:px-10">
          {store.isMenuOpen ? <div className="overlay"></div> : ""}
          <div className="mt-8 mb-8 lg:mb-0 flex items-center justify-center flex-col gap-2 lg:flex-row lg:justify-between">
            <h1 className="text-4xl font-bold">Info Roles View</h1>
            <Breadcrumbs param={location.search} />
          </div>

          <div className="bg-white pt-8 pb-6 mt-8 px-4 lg:mt-4 overflow-x-auto">
            {isFetching && !isLoading && <TableSpinner />}
            {infoRoles?.error ? (
              <div className="">
                <ServerError />
              </div>
            ) : (
              <>
                {console.log(infoRoles?.data)}
                {(isLoading || infoRoles?.data.length === 0) && (
                  <>
                    {isLoading ? (
                      <TableLoading cols={2} count={20} />
                    ) : (
                      <div className="text-center text-base text-gray-400 font-bold">
                        <h1>Page Not Found</h1>
                      </div>
                    )}
                  </>
                )}
                {error && <ServerError />}
                {infoRoles?.data.map((item, key) => {
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
                        <span>Name : </span>
                        <p>{item.info_roles_name}</p>
                      </li>
                      <li className="grid grid-cols-2">
                        <span>Description : </span>
                        <p>{item.info_roles_description}</p>
                      </li>
                      <li className="grid grid-cols-2">
                        <span>Info ID : </span>
                        <p>{item.info_id}</p>
                      </li>
                      <li className="grid grid-cols-2">
                        <span>Status : </span>
                        <p>
                          {item.info_roles_is_active === 1 ? (
                            <Pills label="Active" />
                          ) : (
                            <Pills label="Inactive" bgc="bg-gray-300" />
                          )}
                        </p>
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
      {store.success && <Toast />}
    </>
  );
};

export default InfoRolesView;
