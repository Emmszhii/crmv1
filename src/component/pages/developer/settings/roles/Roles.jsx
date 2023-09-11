import React from "react";
import Header from "../../../../partials/Header";
import Navigation from "../../../../partials/Navigation";
import PlusSvg from "../../../../svg/PlusSvg";
import Breadcrumbs from "../../../../partials/Breadcrumbs";
import RolesTable from "./RolesTable";

const Roles = () => {
  return (
    <>
      <Header />
      <section className="main__grid">
        <aside>
          <Navigation />
        </aside>
        <main className="px-10">
          <div className="mt-8 flex items-center justify-between">
            <h1 className="text-4xl font-bold">Roles</h1>
            <Breadcrumbs />
          </div>
          <div className="bg-white py-8 mt-2 ">
            <button className="flex items-center text-sm rounded-md gap-3 py-2 pl-10 pr-12 bg-secondary ml-4 text-white hover:bg-blend-darken">
              <PlusSvg /> Add Role
            </button>
          </div>
          <div className="bg-white pt-8 pb-6 mt-4">
            <RolesTable />
          </div>
        </main>
      </section>
    </>
  );
};

export default Roles;
