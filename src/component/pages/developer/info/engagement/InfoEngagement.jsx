import React from "react";
import Breadcrumbs from "../../../../partials/Breadcrumbs";
import Header from "../../../../partials/Header";
import Navigation from "../../../../partials/Navigation";
import InfoEngagementTable from "./InfoEngagementTable";
import { StoreContext } from "../../../../../store/StoreContext";
import PlusSvg from "../../../../svg/PlusSvg";
import { setIsAdd } from "../../../../../store/StoreAction";
import ModalAddInfoEngagement from "./modals/ModalAddInfoEngagement";
import ModalError from "../../../../partials/Modals/ModalError";

const InfoEngagement = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const handleAdd = () => dispatch(setIsAdd(true));

  return (
    <>
      <Header />
      <section className="main__grid">
        <aside className={`${store.isMenuOpen ? "active" : ""}`}>
          <Navigation menu="myInfo" />
        </aside>
        <main className="px-6 md:px-10 overflow-y-auto custom__scroll">
          <div className="mt-8 mb-8 lg:mb-0 flex items-center justify-center flex-col gap-2 lg:flex-row lg:justify-between">
            <h1 className="text-4xl font-bold">Engagement</h1>
            <Breadcrumbs param={location.search} />
          </div>
          <div className="lg:bg-white mb-12 lg:mb-0 lg:py-8 lg:mt-2">
            <button
              className="flex items-center justify-center text-sm rounded-md gap-3 py-2 pl-10 pr-12 bg-secondary lg:ml-4 text-white hover:bg-blend-darken w-full lg:w-auto"
              onClick={handleAdd}
            >
              <PlusSvg /> Add Info
            </button>
          </div>
          <div className="bg-white pt-8 pb-6 px-4 mt-8 lg:mt-4 custom__scroll overflow-x-auto ">
            <InfoEngagementTable />
          </div>
        </main>
      </section>
      {store.isAdd && <ModalAddInfoEngagement />}
      {store.error && <ModalError />}
    </>
  );
};

export default InfoEngagement;
