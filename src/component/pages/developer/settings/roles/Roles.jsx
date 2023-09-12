import React from "react";
import Header from "../../../../partials/Header";
import Navigation from "../../../../partials/Navigation";
import PlusSvg from "../../../../svg/PlusSvg";
import Breadcrumbs from "../../../../partials/Breadcrumbs";
import { setIsAdd, setIsSettingsOpen } from "../../../../../store/StoreAction";
import { StoreContext } from "../../../../../store/StoreContext";
import ModalAddRoles from "./ModalAddRoles";
import RolesTable from "./RolesTable";
import ModalError from "../../../../partials/Modals/ModalError";

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
      <section className="main__grid overflow-x-hidden">
        <aside>
          <Navigation menu="settings" submenu="settingsRoles" />
        </aside>
        <main className="px-6 md:px-10">
          <div className="mt-8 flex items-center justify-between">
            <h1 className="text-4xl font-bold">Roles</h1>
            <Breadcrumbs />
          </div>
          <div className="bg-white py-8 mt-2 ">
            <button
              className="flex items-center text-sm rounded-md gap-3 py-2 pl-10 pr-12 bg-secondary ml-4 text-white hover:bg-blend-darken"
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
      {store.error && <ModalError />}
    </>
  );
};

export default Roles;
