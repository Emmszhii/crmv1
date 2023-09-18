import React from "react";
import {
  setIsAdd,
  setIsSettingsOpen,
} from "../../../../../../store/StoreAction";
import { StoreContext } from "../../../../../../store/StoreContext";
import useQueryData from "../../../../../custom-hooks/useQueryData";
import { getUrlParam } from "../../../../../helpers/functions-general";
import Breadcrumbs from "../../../../../partials/Breadcrumbs";
import Header from "../../../../../partials/Header";
import Navigation from "../../../../../partials/Navigation";
import Pills from "../../../../../partials/Pills";
import ServerError from "../../../../../partials/ServerError";
import TableSpinner from "../../../../../partials/spinners/TableSpinner";
import TableLoading from "../../../../../partials/TableLoading";
import EditSvg from "../../../../../svg/EditSvg";
import ModalAddSystemAccount from "../modals/ModalAddSystemAccount";
import ModalError from "../../../../../partials/Modals/ModalError";
import Toast from "../../../../../partials/Toast";

const SystemAccountView = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
  const systemAccountId = getUrlParam().get("systemAccountId");

  const {
    isLoading,
    isFetching,
    error,
    data: systemAccountView,
  } = useQueryData(
    `/v1/controllers/developer/settings/system-account/system-account.php?systemAccountId=${systemAccountId}`,
    "get",
    "system-account"
  );

  const handleEdit = (item) => {
    setItemEdit(item);
    dispatch(setIsAdd(true));
  };

  React.useEffect(() => {
    dispatch(setIsSettingsOpen(true));
  }, []);

  return (
    <>
      <Header />
      <section className="main__grid">
        <aside className={`${store.isMenuOpen ? "active" : ""}`}>
          <Navigation menu="settings" submenu="settingsSystemAccount" />
        </aside>
        <main className="px-6 md:px-10">
          {store.isMenuOpen ? <div className="overlay"></div> : ""}
          <div className="mt-8 mb-8 lg:mb-0 flex items-center justify-center flex-col gap-2 lg:flex-row lg:justify-between">
            <h1 className="text-4xl font-bold">System Account View</h1>
            <Breadcrumbs />
          </div>

          <div className="bg-white pt-8 pb-6 mt-8 px-4 lg:mt-4 overflow-x-auto">
            {isFetching && !isLoading && <TableSpinner />}
            {systemAccountView?.error ? (
              <h1 className="text-center">Page not found</h1>
            ) : (
              <>
                {(isLoading || systemAccountView?.data.length === 0) && (
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
                {systemAccountView?.data.map((item, key) => {
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
                        <span>Account Name : </span>
                        <p>{systemAccountView.data[0].system_account_name}</p>
                      </li>
                      <li className="grid grid-cols-2">
                        <span>Account Email : </span>
                        <p>{systemAccountView.data[0].system_account_email}</p>
                      </li>
                      <li className="grid grid-cols-2">
                        <span>Account Role : </span>
                        <p>{systemAccountView.data[0].system_account_role}</p>
                      </li>
                      <li className="grid grid-cols-2">
                        <span>Account active : </span>
                        <p>
                          {systemAccountView.data[0]
                            .system_account_is_active === 1 ? (
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
      {store.isAdd && <ModalAddSystemAccount itemEdit={itemEdit} />}
      {store.success && <Toast />}
      {store.error && <ModalError />}
    </>
  );
};

export default SystemAccountView;
