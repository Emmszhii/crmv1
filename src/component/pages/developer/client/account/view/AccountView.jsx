import React from "react";

import { StoreContext } from "../../../../../../store/StoreContext";
import {
  setIsAdd,
  setIsClientOpen,
  setIsMenuOpen,
} from "../../../../../../store/StoreAction";
import Navigation from "../../../../../partials/Navigation";
import Header from "../../../../../partials/Header";
import Breadcrumbs from "../../../../../partials/Breadcrumbs";
import { getUrlParam } from "../../../../../helpers/functions-general";
import useQueryData from "../../../../../custom-hooks/useQueryData";
import FetchingSpinner from "../../../../../partials/spinners/FetchingSpinner";
import ServerError from "../../../../../partials/ServerError";
import Pills from "../../../../../partials/Pills";
import EditSvg from "../../../../../svg/EditSvg";
import ModalAddAccount from "../ModalAddAccount";
import Toast from "../../../../../partials/Toast";
import ModalError from "../../../../../partials/Modals/ModalError";
import TableLoading from "../../../../../partials/TableLoading";
import Nodata from "../../../../../partials/Nodata";

const AccountView = () => {
  const [itemEdit, setItemEdit] = React.useState();
  const { store, dispatch } = React.useContext(StoreContext);
  const clientAccountId = getUrlParam().get("clientAccountId");

  const {
    isLoading,
    isFetching,
    error,
    data: clientAccountView,
  } = useQueryData(
    `/v1/controllers/developer/client/account/client-account.php?clientAccountId=${clientAccountId}`,
    "get",
    "client-account"
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
          <Navigation menu="client" submenu="clientAccount" />
        </aside>
        <main className="px-6 md:px-10 overflow-y-auto custom__scroll">
          {store.isMenuOpen ? <div className="overlay"></div> : ""}
          <div className="mt-8 mb-8 lg:mb-0 flex items-center justify-center flex-col gap-2 lg:flex-row lg:justify-between">
            <h1 className="text-4xl font-bold">Account</h1>
            <Breadcrumbs />
          </div>
          <div className="bg-white p-6 pb-8 mt-8 my-4 overflow-x-auto relative">
            {isFetching && !isLoading && <FetchingSpinner />}
            {(isLoading || clientAccountView?.data.length === 0) && (
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
            {clientAccountView?.data.map((item, key) => {
              return (
                <ul key={key}>
                  <li className="flex justify-end gap-2">
                    <span></span>
                    <button
                      className="tooltip"
                      data-tooltip="Edit"
                      onClick={() => handleEdit(item)}
                    >
                      <EditSvg />
                    </button>
                  </li>
                  <li className="grid grid-cols-2">
                    <span>Contact Name: </span>
                    <p>{item.client_account_contact_name}</p>
                  </li>
                  <li className="grid grid-cols-2">
                    <span>Contact Email: </span>
                    <p>{item.client_account_contact_email}</p>
                  </li>
                  <li className="grid grid-cols-2">
                    <span>Account Number: </span>
                    <p>{item.client_account_number}</p>
                  </li>
                  <li className="grid grid-cols-2">
                    <span>Company: </span>
                    <p>{item.client_account_company_name}</p>
                  </li>
                  <li className="grid grid-cols-2">
                    <span>Role: </span>
                    <p>{item.client_account_role}</p>
                  </li>
                  <li className="grid grid-cols-2">
                    <span>Status: </span>
                    <p>
                      {item.client_account_is_active === 1 ? (
                        <Pills label="Active" />
                      ) : (
                        <Pills label="Inactive" bgc="bg-gray-300" />
                      )}
                    </p>
                  </li>
                </ul>
              );
            })}
            <ul>
              <li></li>
            </ul>
          </div>
        </main>
      </section>

      {store.isAdd && <ModalAddAccount itemEdit={itemEdit} />}
      {store.success && <Toast />}
      {store.error && <ModalError />}
    </>
  );
};

export default AccountView;
