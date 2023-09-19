import React from "react";
import { StoreContext } from "../../../../../../store/StoreContext";
import {
  setIsAdd,
  setIsClientOpen,
  setIsMenuOpen,
} from "../../../../../../store/StoreAction";
import Header from "../../../../../partials/Header";
import Navigation from "../../../../../partials/Navigation";
import Breadcrumbs from "../../../../../partials/Breadcrumbs";
import useQueryData from "../../../../../custom-hooks/useQueryData";
import { getUrlParam } from "../../../../../helpers/functions-general";
import TableLoading from "../../../../../partials/TableLoading";
import TableSpinner from "../../../../../partials/spinners/TableSpinner";
import ServerError from "../../../../../partials/ServerError";
import { Link } from "react-router-dom";
import EditSvg from "../../../../../svg/EditSvg";
import ModalAddClientList from "../modals/ModalAddClientList";
import Toast from "../../../../../partials/Toast";
import ModalError from "../../../../../partials/Modals/ModalError";

const ClientListView = () => {
  const [itemEdit, setItemEdit] = React.useState();
  const { store, dispatch } = React.useContext(StoreContext);
  const clientListId = getUrlParam().get("clientListId");

  const {
    isLoading,
    isFetching,
    error,
    data: clientListView,
  } = useQueryData(
    `/v1/controllers/developer/client/list/client-list.php?clientListId=${clientListId}`,
    "get",
    "client-list"
  );

  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };

  React.useEffect(() => {
    dispatch(setIsClientOpen(true));
    dispatch(setIsMenuOpen(false));
  }, []);

  return (
    <>
      <Header />
      <section className="main__grid">
        <aside className={`${store.isMenuOpen ? "active" : ""}`}>
          <Navigation menu="client" submenu="clientList" />
        </aside>
        <main className="px-6 md:px-10 overflow-y-auto custom__scroll">
          <div className="mt-8 mb-8 lg:mb-0 flex items-center justify-center flex-col gap-2 lg:flex-row lg:justify-between">
            <h1 className="text-4xl font-bold">Client List View</h1>
            <Breadcrumbs />
          </div>

          <div className="bg-white pt-8 pb-6 mt-8 my-4 px-4 overflow-x-auto custom__scroll relative">
            {isFetching && !isLoading && <TableSpinner />}
            {clientListView?.error ? (
              <ServerError />
            ) : (
              <>
                {(isLoading || clientListView?.data.length === 0) && (
                  <>
                    {isLoading ? (
                      <TableLoading cols={2} count={20} />
                    ) : (
                      <div className="">
                        <h1>Page Not Found</h1>
                      </div>
                    )}
                  </>
                )}
                {error && <ServerError />}
                {clientListView?.data.map((item, key) => {
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
                        <span>Account Number : </span>
                        <p>{item.client_list_account_number}</p>
                      </li>
                      <li className="grid grid-cols-2">
                        <span>Company Name : </span>
                        <p>{item.client_list_company_name}</p>
                      </li>
                      <li className="grid grid-cols-2">
                        <span>Company Email : </span>
                        <p>{item.client_list_company_email}</p>
                      </li>
                      <li className="grid grid-cols-2">
                        <span>Contact Email : </span>
                        <p>{item.client_list_contact_email}</p>
                      </li>
                      <li className="grid grid-cols-2">
                        <span>Company Mobile : </span>
                        <p>{item.client_list_company_mobile}</p>
                      </li>
                    </ul>
                  );
                })}
              </>
            )}
          </div>
        </main>
      </section>
      {store.isAdd && <ModalAddClientList itemEdit={itemEdit} />}
      {store.success && <Toast />}
      {store.error && <ModalError />}
    </>
  );
};

export default ClientListView;
