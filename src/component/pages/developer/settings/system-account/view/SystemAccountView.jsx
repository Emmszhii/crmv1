import React from "react";
import Header from "../../../../../partials/Header";
import Navigation from "../../../../../partials/Navigation";
import { StoreContext } from "../../../../../../store/StoreContext";
import Breadcrumbs from "../../../../../partials/Breadcrumbs";
import { getUrlParam } from "../../../../../helpers/functions-general";
import useQueryData from "../../../../../custom-hooks/useQueryData";
import { setIsSettingsOpen } from "../../../../../../store/StoreAction";
import IconServerError from "../../../../../svg/IconServerError";
import Nodata from "../../../../../partials/Nodata";
import Pills from "../../../../../partials/Pills";
import ServerError from "../../../../../partials/ServerError";

const SystemAccountView = () => {
  const { store, dispatch } = React.useContext(StoreContext);
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
            {error && <ServerError />}
            {systemAccountView?.count > 0 && !error && (
              <>
                <ul>
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
                      {systemAccountView.data[0].system_account_is_active ===
                      1 ? (
                        <Pills label="Active" />
                      ) : (
                        <Pills label="Inactive" bgc="bg-gray-300" />
                      )}
                    </p>
                  </li>
                </ul>
              </>
            )}
          </div>
        </main>
      </section>
    </>
  );
};

export default SystemAccountView;
