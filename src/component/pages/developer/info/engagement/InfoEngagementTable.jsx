import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { BiSolidArchiveOut } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa";
import { MdDelete, MdRestorePage } from "react-icons/md";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import {
  setIsAdd,
  setIsArchive,
  setIsConfirm,
  setIsRestore,
} from "../../../../../store/StoreAction";
import { StoreContext } from "../../../../../store/StoreContext";
import { getUrlParam } from "../../../../helpers/functions-general";
import { queryDataInfinite } from "../../../../helpers/queryDataInfinite";
import Loadmore from "../../../../partials/Loadmore";
import Nodata from "../../../../partials/Nodata";
import Pills from "../../../../partials/Pills";
import Searchbar from "../../../../partials/Searchbar";
import ServerError from "../../../../partials/ServerError";
import TableLoading from "../../../../partials/TableLoading";
import Toast from "../../../../partials/Toast";
import FetchingSpinner from "../../../../partials/spinners/FetchingSpinner";
import ModalArchive from "./modals/ModalArchive";
import ModalDelete from "./modals/ModalDelete";
import ModalRestore from "./modals/ModalRestore";

const InfoEngagementTable = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [item, setItem] = React.useState(null);
  const infoId = getUrlParam().get("infoId");

  // SEARCH and LOADMORE
  const [page, setPage] = React.useState(1);
  const search = React.useRef(null);
  const { ref, inView } = useInView();
  // Counters
  let counter = 1;
  let active = 0;
  let inactive = 0;
  // use if with loadmore button and search bar
  const {
    data: result,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["info-engagement", store.isSearch],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v1/controllers/developer/info/engagement/search.php`, // search endpoint
        `/v1/controllers/developer/info/engagement/page.php?start=${pageParam}&infoId=${infoId}`, // list endpoint
        store.isSearch, // search boolean
        "post",
        { search: search.current.value, infoId: infoId }
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total) {
        return lastPage.page + lastPage.count;
      }
      return;
    },
    refetchOnWindowFocus: true,
    // networkMode: "always",
    // cacheTime: 200,
  });

  React.useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
      fetchNextPage();
    }
  }, [inView]);

  const handleEdit = (item) => {
    setItemEdit(item);
    dispatch(setIsAdd(true));
  };

  const handleDelete = (item) => {
    setItem(item);
    dispatch(setIsConfirm(true));
  };

  const handleRestore = (item) => {
    setItem(item);
    dispatch(setIsRestore(true));
  };

  const handleArchive = (item) => {
    dispatch(setIsArchive(true));
    setItem(item);
  };
  return (
    <>
      <Searchbar
        search={search}
        dispatch={dispatch}
        store={store}
        result={result?.pages}
        isFetching={isFetching}
      />
      <div className="pt-4 relative">
        {isFetching && status !== "loading" && <FetchingSpinner />}
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Status</th>
              <th>Name</th>
              <th>Description</th>
              <th>Info ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {result?.pages[0].error ? (
              <tr className="text-center ">
                <td colSpan="100%" className="p-10">
                  <ServerError />
                </td>
              </tr>
            ) : (
              <>
                {(status === "loading" ||
                  result?.pages[0].data.length === 0) && (
                  <tr className="text-center ">
                    <td colSpan="100%" className="p-10">
                      {status === "loading" ? (
                        <TableLoading count={20} cols={3} />
                      ) : (
                        <Nodata />
                      )}
                    </td>
                  </tr>
                )}
                {error && (
                  <tr className="text-center ">
                    <td colSpan="100%" className="p-10">
                      <ServerError />
                    </td>
                  </tr>
                )}
                {result?.pages.map((page, key) => {
                  return (
                    <React.Fragment key={key}>
                      {page.data.map((item, key) => {
                        active += item.info_engagement_is_active;
                        inactive += !item.info_engagement_is_active;
                        return (
                          <React.Fragment key={key}>
                            <tr key={key}>
                              <td>{counter++}</td>
                              <td>
                                {item.info_engagement_is_active === 1 ? (
                                  <>
                                    <Pills label="Active" bgc="bg-green-600" />
                                  </>
                                ) : (
                                  <>
                                    <Pills label="Inactive" bgc="bg-archive" />
                                  </>
                                )}
                              </td>
                              <td>{item.info_engagement_name}</td>
                              <td>{item.info_engagement_description}</td>
                              <td>{item.info_engagement_info_id}</td>
                              <td className="table__action">
                                {item.info_engagement_is_active === 1 ? (
                                  <>
                                    <Link
                                      to={`/info/menu/engagement/view?infoId=${infoId}&infoEngagementId=${item.info_engagement_aid}`}
                                    >
                                      <button
                                        className="tooltip"
                                        data-tooltip="Info"
                                      >
                                        <FaRegEye />
                                      </button>
                                    </Link>
                                    <button
                                      className="tooltip"
                                      data-tooltip="Archive"
                                      onClick={() => handleArchive(item)}
                                    >
                                      <BiSolidArchiveOut />
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      className="tooltip"
                                      data-tooltip="Restore"
                                      onClick={() => handleRestore(item)}
                                    >
                                      <MdRestorePage />
                                    </button>
                                    <button
                                      className="tooltip"
                                      data-tooltip="Delete"
                                      onClick={() => handleDelete(item)}
                                    >
                                      <MdDelete />
                                    </button>
                                  </>
                                )}
                              </td>
                            </tr>
                          </React.Fragment>
                        );
                      })}
                    </React.Fragment>
                  );
                })}
              </>
            )}
          </tbody>
        </table>
        <div className="text-center">
          <Loadmore
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
            result={result?.pages[0]}
            setPage={setPage}
            page={page}
            refView={ref}
          />
        </div>
      </div>

      {store.isConfirm && <ModalDelete item={item} setItem={setItem} />}
      {store.isArchive && <ModalArchive item={item} setItem={setItem} />}
      {store.isRestore && <ModalRestore item={item} setItem={setItem} />}
      {store.success && <Toast />}
    </>
  );
};

export default InfoEngagementTable;
