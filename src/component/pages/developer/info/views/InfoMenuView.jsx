import React from "react";
import {
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
import ServerError from "../../../../partials/ServerError";
import TableLoading from "../../../../partials/TableLoading";
import Toast from "../../../../partials/Toast";
import TableSpinner from "../../../../partials/spinners/TableSpinner";
import ModalAddInfo from "../modals/ModalAddInfo";
import InfoSubListView from "./InfoListMenuView";

const InfoMenuView = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const infoId = getUrlParam().get("infoId");

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

  return (
    <>
      <Header />
      <section className="main__grid">
        <aside className={`${store.isMenuOpen ? "active" : ""}`}>
          <Navigation menu="myInfo" />
        </aside>
        <main className="px-6 md:px-10 overflow-y-auto custom__scroll">
          <div className="mt-8 mb-8 lg:mb-0 flex items-center justify-center flex-col gap-2 lg:flex-row lg:justify-between">
            <h1 className="text-4xl font-bold">Info </h1>
            <Breadcrumbs />
          </div>
          <div className="bg-white pt-8 pb-6 px-4 mt-8 lg:mt-4 custom__scroll overflow-x-auto ">
            {isFetching && !isLoading && <TableSpinner />}
            {info?.error ? (
              <ServerError />
            ) : (
              <>
                {(isLoading || info?.data.length === 0) && (
                  <>
                    {isLoading ? (
                      <TableLoading count={10} cols={2} />
                    ) : (
                      <div className="text-center font-bold text-gray-300 text-sm">
                        <p>Page not Found</p>
                      </div>
                    )}
                  </>
                )}
                {error && <ServerError />}
                {info?.data.length > 0 && !error && (
                  <InfoSubListView infoId={infoId} />
                )}
              </>
            )}
          </div>
        </main>
      </section>
      {store.isAdd && <ModalAddInfo />}
      {store.error && <ModalError />}
      {store.success && <Toast />}
    </>
  );
};

export default InfoMenuView;
