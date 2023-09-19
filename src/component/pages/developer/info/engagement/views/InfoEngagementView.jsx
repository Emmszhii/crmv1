import React from "react";
import { setIsAdd, setIsInfoOpen } from "../../../../../../store/StoreAction";
import { StoreContext } from "../../../../../../store/StoreContext";
import useQueryData from "../../../../../custom-hooks/useQueryData";
import { getUrlParam } from "../../../../../helpers/functions-general";
import Breadcrumbs from "../../../../../partials/Breadcrumbs";
import Header from "../../../../../partials/Header";
import ModalError from "../../../../../partials/Modals/ModalError";
import Navigation from "../../../../../partials/Navigation";
import Nodata from "../../../../../partials/Nodata";
import Pills from "../../../../../partials/Pills";
import ServerError from "../../../../../partials/ServerError";
import TableLoading from "../../../../../partials/TableLoading";
import FetchingSpinner from "../../../../../partials/spinners/FetchingSpinner";
import EditSvg from "../../../../../svg/EditSvg";
import ModalAddInfoEngagement from "../modals/ModalAddInfoEngagement";
import Toast from "../../../../../partials/Toast";

const InfoEngagementView = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
  const infoEngagementId = getUrlParam().get("infoEngagementId");
  const infoId = getUrlParam().get("infoId");
  let counter = 1,
    active = 0,
    inactive = 0;
 
  const {
    isLoading,
    isFetching,
    error,
    data: infoEngagement,
  } = useQueryData(
    `/v1/controllers/developer/info/engagement/engagement.php?infoEngagementId=${infoEngagementId}`, // endpoint
    "get", // method
    "info-engagement" // key
  );
  React.useEffect(() => {
    dispatch(setIsInfoOpen(true));
  }, []);

  const handleEdit = (item) => {
    setItemEdit(item);
    dispatch(setIsAdd(true));
  };

  return (
    <>
      <Header />
      <section className="main__grid">
        <aside className={`${store.isMenuOpen ? "active" : ""}`}>
          <Navigation menu="myInfo" />
        </aside>
        <main className="px-6 md:px-10 overflow-y-auto custom__scroll">
          <div className="mt-8 mb-8 lg:mb-0 flex items-center justify-center flex-col gap-2 lg:flex-row lg:justify-between">
            <h1 className="text-4xl font-bold">Info Engagement</h1>
            <Breadcrumbs param={`?infoId=${infoId}`} />
          </div>

          <div className="bg-white pt-8 pb-6 px-4 mt-8 lg:mt-4 custom__scroll overflow-x-auto ">
            {isFetching && !isLoading && <FetchingSpinner />}
            {infoEngagement?.error ? (
              <ServerError />
            ) : (
              <>
                {(isLoading || infoEngagement?.data.length === 0) && (
                  <>
                    {isLoading ? (
                      <TableLoading count={20} cols={3} />
                    ) : (
                      <Nodata />
                    )}
                  </>
                )}
                {error && <ServerError />}
                {infoEngagement?.data.map((item, key) => {
                  return (
                    <ul key={key}>
                      <li className="flex justify-end">
                        <button
                          className="tooltip"
                          data-tooltip="Edit"
                          onClick={() => handleEdit(item)}
                        >
                          <EditSvg />
                        </button>
                      </li>

                      <li className="grid grid-cols-2">
                        <span>Status :</span>
                        <p>
                          {item.info_engagement_is_active === 1 ? (
                            <>
                              <Pills label="Active" bgc="bg-green-600" />
                            </>
                          ) : (
                            <>
                              <Pills label="Inactive" bgc="bg-archive" />
                            </>
                          )}
                        </p>
                      </li>
                      <li className="grid grid-cols-2">
                        <span>Name : </span>
                        <p>{item.info_engagement_name}</p>
                      </li>
                      <li className="grid grid-cols-2">
                        <span>Description : </span>
                        {item.info_engagement_description}
                      </li>
                      <li className="grid grid-cols-2">
                        <span>Info ID : </span>
                        {item.info_engagement_info_id}
                      </li>
                    </ul>
                  );
                })}
              </>
            )}
          </div>
        </main>
      </section>
      {store.isAdd && <ModalAddInfoEngagement itemEdit={itemEdit} />}
      {store.error && <ModalError />}
      {store.success && <Toast />}
    </>
  );
};

export default InfoEngagementView;
