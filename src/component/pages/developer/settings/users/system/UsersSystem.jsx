import React from "react";
import { StoreContext } from "../../../../../../store/StoreContext";
import {
  setIsMenuOpen,
  setIsSettingsOpen,
} from "../../../../../../store/StoreAction";
import Header from "../../../../../partials/Header";
import Navigation from "../../../../../partials/Navigation";
import Breadcrumbs from "../../../../../partials/Breadcrumbs";

const UsersSystem = () => {
  const { store, dispatch } = React.useContext(StoreContext);

  React.useEffect(() => {
    dispatch(setIsSettingsOpen(true));
    dispatch(setIsMenuOpen(false));
  }, []);
  return (
    <>
      <Header />
      <section className="main__grid">
        <aside className={`${store.isMenuOpen ? "active" : ""}`}>
          <Navigation menu="settings" submenu="settingsUsers" />
        </aside>
        <main className="px-6 md:px-10 overflow-y-auto custom__scroll">
          <div className="mt-8 mb-8 lg:mb-0 flex items-center justify-center flex-col gap-2 lg:flex-row lg:justify-between">
            <h1 className="text-4xl font-bold">System Account</h1>
            <Breadcrumbs />
          </div>

          <div className="bg-white pt-8 pb-6 mt-8 my-4 px-4 custom__scroll overflow-x-auto relative"></div>
        </main>
      </section>
    </>
  );
};

export default UsersSystem;
