import React from "react";
import { setIsAdd } from "../../../../../store/StoreAction";
import { StoreContext } from "../../../../../store/StoreContext";
import Breadcrumbs from "../../../../partials/Breadcrumbs";
import Header from "../../../../partials/Header";
import ModalError from "../../../../partials/Modals/ModalError";
import Navigation from "../../../../partials/Navigation";
import PlusSvg from "../../../../svg/PlusSvg";
import ModalAddRoles from "./ModalAddRoles";
import RolesTable from "./RolesTable";
import ModalArchive from "./ModalArchive";
import ModalRestore from "./ModalRestore";
import Toast from "../../../../partials/Toast";

const Roles = () => {
  const [itemEdit, setItemEdit] = React.useState();
  const { store, dispatch } = React.useContext(StoreContext);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  return (
    <>
      <Header />
      <section className="main__grid">
        <aside className={`${store.isMenuOpen ? "active" : ""}`}>
          <Navigation menu="settings" submenu="settingsRoles" />
        </aside>
        <main className="px-6 md:px-10">
          <div className="mt-8 mb-8 lg:mb-0 flex items-center justify-center flex-col gap-2 lg:flex-row lg:justify-between">
            <h1 className="text-4xl font-bold">Roles</h1>
            <Breadcrumbs />
          </div>
          <div className="lg:bg-white mb-12 lg:mb-0 lg:py-8 lg:mt-2">
            <button
              className="flex items-center justify-center text-sm rounded-md gap-3 py-2 pl-10 pr-12 bg-secondary lg:ml-4 text-white hover:bg-blend-darken w-full lg:w-auto"
              onClick={handleAdd}
            >
              <PlusSvg /> Add Role
            </button>
          </div>
          <div className="bg-white pt-8 pb-6 mt-4 overflow-x-auto">
            <RolesTable setItemEdit={setItemEdit} />
          </div>
        </main>
      </section>
      {store.isAdd && <ModalAddRoles itemEdit={itemEdit} />}
      {store.isSuccess && <Toast />}
      {store.error && <ModalError />}
    </>
  );
};

export default Roles;
