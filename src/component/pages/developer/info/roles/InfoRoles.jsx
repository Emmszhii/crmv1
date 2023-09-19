import React from "react";
import {
  setIsAdd,
  setIsClientOpen,
  setIsInfoOpen,
  setIsSettingsOpen,
} from "../../../../../store/StoreAction";
import { StoreContext } from "../../../../../store/StoreContext";
import Breadcrumbs from "../../../../partials/Breadcrumbs";
import Header from "../../../../partials/Header";
import ModalError from "../../../../partials/Modals/ModalError";
import Navigation from "../../../../partials/Navigation";
import PlusSvg from "../../../../svg/PlusSvg";
import InfoRolesTable from "./InfoRolesTable";
import ModalAddInfoRoles from "./modals/ModalAddInfoRoles";

const InfoRoles = () => {
  const [itemEdit, setItemEdit] = React.useState(null);
  const { store, dispatch } = React.useContext(StoreContext);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };
  React.useEffect(() => {
    dispatch(setIsInfoOpen(true));
    dispatch(setIsClientOpen(false));
    dispatch(setIsSettingsOpen(false));
  }, []);
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
          <div className="lg:bg-white mb-12 lg:mb-0 lg:py-8 lg:mt-2">
            <button
              className="flex items-center justify-center text-sm rounded-md gap-3 py-2 pl-10 pr-12 bg-secondary lg:ml-4 text-white hover:bg-blend-darken w-full lg:w-auto"
              onClick={handleAdd}
            >
              <PlusSvg /> Add Info Roles
            </button>
          </div>
          <div className="bg-white pt-8 pb-6 px-4 mt-8 lg:mt-4 custom__scroll overflow-x-auto ">
            {/* <InfoRolesTable setItemEdit={setItemEdit} /> */}
          </div>
        </main>
      </section>
      {store.isAdd && <ModalAddInfoRoles itemEdit={itemEdit} />}
      {store.error && <ModalError />}
    </>
  );
};

export default InfoRoles;
