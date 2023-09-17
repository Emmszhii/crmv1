import React from "react";
import {
  setIsAdd,
  setIsClientOpen,
  setIsMenuOpen,
} from "../../../../../store/StoreAction";
import { StoreContext } from "../../../../../store/StoreContext";
import Header from "../../../../partials/Header";
import Navigation from "../../../../partials/Navigation";
import Breadcrumbs from "../../../../partials/Breadcrumbs";
import PlusSvg from "../../../../svg/PlusSvg";
import ClientListTable from "./ClientListTable";
import ModalAddClientList from "./ModalAddClientList";
import Toast from "../../../../partials/Toast";
import ModalError from "../../../../partials/Modals/ModalError";

const ClientList = () => {
  const [itemEdit, setItemEdit] = React.useState();
  const { store, dispatch } = React.useContext(StoreContext);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
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
        <main className="px-6 md:px-10 overflow-y-auto">
          {store.isMenuOpen ? <div className="overlay"></div> : ""}
          <div className="mt-8 mb-8 lg:mb-0 flex items-center justify-center flex-col gap-2 lg:flex-row lg:justify-between">
            <h1 className="text-4xl font-bold">Client List</h1>
            <Breadcrumbs />
          </div>
          <div className="lg:bg-white mb-12 lg:mb-0 lg:py-8 lg:mt-2">
            <button
              className="flex items-center justify-center text-sm rounded-md gap-3 py-2 pl-10 pr-12 bg-secondary lg:ml-4 text-white hover:bg-blend-darken w-full lg:w-auto"
              onClick={handleAdd}
            >
              <PlusSvg /> Add Client List
            </button>
          </div>
          <div className="bg-white pt-8 pb-6 mt-8 my-4 px-4 overflow-x-auto relative">
            <ClientListTable setItemEdit={setItemEdit} />
          </div>
        </main>
      </section>
      {store.isAdd && <ModalAddClientList itemEdit={itemEdit} />}
      {store.isSuccess && <Toast />}
      {store.error && <ModalError />}
    </>
  );
};

export default ClientList;
