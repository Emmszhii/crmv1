import React from "react";
import Breadcrumbs from "../../../../partials/Breadcrumbs";
import Header from "../../../../partials/Header";
import Navigation from "../../../../partials/Navigation";
import InfoEngagementTable from "./InfoEngagementTable";
import { StoreContext } from "../../../../../store/StoreContext";

const InfoEngagement = () => {
  const { store, dispatch } = React.useContext(StoreContext);
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
            <h1 className="text-4xl font-bold">Engagement</h1>
            <Breadcrumbs />
          </div>

          <div className="bg-white pt-8 pb-6 px-4 mt-8 lg:mt-4 custom__scroll overflow-x-auto ">
            <InfoEngagementTable />
          </div>
        </main>
      </section>
    </>
  );
};

export default InfoEngagement;
